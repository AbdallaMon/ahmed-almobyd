"use client";

import { Box, Container, Paper } from "@mui/material";
import { IoArrowBackOutline } from "react-icons/io5";

import colors from "@/app/v2/theme/colors";
import { useLeadAnimation } from "@/app/v2/modules/lead-selection/hooks/useLeadAnimation";
import { Header } from "@/app/v2/modules/layout/Header";
import { LeadCardsContainer } from "@/app/v2/modules/lead-selection/components/LeadCardsContainer";
import { DesignLeadsContainer } from "@/app/v2/modules/lead-selection/components/DesignLeadsContainer";
import { LeadCategoryItemsContainer } from "@/app/v2/modules/lead-selection/components/LeadCategoryItemsContainer";

/**
 * Shared animated lead-selection shell used by both /register and /register/complete.
 *
 * @param {{ renderForm: (props: { location: string, category: string, item: string }) => JSX.Element }} props
 */
export default function AnimatedLeadPage({ renderForm }) {
  const {
    leadCategory,
    isCatAnimated,
    location,
    leadItem,
    triggerCategoryAnimation,
    handleLocationClick,
    handleLeadItemClick,
    handleReverseAnimation,
  } = useLeadAnimation();
  return (
    <>
      {/* Full-screen background overlay shown before the DESIGN animation starts */}
      {!isCatAnimated && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 4000,
            width: "100vw",
            height: "100%",
            top: 0,
            left: 0,
            backgroundImage: "url(/design.jfif)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              zIndex: 2,
              background:
                "linear-gradient(169deg, rgba(45, 35, 30, 0.3) 0%, rgba(45, 35, 30, 0.85) 100%)",
            }}
          />
        </Box>
      )}

      <Header reverseAnimation={handleReverseAnimation} />

      <Container
        maxWidth="md"
        sx={{
          height: !leadCategory
            ? "auto"
            : (leadCategory !== "DESIGN" && !leadItem) || leadItem
              ? "100vh"
              : "auto",
          overflow: { md: "hidden" },
          py: { xs: 3, md: 4 },
          pb: { xs: 16, md: 10 },
        }}
      >
        <Paper
          className="page-container"
          elevation={2}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: "12px",
            backgroundColor: colors.bgPrimary,
            width: "100%",
            minHeight: "calc(100vh - 48px)",
          }}
        >
          <LeadCardsContainer
            handleClick={triggerCategoryAnimation}
            isCatAnimated={isCatAnimated}
          />

          {leadCategory && (
            <>
              {leadCategory === "DESIGN" && (
                <DesignLeadsContainer handleClick={handleLocationClick} />
              )}
              <LeadCategoryItemsContainer
                leadCategory={leadCategory}
                onItemClick={handleLeadItemClick}
                location={location}
              />
            </>
          )}
        </Paper>
      </Container>

      {/* Form slide-in panel */}
      <Box
        className="form-page"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: colors.bgPrimary,
          zIndex: leadCategory === "CONSULTATION" ? 200000000000 : 20,
          display: "none",
          overflowY: "auto",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            height: "fit-content",
            py: { xs: 3, md: 4 },
            pb: { xs: leadCategory ? 25 : 18, md: 19 },
            ...(leadCategory && { pt: { xs: 12, md: 12 } }),
          }}
        >
          {renderForm({ location, category: leadCategory, item: leadItem })}
        </Container>
      </Box>
    </>
  );
}
