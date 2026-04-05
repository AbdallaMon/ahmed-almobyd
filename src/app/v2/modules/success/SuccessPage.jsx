"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { FaCheckCircle, FaHome, FaTimesCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { getData } from "@/app/v2/lib/api";
import { dictionary } from "@/app/v2/constants/dictionary";

function t(key, lng) {
  return dictionary[key]?.[lng] ?? key;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("checking");
  const [redirectCountdown, setRedirectCountdown] = useState(2);

  const session_id = searchParams.get("session_id");
  const clientLeadId = searchParams.get("clientLeadId");
  const lng = searchParams.get("lng") || "ar";

  const direction = lng === "en" ? "ltr" : "rtl";

  useEffect(() => {
    if (!session_id || !clientLeadId) return;

    const updatePaymentStatus = async () => {
      const request = await getData({
        url: `client/payment-status?sessionId=${session_id}&clientLeadId=${clientLeadId}&lng=${lng}&`,
        setLoading,
      });
      if (request?.status === 200 && request.paymentStatus === "PAID") {
        setStatus("PAID");
        const interval = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              window.location.href = `/register/complete?leadId=${clientLeadId}`;
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setStatus("ERROR");
      }
    };

    updatePaymentStatus();
  }, [session_id, clientLeadId]);

  if (loading) {
    return (
      <Container maxWidth="sm" dir={direction}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 3 }}>
            {t("success.loading", lng)}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" dir={direction}>
      <Paper
        elevation={3}
        sx={{ mt: 5, mb: 5, p: 4, borderRadius: 2, textAlign: "center" }}
      >
        {status === "PAID" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <FaCheckCircle
              style={{
                color: "#4caf50",
                fontSize: "64px",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              {t("success.paymentTitle", lng)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 3, fontWeight: "medium", color: "text.secondary" }}
            >
              {t("success.redirectMessage", lng)}
            </Typography>

            {/* Countdown circle */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                color: "white",
                fontWeight: "bold",
                fontSize: 24,
                mt: 2,
                mb: 1,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                animation: "pulse 1s infinite",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(25,118,210,0.7)" },
                  "70%": { boxShadow: "0 0 0 10px rgba(25,118,210,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(25,118,210,0)" },
                },
              }}
            >
              {redirectCountdown}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t("success.seconds", lng)}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <FaTimesCircle
              style={{
                color: "#f44336",
                fontSize: "64px",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              {t("success.errorTitle", lng)}
            </Typography>
            <Typography variant="body1" paragraph>
              {t("success.errorMessage", lng)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
