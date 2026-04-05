// Lead categories (maps to DB enum)
export const LeadCategory = {
  CONSULTATION: "category.consultation",
  DESIGN: "category.design",
};

// Lead types (maps to DB enum)
export const LeadType = {
  ROOM: "leadType.room",
  PLAN: "leadType.plan",
  CITY_VISIT: "leadType.cityVisit",
  APARTMENT: "leadType.apartment",
  CONSTRUCTION_VILLA: "leadType.villa",
  VILLA: "leadType.villa",
  UNDER_CONSTRUCTION_VILLA: "leadType.villaUnderConstruction",
  PART_OF_HOME: "leadType.partOfHome",
  COMMERCIAL: "leadType.commercial",
  NONE: "None",
};

// ── Card data for the main service selector ──────────────────────────────────
export const leads = [
  {
    title: "category.consultation",
    value: "CONSULTATION",
    image: "/consultation.jpg",
    alt: "Dream studio consultation with eng ahmed",
    type: "LINK",
    href: "https://decorstores.ltd/products/consultation-with-engineer-ahmed",
  },
  {
    title: "category.interiorDesign",
    value: "DESIGN",
    image: "/design.jfif",
    alt: "Dream Studio - Dream Design & Luxurious Home Solutions",
    type: "LINK",
    href: "/register",
  },
  {
    title: "category.books",
    value: "BOOKS",
    image: "/books.jpg",
    alt: "Dream Studio Books for interior design by Ahmed (dream studio)",
    type: "LINK",
    href: "https://decorstores.ltd/products/book",
  },
  {
    title: "category.engineersCourses",
    value: "COURSES",
    image: "/courses.jpg",
    alt: "Courses",
    href: "https://decorstores.ltd/products/animation",
    type: "LINK",
  },
];

// ── Consultation sub-types ────────────────────────────────────────────────────
export const consultationLead = [
  { name: "Room", value: "ROOM", subtext: "800", variantId: "48447274647863" },
  { value: "PLAN", subtext: "1200", variantId: "48447274615095" },
  { value: "CITY_VISIT", subtext: "1800", variantId: "48447274680631" },
];

export const variants = {
  ROOM: 48447274647863,
  PLAN: 48447274615095,
  CITY_VISIT: 48447274680631,
};

// ── Design sub-types ──────────────────────────────────────────────────────────
export const designLead = [
  { value: "APARTMENT" },
  { value: "CONSTRUCTION_VILLA" },
];

export const DesignLeadPrice = {
  APARTMENT: "price.designFee.15k",
  CONSTRUCTION_VILLA: "price.designFee.60k",
};

// ── UAE vs non-UAE location cards (for design flow) ──────────────────────────
// Mobile shows in natural order; desktop reverses (handled in DesignLeadsContainer)
export const designLeadTypes = [
  {
    title: "location.insideUAE",
    value: "INSIDE_UAE",
    image: "/inside-uae.webp",
    alt: "Dream studio create your dream design inside UAE",
  },
  {
    title: "location.outsideUAE",
    value: "OUTSIDE_UAE",
    image: "/outside-uae.jpg",
    alt: "Dream Studio - Dream Design & Luxurious Home Solutions.",
  },
];

// ── Price range configuration per design type ────────────────────────────────
export const priceRange = {
  APARTMENT: {
    type: "input",
  },
  CONSTRUCTION_VILLA: {
    type: "options",
    options: [
      { value: "300,000 AED or less", labelKey: "price.villa.300kOrLess" },
      { value: "300,000 to 400,000 AED", labelKey: "price.villa.300kTo400k" },
      { value: "400,000 to 600,000 AED", labelKey: "price.villa.400kTo600k" },
      { value: "600,000 to 800,000 AED", labelKey: "price.villa.600kTo800k" },
      { value: "800,000 AED and above", labelKey: "price.villa.800kAndAbove" },
    ],
  },
  UNDER_CONSTRUCTION_VILLA: {
    type: "options",
    options: [
      { value: "300,000 AED or less", labelKey: "price.villa.300kOrLess" },
      { value: "300,000 to 400,000 AED", labelKey: "price.villa.300kTo400k" },
      { value: "400,000 to 600,000 AED", labelKey: "price.villa.400kTo600k" },
      { value: "600,000 to 800,000 AED", labelKey: "price.villa.600kTo800k" },
      { value: "800,000 AED and above", labelKey: "price.villa.800kAndAbove" },
    ],
  },
  PART_OF_HOME: {
    type: "options",
    options: [
      { value: "25,000 AED or less", labelKey: "price.apt.25kOrLess" },
      { value: "25,000 to 45,000 AED", labelKey: "price.apt.25kTo45k" },
      { value: "45,000 to 65,000 AED", labelKey: "price.apt.45kTo65k" },
      { value: "65,000 to 85,000 AED", labelKey: "price.apt.65kTo85k" },
      { value: "85,000 AED and above", labelKey: "price.apt.85kAndAbove" },
    ],
  },
  COMMERCIAL: {
    type: "input",
  },
};

// Generic question prompts (used for section titles)
export const questions = {
  category: "form.chooseFromOptions",
  type: "form.chooseFromOptions",
};
