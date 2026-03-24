"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { BOOKING_FORM } from "@/app/helpers/constants";
import { useLanguageContext } from "@/app/providers/LanguageProvider";
import { handleRequestSubmit } from "@/app/helpers/functions/handleSubmit";
import { useAlertContext } from "@/app/providers/MuiAlert";
import { useToastContext } from "@/app/providers/ToastLoadingProvider";
import { MdCheckCircle } from "react-icons/md";
import { Header, LandingHeader } from "../LeacComponents";

export default function BookingForm() {
  const theme = useTheme();
  const { translate, lng } = useLanguageContext();
  const { setAlertError } = useAlertContext();
  const { setLoading } = useToastContext();

  const isArabic = lng === "ar";

  const [defaultCountry, setDefaultCountry] = useState("AE");
  const [renderSuccess, setRenderSuccess] = useState(false);
  const [clientLead, setClientLead] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    stateOfTheProject: "",
  });

  const text = useMemo(
    () => ({
      submit: isArabic ? "سجل الآن" : "Register Now",
      successTitle: isArabic ? "تم التسجيل بنجاح" : "Registered Successfully",
      successDesc: isArabic
        ? "انتظر موعد لزيارتنا المجانية"
        : "Please wait for the موعد of our free visit.",
      required: isArabic
        ? "من فضلك املأ جميع الحقول المطلوبة."
        : "Please fill all the required fields.",
      invalidPhone: isArabic ? "رقم الهاتف غير صحيح" : "Invalid phone number",
      invalidEmail: isArabic
        ? "البريد الإلكتروني غير صحيح"
        : "Invalid email address",
      formTitle: isArabic ? "احجز زيارتك المجانية" : "Book Your Free Visit",
      formDesc: isArabic
        ? "املأ البيانات وسنتواصل معك لتحديد الموعد المناسب."
        : "Fill in your details and we will contact you to schedule the visit.",
    }),
    [isArabic],
  );

  async function getDefaultCountryCode() {
    try {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();

      if (!data?.country_code || data.country_code === "Not found") {
        return "AE";
      }

      return data.country_code;
    } catch {
      return "AE";
    }
  }

  useEffect(() => {
    getDefaultCountryCode().then((code) => {
      setDefaultCountry(code || "AE");
    });
  }, []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isEmailValid = (email) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.location ||
      !formData.stateOfTheProject
    ) {
      setAlertError(text.required);
      return false;
    }

    if (!isEmailValid(formData.email)) {
      setAlertError(text.invalidEmail);
      return false;
    }

    if (!matchIsValidTel(formData.phone)) {
      setAlertError(text.invalidPhone);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const data = {
      ...formData,
      lng,
    };

    const request = await handleRequestSubmit(
      data,
      setLoading,
      `client/new-lead/register`,
      false,
      translate("Submitting"),
    );

    if (request?.status === 200) {
      setRenderSuccess(true);
      setClientLead(request.data);
    }
  };

  if (renderSuccess) {
    return (
      <Fade in timeout={500}>
        <Card
          elevation={0}
          sx={{
            maxWidth: 720,
            mx: "auto",
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)"
                : theme.palette.background.paper,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                mx: "auto",
                mb: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: "success.light",
                color: "success.main",
              }}
            >
              <MdCheckCircle sx={{ fontSize: 42 }} />
            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              gutterBottom
              sx={{ direction: isArabic ? "ltr" : "ltr" }}
            >
              {text.successTitle}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 460,
                mx: "auto",
                direction: isArabic ? "ltr" : "ltr",
                lineHeight: 1.9,
              }}
            >
              {text.successDesc}
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    );
  }

  return (
    <Box>
      <LandingHeader
        sx={{
          px: 0,
          mx: "auto",
          maxWidth: 720,
        }}
      />
      <Card
        elevation={0}
        sx={{
          maxWidth: 720,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #ffffff 0%, #fcfdff 100%)"
              : theme.palette.background.paper,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={3} sx={{ direction: isArabic ? "ltr" : "ltr" }}>
            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  mb: 1,
                  textAlign: isArabic ? "left" : "left",
                }}
              >
                {text.formTitle}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  textAlign: isArabic ? "left" : "left",
                }}
              >
                {text.formDesc}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label={BOOKING_FORM.name.label[lng]}
              name={BOOKING_FORM.name.id}
              variant="outlined"
              value={formData.name}
              onChange={handleTextChange}
              dir={isArabic ? "rtl" : "ltr"}
              InputProps={{
                sx: {
                  borderRadius: 3,
                },
              }}
            />

            <TextField
              fullWidth
              label={BOOKING_FORM.email.label[lng]}
              name={BOOKING_FORM.email.id}
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleTextChange}
              dir={isArabic ? "ltr" : "ltr"}
              InputProps={{
                sx: {
                  borderRadius: 3,
                },
              }}
            />

            <MuiTelInput
              defaultCountry={defaultCountry}
              value={formData.phone}
              name={BOOKING_FORM.phone.id}
              label={BOOKING_FORM.phone.label[lng]}
              onChange={handlePhoneChange}
              error={
                formData.phone !== "" ? !matchIsValidTel(formData.phone) : false
              }
              helperText={
                formData.phone !== "" && !matchIsValidTel(formData.phone)
                  ? text.invalidPhone
                  : ""
              }
              fullWidth
              dir={isArabic ? "ltr" : "ltr"}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 3,
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="state-of-project-label">
                {BOOKING_FORM.statusOfTheProject.label[lng]}
              </InputLabel>
              <Select
                labelId="state-of-project-label"
                id={BOOKING_FORM.statusOfTheProject.id}
                value={formData.stateOfTheProject}
                label={BOOKING_FORM.statusOfTheProject.label[lng]}
                onChange={(e) =>
                  handleSelectChange("stateOfTheProject", e.target.value)
                }
                sx={{ borderRadius: 3 }}
              >
                {BOOKING_FORM.statusOfTheProject.options.map((option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option[lng]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="location-label">
                {BOOKING_FORM.location.label[lng]}
              </InputLabel>
              <Select
                labelId="location-label"
                id={BOOKING_FORM.location.id}
                value={formData.location}
                label={BOOKING_FORM.location.label[lng]}
                onChange={(e) => handleSelectChange("location", e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                {BOOKING_FORM.location.options.map((option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option[lng]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                minHeight: 54,
                borderRadius: 999,
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "none",
                px: 4,
              }}
            >
              {text.submit}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
