"use client";
import { useEffect, useState } from "react";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import {
  animateDesignCategorySelection,
  animateFormPage,
  animateLocationItem,
  reverseAnimation,
} from "@/app/v2/lib/animations/leads-animations";

/**
 * Manages all animation state for the animated lead-selection pages
 * (/register and /register/complete).
 *
 * The DESIGN category is always pre-selected and animated on mount.
 */
export function useLeadAnimation() {
  const [leadCategory, setLeadCategory] = useState("DESIGN");
  const [animateLeadType, setAnimateLeadType] = useState("");
  const [isCatAnimated, setIsCatAnimated] = useState(false);

  const [leadItem, setLeadItem] = useState("");
  const [animateLeadItem, setAnimateLeadItem] = useState("");
  const [isItemAnimated, setIsItemAnimated] = useState(false);

  const [location, setLocation] = useState("");
  const [animateLocation, setAnimateLocation] = useState("");
  const [isLocationAnimated, setIsLocationAnimated] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isReversing, setIsReversing] = useState(false);

  const { translate } = useLanguageContext();

  // Auto-start DESIGN selection on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (typeof window !== "undefined") {
      triggerCategoryAnimation("DESIGN");
    }
  }, []);

  // Watch for category animation trigger — guard flags intentionally omitted to prevent loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      animateLeadType === "animate" &&
      !isCatAnimated &&
      !isAnimating &&
      !isReversing
    ) {
      animateDesignCategorySelection({ setIsAnimating, setIsCatAnimated });
    }
  }, [animateLeadType]);

  // Watch for lead item animation trigger — guard flags intentionally omitted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      animateLeadItem === "animate" &&
      !isItemAnimated &&
      !isAnimating &&
      !isReversing
    ) {
      animateFormPage({ setIsAnimating, setIsItemAnimated });
    }
  }, [animateLeadItem]);

  // Watch for location animation trigger — guard flags intentionally omitted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      animateLocation === "animate" &&
      !isLocationAnimated &&
      !isAnimating &&
      !isReversing
    ) {
      animateLocationItem({
        leadCategory,
        location,
        setIsAnimating,
        setIsLocationAnimated,
        translate,
      });
    }
  }, [animateLocation]);

  function triggerCategoryAnimation(value) {
    // document.html.dir = "ltr";
    if (value !== "DESIGN") return; // only DESIGN is supported on register pages
    if (isCatAnimated || isAnimating || isReversing) return;
    setLeadCategory(value);
    setAnimateLeadType("animate");
    window.sessionStorage.setItem("animated", "done");
  }

  function handleLocationClick(value) {
    if (isLocationAnimated || isAnimating || isReversing) return;
    setLocation(value);
    setAnimateLocation("animate");
  }

  function handleLeadItemClick(value) {
    if (isItemAnimated || isAnimating || isReversing) return;
    setLeadItem(value);
    setAnimateLeadItem("animate");
  }

  function handleReverseAnimation() {
    reverseAnimation({
      location,
      leadCategory,
      leadItem,
      isCatAnimated,
      isItemAnimated,
      isLocationAnimated,
      isAnimating,
      isReversing,
      setIsItemAnimated,
      setIsCatAnimated,
      setAnimateLeadItem,
      setAnimateLeadType,
      setIsReversing,
      setLeadCategory,
      setLeadItem,
      setAnimateLocation,
      setIsLocationAnimated,
      setLocation,
    });
  }

  return {
    leadCategory,
    isCatAnimated,
    location,
    leadItem,
    handleLocationClick,
    handleLeadItemClick,
    handleReverseAnimation,
    // Passed to LeadCardsContainer (disables card clicks once animated)
    triggerCategoryAnimation,
  };
}
