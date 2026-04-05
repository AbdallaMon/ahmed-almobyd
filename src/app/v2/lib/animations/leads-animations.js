import { gsap } from "gsap";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function isMobile() {
  return window.matchMedia("(max-width: 899px)").matches;
}

/**
 * Animate the selected card to fill the screen and push others away.
 * Uses tl.set (instant) — suited for the register flow where the card
 * selection happens automatically on mount.
 */
function animateCardToFullScreen(
  tl,
  itemClass,
  animatedElementClass,
  shadowClass = "shadow-lead-card",
) {
  const allOtherItems = document.querySelectorAll(
    `.${itemClass}:not(.${animatedElementClass})`,
  );
  const animatedElement = document.querySelector(`.${animatedElementClass}`);
  const animatedShadow = animatedElement.querySelector(`.${shadowClass}`);
  const { top, left, height, width } = animatedElement.getBoundingClientRect();

  const centerX = window.innerWidth / 2 - width / 2;
  const centerY = window.innerHeight / 2 - height / 2;

  tl.set(`.${itemClass} .${shadowClass}`, {
    boxShadow: "none",
    borderRadius: "0px",
    position: "fixed",
    width,
    height,
  });

  tl.set(animatedShadow, { left: `${left}px`, top: `${top}px` });

  allOtherItems.forEach((el) => {
    const { left: l, top: t } = el.getBoundingClientRect();
    tl.set(el.querySelector(`.${shadowClass}`), {
      left: `${l}px`,
      top: `${t}px`,
    });
  });

  tl.set(
    document.querySelectorAll(
      `.${itemClass}:not(.${animatedElementClass}) .${shadowClass}`,
    ),
    { x: -100, opacity: 0 },
  );

  tl.set(animatedShadow, {
    top: `${centerY}px`,
    left: `${centerX}px`,
    width,
    height,
  });

  const leadText = animatedElement.querySelector("h4");
  tl.set(leadText, {
    top: "80px",
    left: "50%",
    transform: "translate(-50%,0%)",
  });
  tl.set(animatedShadow, { top: 0, left: 0, height: "100vh", width: "100vw" });
  tl.set(leadText, { opacity: 0, top: 0 });
}

// ─── Lead category animation (register pages — DESIGN only) ───────────────────

/**
 * Instantly selects the DESIGN card and reveals location options.
 * Used by /register and /register/complete (auto-triggered on mount).
 */
export function animateDesignCategorySelection({
  setIsAnimating,
  setIsCatAnimated,
}) {
  setIsAnimating(true);
  const mobile = isMobile();
  const tl = gsap.timeline();

  animateCardToFullScreen(tl, "lead-card", "DESIGN", "shadow-lead-card");

  tl.fromTo(
    ".logo",
    { marginLeft: mobile ? -20 : -24 },
    { marginLeft: 10 },
    "<",
  );
  tl.fromTo(".reverse-button", { x: -60 }, { display: "flex", x: 5 }, "<");
  tl.fromTo(".location", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "<");
  tl.fromTo(
    ".design-cards-container > h4",
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0 },
    "<",
  );

  tl.then(() => {
    setIsAnimating(false);
    setIsCatAnimated(true);
  });
}

// ─── Lead items (consultation / design type selection) ────────────────────────

