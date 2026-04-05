"use client";

import { Box, Typography } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import colors from "@/app/v2/theme/colors";

export function StepCard({ step, onSelect, isActive, isDisabled = false }) {
  const { translate } = useLanguageContext();

  return (
    <Box
      className="step-select-card"
      data-value={step.value}
      onClick={() => !isDisabled && onSelect(step.value)}
      sx={{
        position: "relative",
        width: "100%",
        height: "180px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: isDisabled ? "not-allowed" : "pointer",
        border: "2px solid",
        borderColor: isActive ? colors.primary : "transparent",
        boxShadow: isActive
          ? `0 0 0 3px ${colors.primary}55, 0 4px 16px rgba(0,0,0,0.22)`
          : "0px 3px 10px rgba(0,0,0,0.22)",
        transition: "border-color 0.24s, box-shadow 0.24s",
        transformOrigin: "center center",
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={step.image?.src}
        alt={translate(step.image?.altKey)}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Click flash overlay — animated by GSAP */}
      <Box
        className="step-select-flash"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: colors.primary,
          opacity: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Active tint */}
      {isActive && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: colors.primary,
            opacity: 0.15,
            zIndex: 2,
          }}
        />
      )}

      {/* Label */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          zIndex: 3,
          color: "#fff",
          fontWeight: 700,
          textAlign: "center",
          textShadow: "0 1px 4px rgba(0,0,0,0.6)",
        }}
      >
        {translate(step.key)}
      </Typography>

      {/* Check icon when active */}
      {isActive && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 4,
            color: colors.primary,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
            display: "flex",
          }}
        >
          <BsCheckCircleFill size={20} />
        </Box>
      )}
    </Box>
  );
}
