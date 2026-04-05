"use client";

import { useEffect } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { useGeoCountry } from "@/app/v2/shared/hooks/useGeoCountry";
import colors from "@/app/v2/theme/colors";

export function StepForm({ step, onNext, isSubmitting, formData }) {
  const { translate } = useLanguageContext();
  const { defaultCountry } = useGeoCountry("INSIDE_UAE");

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: formData?.name || "",
      phone: formData?.phone || "",
      email: formData?.email || "",
    },
  });

  useEffect(() => {
    reset({
      name: formData?.name || "",
      phone: formData?.phone || "",
      email: formData?.email || "",
    });
  }, [formData, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onNext)}
      noValidate
      sx={{
        background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        direction: "ltr",
      }}
      className="final-selection-form"
    >
      <Stack spacing={2.5}>
        {step.fields.map((field) => {
          if (field.inputType === "tel") {
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                defaultValue=""
                rules={{
                  required: translate(field.errorKey),
                  validate: (v) =>
                    matchIsValidTel(v) || translate("validation.invalidPhone"),
                }}
                render={({ field: ctrl }) => (
                  <MuiTelInput
                    {...ctrl}
                    defaultCountry={defaultCountry || "AE"}
                    label={translate(field.key)}
                    fullWidth
                    error={!!errors[field.id]}
                    helperText={errors[field.id]?.message}
                    sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
                  />
                )}
              />
            );
          }

          return (
            <TextField
              key={field.id}
              label={translate(field.key)}
              fullWidth
              type={field.inputType}
              error={!!errors[field.id]}
              helperText={errors[field.id]?.message}
              InputProps={{ sx: { borderRadius: 2 } }}
              {...register(field.id, {
                required: translate(field.errorKey),
                ...(field.pattern && {
                  pattern: {
                    value: field.pattern,
                    message: translate(field.errorKey),
                  },
                }),
              })}
            />
          );
        })}

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
          sx={{
            mt: 1,
            py: 1.5,
            fontWeight: 700,
            fontSize: "1rem",
            backgroundColor: colors.primary,
            "&:hover": { backgroundColor: colors.primaryDark },
            "&.Mui-disabled": { opacity: 0.7, color: "#fff" },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            translate("button.submit")
          )}
        </Button>
      </Stack>
    </Box>
  );
}
