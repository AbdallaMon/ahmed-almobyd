"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { BOOKING_DATA } from "../data";

export default function VideoLandingPage({ showForm = false, setShowForm }) {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lng, translate } = useLanguageContext();
  if (showForm) return;
  return (
    <>
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
            src={BOOKING_DATA.landingIframeSrc}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("booking", "true");
            router.push(`?${params.toString()}`);
          }}
          sx={{
            height: { xs: 56, sm: 60 },
            maxHeight: { xs: 56, sm: 60 },
            borderRadius: 999,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            fontWeight: 700,
            boxShadow: theme.shadows[4],
            textTransform: "none",
          }}
        >
          {translate(BOOKING_DATA.freeVisit)}
        </Button>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontSize: { xs: "1rem", sm: "1.1rem" },
            fontWeight: 500,
          }}
        >
          {translate(BOOKING_DATA.makeDream)}
        </Typography>
      </Box>
    </>
  );
}
