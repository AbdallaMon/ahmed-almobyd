"use client";

import { useState } from "react";
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
  priceRange,
} from "@/app/v2/constants";
import { CountrySelector } from "@/app/v2/shared/components/CountrySelector";
import { FileInput } from "@/app/v2/shared/components/FileInput";
import { FormSuccessView } from "@/app/v2/shared/components/FormSuccessView";

export function CompleteRegisterForm({ category, item, location, leadId }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesignLeadForm
        category={category}
        item={item}
        location={location}
        leadId={leadId}
      />
    </LocalizationProvider>
  );
}

function DesignLeadForm({ category, item, location, leadId }) {
  const { translate, lng } = useLanguageContext();
  const { setAlertError } = useAlertContext();
  const { setLoading } = useToastContext();
  const { setProgress, setOverlay } = useUploadContext();
  const { defaultCountry } = useGeoCountry(location);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    emirate: null,
    priceRange: [0, 0],
    priceOption: null,
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

  const handleEmirateChange = (e) => {
    setFormData((prev) => ({ ...prev, emirate: e.target.value }));
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

  const handleSubmit = async () => {
    const { priceRange: pr, emirate, priceOption } = formData;

    if (location === "INSIDE_UAE") {
      if (!emirate || (pr[0] === 0 && pr[1] === 0 && !priceOption)) {
        setAlertError(translate("validation.fillAll"));
        return;
      }
    } else if (!formData.country) {
      setAlertError(translate("validation.fillAll"));
      return;
    }

    if (!formData.discoverySource) {
      setAlertError(translate("form.tellUsHowFound"));
      return;
    }

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
  const itemPriceConfig = item ? priceRange[item] : null;

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
        <FormSuccessView lng={lng} showLevels={true} />
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
            variant="h4"
            sx={{
              marginBottom: 1,
              textAlign: "center",
              fontWeight: 700,
              color: theme.palette.primary.main,
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

                {itemPriceConfig?.type === "input" ? (
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ mb: 2.5, mt: -1 }}
                    >
                      {translate("form.investInHome")}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mt: -1.5 }}
                    >
                      <TextField
                        type="number"
                        label={translate("form.min")}
                        value={formData.priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        sx={{ flex: 1 }}
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                      <TextField
                        type="number"
                        label={translate("form.max")}
                        value={formData.priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        sx={{ flex: 1 }}
                        InputProps={{ sx: { borderRadius: 2 } }}
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
                      {translate("form.investInHome")}
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="price-range-label">
                        {translate("form.budget")}
                      </InputLabel>
                      <Select
                        labelId="price-range-label"
                        label={translate("form.budget")}
                        value={formData.priceOption || ""}
                        onChange={handleSelectPriceChange}
                      >
                        {itemPriceConfig?.options?.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {translate(option.labelKey)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}

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
