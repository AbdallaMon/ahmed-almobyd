"use client";
import {
  alpha,
  Box,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";

/**
 * Minimal header for the booking / landing page.
 * Backdrop-blurred with language switcher only.
 *
 * @param {{ sx?: object }} props
 */
export function LandingHeader({ sx }) {
  const theme = useTheme();
  const { lng, changeLanguage, translate } = useLanguageContext();
  const isArabic = lng === "ar";

  return (
    <Box sx={{ width: "100%", py: 1.5, ...sx }}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 60,
          px: 1.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isArabic ? "row-reverse" : "row",
          borderRadius: "20px",
          backgroundColor: alpha(theme.palette.background.paper, 0.72),
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.08)}`,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.95rem", sm: "1rem" },
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: 0.2,
          }}
        >
          {translate("booking.bookFreeVisit")}
        </Typography>

        <Select
          value={lng}
          onChange={(e) => changeLanguage(e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            minWidth: 110,
            height: 40,
            borderRadius: 999,
            color: "text.primary",
            backgroundColor: alpha(theme.palette.background.default, 0.65),
            fontWeight: 600,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${alpha(theme.palette.divider, 0.45)}`,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(theme.palette.text.primary, 0.2),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "& .MuiSelect-select": { py: 1, pr: 4, pl: 1.5 },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </Toolbar>
    </Box>
  );
}
