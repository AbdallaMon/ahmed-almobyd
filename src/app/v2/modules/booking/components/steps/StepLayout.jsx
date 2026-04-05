"use client";

import { Box, LinearProgress, Typography } from "@mui/material";
import { StepItemContainer } from "./StepItemContainer";
import { StepForm } from "./StepForm";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import colors from "@/app/v2/theme/colors";

export function StepLayout({
  step,
  onNext,
  isSubmitting,
  error,
  formData,
  totalSteps,
  currentStepIndex,
}) {
  const { translate } = useLanguageContext();
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <Box sx={{ pb: 10 }}>
      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mb: 3,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.bgTertiary,
          "& .MuiLinearProgress-bar": {
            backgroundColor: colors.primary,
            borderRadius: 3,
          },
        }}
      />

      {/* Step counter */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: colors.textColor,
          mb: 0.5,
          opacity: 0.7,
        }}
      >
        {currentStepIndex + 1} / {totalSteps}
      </Typography>

      {/* Question title */}
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: colors.heading,
          textAlign: "center",
        }}
      >
        {translate(step.key)}
      </Typography>

      {/* Error message */}
      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}

      {/* Content */}
      {step.type === "SELECT" ? (
        <StepItemContainer
          step={step}
          onNext={onNext}
          isSubmitting={isSubmitting}
          formData={formData}
        />
      ) : (
        <StepForm
          step={step}
          onNext={onNext}
          isSubmitting={isSubmitting}
          formData={formData}
        />
      )}
    </Box>
  );
}