function showLeadItems(tl) {
  tl.fromTo(
    ".lead-item",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out" },
    "<",
  );
  tl.fromTo(
    ".item-title",
    { opacity: 0, y: -50 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    "<",
  );
}

function hideLeadItems(tl) {
  tl.fromTo(
    ".item-title",
    { opacity: 1, y: 0 },
    { opacity: 0, y: 50, duration: 0.6, ease: "power3.inOut" },
  );
  tl.to(".lead-item", {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power3.inOut",
  });
}

// ─── Form page slide-in ────────────────────────────────────────────────────────

export function animateFormPage({ setIsAnimating, setIsItemAnimated }) {
  setIsAnimating(true);
  const tl = gsap.timeline();

  tl.fromTo(
    ".form-page",
    { top: "100%", opacity: 0 },
    { top: 0, opacity: 1, display: "block", duration: 0.8, ease: "power3.out" },
  );

  tl.fromTo(
    ".final-selection-form",
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
  ).then(() => {
    setIsAnimating(false);
    setIsItemAnimated(true);
  });
}

function animateFormPageOut({
  tl,
  setLeadItem,
  setAnimateLeadItem,
  setIsItemAnimated,
  setIsReversing,
}) {
  tl.fromTo(
    ".form-page",
    { top: 0, opacity: 1, display: "block" },
    {
      top: "100%",
      opacity: 0,
      display: "none",
      duration: 0.8,
      ease: "power3.inOut",
    },
  ).then(() => {
    setLeadItem("");
    setAnimateLeadItem("");
    setIsItemAnimated(false);
    setIsReversing(false);
  });
}

// ─── Location animation (Inside UAE / Outside UAE) ────────────────────────────

function animateLocationIn({ location, tl, leadCategory, translate }) {
  const isRtl =
    document.documentElement.dir === "rtl" || document.body.dir === "rtl";
  const locationQuestionTitle = document.querySelector(".design-title");
  const animatedElement = document.querySelector(`.${location}`);
  const locationTitle = animatedElement.querySelector("h4");
  const leadTitle = document.querySelector(`.${leadCategory} h4`);

  const clonedTitle = locationTitle.cloneNode(true);
  const rect = locationTitle.getBoundingClientRect();
  const leadTitleRect = leadTitle.getBoundingClientRect();

  // Position using left = center of original text, then xPercent: -50
  // so the clone's center sits exactly on the original text's center.
  const centerX = rect.left + rect.width / 2;

  Object.assign(clonedTitle.style, {
    position: "fixed",
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: "0",
    transform: "none",
    zIndex: "16",
  });
  clonedTitle.classList.add("cloned-location-title");
  document.body.appendChild(clonedTitle);

  // Place clone so its center aligns with the original text's center
  tl.set(clonedTitle, {
    left: centerX,
    top: rect.top,
    xPercent: -50,
    right: "auto",
  });
  // return;
  tl.fromTo(
    locationQuestionTitle,
    { y: 0, opacity: 1 },
    { y: -100, opacity: 0, duration: 0.8, ease: "power3.inOut" },
  );
  tl.set(locationTitle, { opacity: 0 });
  // Animate from original center to screen center (50vw)
  tl.fromTo(
    clonedTitle,
    { top: rect.top, left: centerX, xPercent: -50, right: "auto" },
    {
      top: leadTitleRect.top + 10,
      left: "50%",
      xPercent: -50,
      duration: 1.2,
      ease: "power3.inOut",
    },
  );
  tl.to(leadTitle, { x: isRtl ? -100 : 100 }, "<");
  tl.set(clonedTitle, { opacity: 0 });
  tl.fromTo(
    ".location",
    { opacity: 1, y: 0 },
    { opacity: 0, y: 100, duration: 0.8, zIndex: -15, ease: "power3.inOut" },
    "<-0.5",
  );
}

export function animateLocationItem({
  leadCategory,
  location,
  setIsAnimating,
  setIsLocationAnimated,
  translate,
}) {
  setIsAnimating(true);
  const tl = gsap.timeline();

  animateLocationIn({ location, tl, leadCategory, translate });
  showLeadItems(tl);

  tl.then(() => {
    setIsAnimating(false);
    setIsLocationAnimated(true);
  });
}

function reverseLocationAnimation({ tl, location, leadCategory }) {
  const isRtl =
    document.documentElement.dir === "rtl" || document.body.dir === "rtl";
  const animatedElement = document.querySelector(`.${location}`);
  const locationTitle = animatedElement.querySelector("h4");
  const leadTitle = document.querySelector(`.${leadCategory} h4`);
  const clonedTitle = document.querySelector(".cloned-location-title");
  const locationQuestionTitle = document.querySelector(".design-title");

  const leadTitleRect = leadTitle.getBoundingClientRect();
  const clonedTitleRect = clonedTitle.getBoundingClientRect();
  const rect = locationTitle.getBoundingClientRect();

  tl.fromTo(
    locationQuestionTitle,
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.inOut" },
  );
  tl.fromTo(
    ".location",
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 0.8, zIndex: 15, ease: "power3.inOut" },
    "<",
  );
  tl.to(leadTitle, { x: 0 }, "<");
  tl.set(clonedTitle, { opacity: 1 }, "<");

  // rect was captured while location is at y:100, so subtract the offset
  const targetCenterX = rect.left + rect.width / 2;
  const targetTop = rect.top - 100;

  tl.fromTo(
    clonedTitle,
    {
      top: leadTitleRect.top,
      left: "50%",
      xPercent: -50,
    },
    {
      top: targetTop,
      left: targetCenterX,
      xPercent: -50,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => clonedTitle.remove(),
    },
    "<",
  );
  tl.set(locationTitle, { opacity: 1 });
  tl.then(() => clonedTitle.remove());
}

// ─── Master reverse animation ─────────────────────────────────────────────────

export function reverseAnimation({
  location,
  isLocationAnimated,
  setLocation,
  setAnimateLocation,
  setIsLocationAnimated,
  leadItem,
  isItemAnimated,
  isReversing,
  isAnimating,
  setIsReversing,
  setLeadItem,
  setAnimateLeadItem,
  setIsItemAnimated,
  leadCategory,
  isCatAnimated,
  setLeadCategory,
  setAnimateLeadType,
  setIsCatAnimated,
}) {
  if (leadItem && isItemAnimated && !isReversing && !isAnimating) {
    setIsReversing(true);
    const tl = gsap.timeline();
    animateFormPageOut({
      tl,
      setLeadItem,
      setIsReversing,
      setAnimateLeadItem,
      setIsItemAnimated,
    });
    return;
  }

  if (location && isLocationAnimated && !isAnimating && !isReversing) {
    setIsReversing(true);
    const tl = gsap.timeline();
    hideLeadItems(tl);
    reverseLocationAnimation({ tl, location, leadCategory });
    tl.then(() => {
      setAnimateLocation("");
      setIsLocationAnimated(false);
      setIsReversing(false);
      setLocation("");
    });
    return;
  }

  if (leadCategory && isCatAnimated && !isReversing && !isAnimating) {
    // Go back home when at the category level
    window.location.href = "/";
  }
}
