"use client";

import * as React from "react";
import { Box, Button, Container, useTheme } from "@mui/material";
import { LandingHeader } from "../LeacComponents";
import { useLanguageContext } from "@/app/providers/LanguageProvider";

export default function VideoLandingPage({}) {
  const theme = useTheme();
  const { lng } = useLanguageContext();
  const isArabic = lng === "ar";

  return (
    <Box
      sx={{
        // height: "100vh",// consider the bar of browser
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            pb: 2,
            px: { xs: 2, sm: 3 },
            gap: 2,
          }}
        >
          <LandingHeader />

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: theme.shadows[8],
                bgcolor: "#000",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                component="iframe"
                src="https://www.youtube.com/embed/vhIdEs8GPJ0?si=Wd28HsfMa3VW3UQh"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            fullWidth
            component="a"
            href="/booking"
            sx={{
              height: { xs: 56, sm: 60 },
              maxHeight: { xs: 56, sm: 60 },
              borderRadius: 999,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontWeight: 700,
              boxShadow: theme.shadows[4],
              textTransform: "none",
              flex: 1,
            }}
          >
            {isArabic ? "سجل الآن" : "Register Now"}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
