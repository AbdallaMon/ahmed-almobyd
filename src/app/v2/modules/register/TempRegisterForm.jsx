"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { useAlertContext } from "@/app/v2/providers/MuiAlert";
import { useToastContext } from "@/app/v2/providers/ToastLoadingProvider";
import { useUploadContext } from "@/app/v2/providers/UploadingProgressProvider";
import { useGeoCountry } from "@/app/v2/shared/hooks/useGeoCountry";

import { handleRequestSubmit } from "@/app/v2/lib/api";
import { uploadInChunks } from "@/app/v2/lib/upload";

import {
  Emirate,
  LEAD_SOURCE_LABELS,
  LeadCategory,
  LeadType,
  DesignLeadPrice,
} from "@/app/v2/constants";
import { CountrySelector } from "@/app/v2/shared/components/CountrySelector";
import { FileInput } from "@/app/v2/shared/components/FileInput";
import { FormSuccessView } from "@/app/v2/shared/components/FormSuccessView";

export function TempRegisterForm({ category, item, location }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesignLeadForm category={category} item={item} location={location} />
    </LocalizationProvider>
  );
}

function DesignLeadForm({ category, item, location }) {
  const { translate, lng } = useLanguageContext();
  const { setAlertError } = useAlertContext();
  const { loading, setLoading } = useToastContext();
  const { setProgress, setOverlay } = useUploadContext();
  const { defaultCountry } = useGeoCountry(location);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    emirate: null,
    email: "",
    file: null,
    clientDescription: null,
    country: null,
    discoverySource: null,
  });
  const [renderSuccess, setRenderSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleEmirateChange = (e) => {
    setFormData((prev) => ({ ...prev, emirate: e.target.value }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    const { name, phone, email, emirate } = formData;

    if (!matchIsValidTel(phone)) {
      setAlertError(translate("validation.invalidPhone"));
      return;
    }
    if (!name || !phone || !email) {
      setAlertError(translate("validation.fillAll"));
      return;
    }
    if (location === "INSIDE_UAE" && !emirate) {
      setAlertError(translate("validation.fillAll"));
      return;
    }
    if (location !== "INSIDE_UAE" && !formData.country) {
      setAlertError(translate("validation.fillAll"));
      return;
    }
    if (!formData.discoverySource) {
      setAlertError(translate("form.tellUsHowFound"));
      return;
    }

    // Step 1: initial registration
    const initialRequest = await handleRequestSubmit(
      formData,
      setLoading,
      `client/new-lead/register?lng=${lng}`,
      false,
      translate("loading.submitting"),
    );
    if (initialRequest.status !== 200) return;

    const leadId = initialRequest.data.id;

    // Step 2: complete registration (with or without file)
    let completeData = { ...formData, category, item, lng, location };

    if (formData.file) {
      const fileUpload = await uploadInChunks(
        formData.file,
        setProgress,
        setOverlay,
        true,
      );
      if (fileUpload.status !== 200) return;
      completeData = { ...completeData, url: fileUpload.url };
    }

    const request = await handleRequestSubmit(
      completeData,
      setLoading,
      `client/new-lead/complete-register/${leadId}`,
      false,
      translate("loading.submitting"),
    );

    if (request.status === 200) {
      setRenderSuccess(true);
    }
  };

  const emiratesOptions = Object.entries(Emirate).map(([key, value]) => ({
    key,
    label: value,
  }));

  if (!item) return null;

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        minWidth: isMobile ? "100%" : "800px",
      }}
      className="final-selection-form"
    >
      {renderSuccess ? (
        <FormSuccessView lng={lng} showLevels={false} />
      ) : (
        <Paper
          elevation={4}
          sx={{
            padding: { xs: 2, md: 4 },
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
            direction: "ltr",
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            sx={{
              marginBottom: 1,
              textAlign: "center",
              fontWeight: 700,
              color: theme.palette.primary.main,
              maxWidth: { xs: "280px", md: "600px" },
              margin: "0 auto 16px auto",
            }}
          >
            {translate("hero.oneStepAway")}
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
            </Typography>
            -
            <Typography variant="subtitle1">
              {translate(LeadType[item]) || ""}
            </Typography>
          </Box>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label={translate("form.name")}
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              InputProps={{ sx: { borderRadius: 2 } }}
            />

            <MuiTelInput
              defaultCountry={defaultCountry}
              value={formData.phone}
              id="phone"
              name="phone"
              label={translate("form.phone")}
              onChange={handlePhoneChange}
              error={formData.phone !== "" && !matchIsValidTel(formData.phone)}
              helperText={
                formData.phone !== "" && !matchIsValidTel(formData.phone)
                  ? translate("validation.invalidPhone")
                  : ""
              }
              fullWidth
              sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
            />

            <TextField
              fullWidth
              label={translate("form.email")}
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              InputProps={{ sx: { borderRadius: 2 } }}
            />

            {location === "INSIDE_UAE" && (
              <>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="emirate-label">
                    {translate("form.selectLocation")}
                  </InputLabel>
                  <Select
                    labelId="emirate-label"
                    label={translate("form.selectLocation")}
                    value={formData.emirate || ""}
                    onChange={handleEmirateChange}
                  >
                    {emiratesOptions.map((option) => (
                      <MenuItem value={option.key} key={option.key}>
                        {translate(option.label)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label={translate("form.additionalInfo")}
                  name="clientDescription"
                  variant="outlined"
                  value={formData.clientDescription || ""}
                  onChange={handleChange}
                  InputProps={{ sx: { borderRadius: 2 } }}
                />
              </>
            )}

            {location !== "INSIDE_UAE" && (
              <CountrySelector
                label={translate("form.country")}
                name="country"
                onChange={handleChange}
                value={formData.country}
                fullWidth
              />
            )}

            <FormControl fullWidth variant="outlined">
              <InputLabel id="discovery-source-label">
                {translate("form.whereHeard")}
              </InputLabel>
              <Select
                labelId="discovery-source-label"
                label={translate("form.whereHeard")}
                value={formData.discoverySource || ""}
                onChange={handleChange}
                name="discoverySource"
              >
                {Object.entries(LEAD_SOURCE_LABELS).map(([key, labelKey]) => (
                  <MenuItem value={key} key={key}>
                    {translate(labelKey)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FileInput
              label={translate("form.addAttachmentOptional")}
              id="file"
              setData={setFormData}
            />

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                {translate(DesignLeadPrice[item]) || ""}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              size="large"
              sx={{
                borderRadius: 2,
                padding: "16px",
                fontSize: "1.2rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 20px 0 rgba(61, 71, 82, 0.1)",
              }}
            >
              {translate("button.submit")}
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
