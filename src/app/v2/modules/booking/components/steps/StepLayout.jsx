"use client";

import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { StepItemContainer } from "./StepItemContainer";
import { StepForm } from "./StepForm";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import colors from "@/app/v2/theme/colors";

export function StepLayout({
  step,
  onNext,
  isSubmitting,
  error,
  infoMessage,
  formData,
  serverFieldErrors,
  totalSteps,
  currentStepIndex,
  isSubmitted,
  submitMessage,
  onResetBooking,
  canJumpToLastSubmittedStep,
  lastSubmittedStepIndex,
  onJumpToLastSubmittedStep,
}) {
  const { translate } = useLanguageContext();
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  if (isSubmitted) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        {infoMessage && (
          <Alert severity="info" sx={{ mb: 2, textAlign: "start" }}>
            {infoMessage}
          </Alert>
        )}

        <Alert severity="success" sx={{ mb: 2, textAlign: "start" }}>
          {submitMessage || translate("status.thankYou")}
        </Alert>

        <Button variant="contained" onClick={onResetBooking}>
          {translate("button.resetBooking")}
        </Button>
      </Paper>
    );
  }

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
          mb: 1,
          fontWeight: 700,
          color: colors.heading,
          textAlign: "center",
        }}
      >
        {translate(step.key)}
      </Typography>

      {canJumpToLastSubmittedStep && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Button
            variant="text"
            onClick={onJumpToLastSubmittedStep}
            sx={{
              textTransform: "none",
              color: colors.primary,
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              "&:hover": { textDecoration: "underline", opacity: 0.8 },
            }}
          >
            {translate("button.goToLastStep")} {lastSubmittedStepIndex + 1}
          </Button>
        </Box>
      )}

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

      {infoMessage && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {infoMessage}
        </Alert>
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
          serverFieldErrors={serverFieldErrors}
        />
      )}
    </Box>
  );
}
