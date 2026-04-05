"use client";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./DotsLoader.module.css";

/**
 * Full-screen dots loader shown during initial page transitions.
 * Removes itself from the DOM once the page has loaded.
 *
 * @param {{ instantLoading?: boolean }} props
 */
export default function DotsLoader({ instantLoading }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !instantLoading) {
      setVisible(false);
    }
  }, [instantLoading]);

  useEffect(() => {
    if (!visible) {
      const el = document.querySelector(".dot_container");
      if (el) window.setTimeout(() => el.remove(), 100);
    }
  }, [visible]);

  return (
    <div className={`dot_container ${styles.dot_container}`}>
      <Box sx={{ width: "100%", height: "20px", textAlign: "center" }}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </Box>
    </div>
  );
}
