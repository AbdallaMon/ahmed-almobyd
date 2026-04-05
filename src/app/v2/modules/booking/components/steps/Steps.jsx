"use client";

import { Box, Fab } from "@mui/material";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useSteps } from "./hooks/useSteps";
import { StepLayout } from "./StepLayout";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import colors from "@/app/v2/theme/colors";

export function Steps({ showForm = false, onDone }) {
  const { lng } = useLanguageContext();
  const isRtl = lng === "ar";

  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    formData,
    isSubmitting,
    error,
    onNext,
    onBack,
    isFirstStep,
  } = useSteps({ onDone });

  if (!showForm) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <StepLayout
        step={currentStep}
        onNext={onNext}
        isSubmitting={isSubmitting}
        error={error}
        formData={formData}
        totalSteps={totalSteps}
        currentStepIndex={currentStepIndex}
      />

      {/* Floating back button — hidden on step 1 */}
      {!isFirstStep && (
        <Fab
          onClick={onBack}
          disabled={isSubmitting}
          size="small"
          aria-label="go back"
          sx={{
            position: "fixed",
            bottom: 28,
            ...(isRtl ? { right: 24 } : { left: 24 }),
            backgroundColor: colors.primary,
            color: "#fff",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            "&:hover": { backgroundColor: colors.primaryDark },
            "&.Mui-disabled": { backgroundColor: colors.bgTertiary },
            zIndex: 100,
          }}
        >
          {isRtl ? <MdArrowForward size={20} /> : <MdArrowBack size={20} />}
        </Fab>
      )}
    </Box>
  );
}
