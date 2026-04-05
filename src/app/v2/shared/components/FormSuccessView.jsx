"use client";
import { useEffect } from "react";
import { Alert, Paper, Typography } from "@mui/material";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { ConsultLevels } from "@/app/v2/modules/consult-levels/ConsultLevels";
import gsap from "gsap";

/**
 * Success card shown inside the form overlay after a successful submission.
 *
 * @param {{ lng: string, showLevels?: boolean }} props
 */
export function FormSuccessView({ lng, showLevels = false }) {
  const { translate } = useLanguageContext();

  useEffect(() => {
    // Hide the back button — user has finished the flow
    gsap.set(".reverse-button", { display: "none" });
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "#fff",
        textAlign: "center",
        direction: "ltr",
      }}
    >
      <Alert severity="success">
        <Typography variant="body1" p={4} fontSize="1.2rem">
          {translate("status.thankYou")}
        </Typography>
      </Alert>

      {showLevels && <ConsultLevels />}
    </Paper>
  );
}
