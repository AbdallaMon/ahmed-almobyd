"use client";

import { useLanguageContext } from "../../providers/LanguageProvider";
import { useTheme } from "@emotion/react";
import { Box, Container } from "@mui/material";
import { LandingHeader } from "../layout/LandingHeader";
import VideoLandingPage from "./components/VideoLandingPage";
import { useSearchParams } from "next/navigation";
import { Steps } from "./components/steps/Steps";

export default function BookingLayout({ children }) {
  const theme = useTheme();
  const { lng, translate } = useLanguageContext();
  // const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();
  const showForm = searchParams.get("booking") === "true";
  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
          <VideoLandingPage showForm={showForm} />
          {showForm && <Steps showForm={showForm} />}
        </Container>
      </Box>
    </Box>
  );
}
