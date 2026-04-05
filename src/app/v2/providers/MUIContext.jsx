"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import colors from "@/app/v2/theme/colors";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { useLanguageContext } from "./LanguageProvider";
import { Noto_Kufi_Arabic } from "next/font/google";

const ltrCache = createCache({ key: "mui" });
const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [rtlPlugin],
});
const themeConf = {
  palette: {
    primary: {
      main: colors.primary,
      light: colors.primaryAlt,
      dark: colors.primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.secondaryText,
    },
    text: {
      primary: colors.textColor,
      secondary: colors.heading,
      white: "#ffffff",
      disabled: colors.textColor,
    },
    background: {
      default: colors.body,
      paper: colors.paperBg,
    },
    common: { white: colors.bgPrimary },
    action: {
      hover: colors.primaryAlt,
      selected: colors.bgSecondary,
    },
    gradient: { primary: colors.primaryGradient },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1500,
  },
  typography: {
    fontFamily: ["Noto Kufi Arabic", "sans-serif"].join(","),
    h1: { color: colors.heading },
    h2: { color: colors.heading },
    h3: { color: colors.heading },
    body1: { color: colors.textColor },
    body2: { color: colors.secondaryText },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, xxl: 1920 },
  },
  components: {
    MuiContainer: { defaultProps: { maxWidth: "xxl" } },
    MuiPaper: {
      styleOverrides: { root: { backgroundColor: colors.bgPrimary } },
    },
    MuiSvgIcon: {
      styleOverrides: { root: { color: colors.textColor } },
    },
  },
};
const theme = createTheme(themeConf);
const themeRtl = createTheme({ ...themeConf, direction: "rtl" });
const noto = Noto_Kufi_Arabic({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
});
export default function MUIContextProvider({ children }) {
  const { lng } = useLanguageContext();
  const themeToUse = lng === "ar" ? themeRtl : theme;
  return (
    <CacheProvider value={lng === "ar" ? rtlCache : ltrCache}>
      <ThemeProvider theme={themeToUse}>
        <CssBaseline />
        <body
          className={noto.className}
          style={{ backgroundColor: colors.bgSecondary }}
          dir={lng === "ar" ? "rtl" : "ltr"}
          lang={lng}
        >
          {children}
        </body>
      </ThemeProvider>
    </CacheProvider>
  );
}
