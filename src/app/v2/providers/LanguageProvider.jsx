"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionary } from "@/app/v2/constants/dictionary";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

export const LanguageContext = createContext(null);

const defaultCache = createCache({ key: "mui" });
const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtlPlugin] });

export default function LanguageProvider({
  children,
  initialLng = "ar",
  dontChecklocalStorage = false,
}) {
  const [lng, setLang] = useState(initialLng);

  function translate(key) {
    return dictionary[key]?.[lng] ?? key;
  }

  function changeLanguage(value) {
    setLang(value);
    window.localStorage.setItem("lng", value);
    const clonedTitle = document.querySelector(".cloned-location-title");
    if (clonedTitle) {
      const otherLng = value === "ar" ? "en" : "ar";
      // Find dictionary key by matching current text, then show the new language
      const matchedKey = Object.keys(dictionary).find(
        (k) => dictionary[k]?.[otherLng] === clonedTitle.textContent,
      );
      if (matchedKey) {
        clonedTitle.textContent = dictionary[matchedKey][value];
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !dontChecklocalStorage) {
      setLang(window.localStorage.getItem("lng") || "ar");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ translate, changeLanguage, lng }}>
      <CacheProvider value={lng === "ar" ? cacheRtl : defaultCache}>
        {children}
      </CacheProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguageContext = () => useContext(LanguageContext);
