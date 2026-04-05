"use client";
import {
  Box,
  Container,
  MenuItem,
  Select,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { IoArrowBackOutline } from "react-icons/io5";

/**
 * Fixed top header with a logo and language switcher.
 *
 * @param {{ sx?: object }} props
 */
export function Header({ sx, reverseAnimation }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { lng, changeLanguage } = useLanguageContext();
  const isRtl = lng === "ar";
  return (
    <Container
      maxWidth="md"
      sx={{ top: 8, left: 0, right: 0, position: "fixed", zIndex: 30 }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          background: theme.palette.background.paper,
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          margin: "0 12px",
          backgroundImage: "url('/logo-bg-full.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          overflow: "hidden",
          ...(isRtl
            ? { flexDirection: "row-reverse" }
            : { flexDirection: "row" }),
          ...sx,
        }}
      >
        {reverseAnimation && (
          <Box
            className="reverse-button"
            onClick={() => {
              if (reverseAnimation) {
                reverseAnimation();
              }
            }}
            // style={{
            //   left: 0,
            // }}
            sx={{
              ...(isRtl ? { right: 0 } : { left: 0 }),
              display: "none",
              zIndex: 2000,
              backgroundColor: "primary.main",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              position: "absolute",
            }}
          >
            <IoArrowBackOutline size={26} />
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src="/main-logo.jpg"
            alt="Dream Studio - Dream Design & Luxurious Home Solutions"
            className="logo"
            style={{ marginLeft: isMobile ? "-20px" : "-24px" }}
            sx={{ height: 0, width: "auto" }}
          />
        </Box>

        <Select
          value={lng}
          onChange={(e) => changeLanguage(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            color: "primary.main",
            minWidth: 80,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </Toolbar>
    </Container>
  );
}
