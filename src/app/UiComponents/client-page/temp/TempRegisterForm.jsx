"use client";
import { useLanguageContext } from "@/app/providers/LanguageProvider.jsx";
import React, { useEffect, useState } from "react";
import { useAlertContext } from "@/app/providers/MuiAlert.jsx";
import { useToastContext } from "@/app/providers/ToastLoadingProvider.js";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { handleRequestSubmit } from "@/app/helpers/functions/handleSubmit.js";
import {
  countriesByRegion,
  Emirate,
  LEAD_SOURCE_LABELS,
  LeadCategory,
  LeadType,
} from "@/app/helpers/constants.js";
import SimpleFileInput from "@/app/UiComponents/formComponents/SimpleFileInput.jsx";
import { priceRange } from "@/app/UiComponents/client-page/clientPageData.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import gsap from "gsap";
import { useUploadContext } from "@/app/providers/UploadingProgressProvider";
import { uploadInChunks } from "@/app/helpers/functions/uploadAsChunk";
import { CountrySelector } from "../FinalSelectionForm";
import { ConsultLevels } from "../consult-levels/ConsultLevels";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { toast } from "react-toastify";
import {
  Failed,
  Success,
} from "@/app/UiComponents/feedback/loaders/toast/ToastUpdate";

async function submitInitialRequest(data, setLoading, lng) {
  const toastMessage = lng === "ar" ? "جاري الإرسال..." : "Submitting...";
  const toastId = toast.loading(toastMessage);
  const url = `client/new-lead/register`;
  const id = toastId;
  try {
    const request = await fetch(process.env.NEXT_PUBLIC_URL + "/" + url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const reqStatus = request.status;
    const response = await request.json();
    response.status = reqStatus;
    if (reqStatus === 200) {
      toast.update(
        id,
        Success(
          lng === "ar"
            ? "تم تسجيل البيانات الاولية من فضلك انتظر"
            : "Initial data registered. Please wait."
        )
      );
    } else {
      toast.update(
        id,
        Failed(lng === "ar" ? "حدثت مشكلة" : "Something went wrong")
      );
    }
    return response;
  } catch (err) {
    toast.update(
      id,
      Failed(lng === "ar" ? "حدثت مشكلة" : "Something went wrong")
    );
    return { status: 500, message: "Error, " + err.message };
  } finally {
    setLoading(false);
  }
}
export function TempRegisterForm({ category, item, location }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesignLeadForm category={category} item={item} location={location} />
    </LocalizationProvider>
  );
}
function DesignLeadForm({ category, item, location }) {
  const { translate, lng } = useLanguageContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    emirate: null,
    email: "",
    priceRange: [0, 0],
    priceOption: null,
    file: null,
    clientDescription: null,
    country: null,
    discoverySource: null,
  });
  const [renderSuccess, setRenderSuccess] = useState(false);
  const [clientLead, setClientLead] = useState(null);
  const { setAlertError } = useAlertContext();
  const { setLoading } = useToastContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setProgress, setOverlay } = useUploadContext();

  const [defaultCountry, setDefaultCountry] = useState("AE");
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) {
      return; // Prevent setting invalid value
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  function handlePhoneChange(value) {
    setFormData((prev) => ({ ...prev, phone: value }));
  }
  const handleEmirateChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, emirate: event.target.value }));
  };
  const handlePriceChange = (index, value) => {
    setFormData((prev) => {
      const newPriceRange = [...prev.priceRange];
      newPriceRange[index] = Number(value) || 0;
      return { ...prev, priceRange: newPriceRange };
    });
  };
  const handleSelectPriceChange = (e) => {
    setFormData((prev) => ({ ...prev, priceOption: e.target.value }));
  };
  async function getDefaultCountryCode() {
    const defaultCountry = "AE";
    if (location === "INSIDE_UAE") {
      return defaultCountry;
    } else {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      if (data?.country_code === "Not found") {
        return defaultCountry;
      }
      return data?.country_code || defaultCountry;
    }
  }
  useEffect(() => {
    getDefaultCountryCode().then((code) => {
      setDefaultCountry(code);
    });
  }, []);
  const handleSubmit = async () => {
    const { name, phone, email, priceRange, emirate, priceOption } = formData;
    if (!matchIsValidTel(phone)) {
      setAlertError(translate("Invalid phone"));
      return;
    }
    if (
      !name ||
      !phone ||
      !email ||
      (!emirate && location === "INSIDE_UAE") ||
      (location === "INSIDE_UAE" &&
        priceRange[0] === 0 &&
        priceRange[1] === 0 &&
        !priceOption)
    ) {
      setAlertError(translate("Please fill all the fields."));
      return;
    }
    if (location !== "INSIDE_UAE" && !formData.country) {
      setAlertError(translate("Please fill all the fields."));
      return;
    }
    if (
      (!emirate && location === "INSIDE_UAE") ||
      (location === "INSIDE_UAE" &&
        priceRange[0] === 0 &&
        priceRange[1] === 0 &&
        !priceOption)
    ) {
      setAlertError(translate("Please fill all the fields."));
      return;
    }
    if (location !== "INSIDE_UAE" && !formData.country) {
      setAlertError(translate("Please fill all the fields."));
      return;
    }
    if (!formData.discoverySource) {
      setAlertError(translate("Please tell us how you found us."));
      return;
    }
    const initialRequest = await submitInitialRequest(
      formData,
      setLoading,
      lng
    );

    if (initialRequest.status !== 200) {
      return;
    }
    const leadId = initialRequest.data.id;
    if (formData.file) {
      const fileUpload = await uploadInChunks(
        formData.file,
        setProgress,
        setOverlay,
        true
      );

      if (fileUpload.status === 200) {
        const data = {
          ...formData,
          url: fileUpload.url,
          category,
          item,
          lng,
          location,
        };
        const request = await handleRequestSubmit(
          data,
          setLoading,
          `client/new-lead/complete-register/${leadId}`,
          false,
          translate("Submitting")
        );
        if (request.status === 200) {
          setRenderSuccess(true);
          setClientLead(request.data);
        }
      }
    } else {
      const data = { ...formData, category, item, lng, location };
      const request = await handleRequestSubmit(
        data,
        setLoading,
        `client/new-lead/complete-register/${leadId}`,
        false,
        translate("Submitting")
      );
      if (request.status === 200) {
        setRenderSuccess(true);
        setClientLead(request.data);
      }
    }
  };
  const emiratesOptions = Object.entries(Emirate).map(([key, value]) => ({
    key,
    label: value,
  }));
  if (!item) return;
  return (
    <>
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          minWidth: isMobile ? "100%" : "800px",
        }}
        className="final-selection-form"
      >
        {renderSuccess ? (
          <SuccessPage
            category={category}
            formData={formData}
            clientLead={clientLead}
            lng={lng}
          />
        ) : (
          <Paper
            elevation={4}
            sx={{
              padding: { xs: 2, md: 4 },
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              direction: lng === "ar" ? "ltr" : "ltr",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: 1,
                textAlign: "center",
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              {translate(
                "You're just one step away from starting your project!"
              )}
            </Typography>
            <Box
              sx={{
                marginBottom: 3,
                textAlign: "center",
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1">
                {translate(LeadCategory[category]) || ""}
              </Typography>{" "}
              -
              <Typography variant="subtitle1">
                {translate(LeadType[item]) || ""}
              </Typography>
            </Box>
            <Stack spacing={3}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={translate("Name")}
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    },
                  }}
                />
                <MuiTelInput
                  defaultCountry={defaultCountry}
                  value={formData.phone}
                  id="phone"
                  name="phone"
                  label={translate("Phone")}
                  onChange={handlePhoneChange}
                  error={
                    matchIsValidTel(formData.phone) || formData.phone === ""
                      ? false
                      : true
                  }
                  helperText={
                    matchIsValidTel(formData.phone) || formData.phone === ""
                      ? ""
                      : translate("Invalid phone")
                  }
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": { borderRadius: 2 },
                    "&:hover fieldset": { borderColor: "primary.main" },
                  }}
                />

                <TextField
                  fullWidth
                  label={translate("Email")}
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    },
                  }}
                />
              </Stack>
              {location === "INSIDE_UAE" && (
                <>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="emirate-label">
                      {translate("Select Location")}
                    </InputLabel>
                    <Select
                      labelId="emirate-label"
                      id="emirate"
                      label={translate("Select Location")}
                      value={formData.emirate} // Ensure you define this state
                      onChange={handleEmirateChange}
                    >
                      {emiratesOptions.map((option) => (
                        <MenuItem value={option.key} key={option.key}>
                          {translate(option.label)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {priceRange[item].type === "input" ? (
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ mb: 2.5, mt: -1 }}
                      >
                        {translate(
                          "How much would you like to invest in your dream home?"
                        )}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mt: -1.5 }}
                      >
                        <TextField
                          type="number"
                          label={translate("Min")}
                          value={formData.priceRange[0]}
                          onChange={(e) => handlePriceChange(0, e.target.value)}
                          sx={{ flex: 1 }}
                          InputProps={{
                            sx: { borderRadius: 2 },
                          }}
                        />
                        <TextField
                          type="number"
                          label={translate("Max")}
                          value={formData.priceRange[1]}
                          onChange={(e) => handlePriceChange(1, e.target.value)}
                          sx={{ flex: 1 }}
                          InputProps={{
                            sx: { borderRadius: 2 },
                          }}
                        />
                      </Stack>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          marginTop: "8px !important",
                          mb: "-15px !important",
                        }}
                      >
                        {translate(
                          "How much would you like to invest in your dream home?"
                        )}
                      </Typography>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="price-range-label">
                          {translate("Budget")}
                        </InputLabel>
                        <Select
                          labelId="price-range-label"
                          id="price-range-select"
                          label={translate("Budget")}
                          value={formData.priceOption} // Ensure you define this state
                          onChange={handleSelectPriceChange}
                        >
                          {priceRange[item].options.map((price) => (
                            <MenuItem value={price} key={price}>
                              {translate(price)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                  <TextField
                    fullWidth
                    label={translate("Additional information (optional)")}
                    name="clientDescription"
                    type="text"
                    variant="outlined"
                    value={formData.clientDescription}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        "&:hover": {
                          "& fieldset": {
                            borderColor: "primary.main",
                          },
                        },
                      },
                    }}
                  />
                </>
              )}
              {location === "INSIDE_UAE" ? (
                <>
                  {/* <MobileDateTimePicker
                    label={translate(
                      "Choose a time to contact you? (optional)"
                    )}
                    disablePast
                    name="timeToContact"
                    value={formData.timeToContact}
                    onChange={handleDateChange}
                    orientation=""
                  /> */}
                  {/* <Typography
                    variant="subtitle2"
                    sx={{ margin: "8px 0 -10px !important" }}
                  >
                    {translate("Choose a time between 10 AM to 7 PM.")}
                  </Typography> */}
                </>
              ) : (
                <>
                  <CountrySelector
                    label={translate("Country")}
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    fullWidth={true}
                  />
                </>
              )}
              <FormControl fullWidth variant="outlined">
                <InputLabel id="discovery-source-label">
                  {translate("Where did you hear about us?")}
                </InputLabel>
                <Select
                  labelId="discovery-source-label"
                  id="discovery-source"
                  label={translate("Where did you hear about us?")}
                  value={formData.discoverySource} // Ensure you define this state
                  onChange={handleChange}
                  name="discoverySource"
                >
                  {Object.entries(LEAD_SOURCE_LABELS).map(([key, label]) => (
                    <MenuItem value={key} key={key}>
                      {label[lng]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <SimpleFileInput
                label={translate("Add an attachment (optional)")}
                id="file"
                setData={setFormData}
                variant="outlined"
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                size="large"
                sx={{
                  borderRadius: 2,
                  padding: "16px",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow:
                    "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
                }}
              >
                {translate("Submit")}
              </Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </>
  );
}

const orderedCountriesWithRegions = [];
Object.keys(countriesByRegion).forEach((region) => {
  countriesByRegion[region].forEach((country) => {
    orderedCountriesWithRegions.push({
      region,
      country,
    });
  });
});

function SuccessPage({ lng, category, formData }) {
  const { translate } = useLanguageContext();

  useEffect(() => {
    gsap.set(".reverse-button", {
      display: "none",
    });
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        borderRadius: 3,
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="body1" mb={1} p={4} fontSize="1.2rem">
        {translate("Thank you for your submission. We will contact you soon.")}
      </Typography>
      <ConsultLevels lng={lng} />
    </Paper>
  );
}
