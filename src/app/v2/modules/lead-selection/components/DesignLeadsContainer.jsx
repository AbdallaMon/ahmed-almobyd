"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { designLeadTypes, questions } from "@/app/v2/constants/leads";
import { Title } from "./Title";
import { LeadCard } from "./LeadCard";

// Desktop reverses the order so "Inside UAE" appears on the right
const desktopItems = [
  {
    title: "location.outsideUAE",
    value: "OUTSIDE_UAE",
    image: "/outside-uae.jpg",
    alt: "Dream studio create your dream design inside UAE",
  },
  {
    title: "location.insideUAE",
    value: "INSIDE_UAE",
    image: "/inside-uae.webp",
    alt: "Dream Studio - Dream Design & Luxurious Home Solutions.",
  },
];

/**
 * Renders the UAE / non-UAE location cards for the DESIGN flow.
 *
 * @param {{ handleClick: Function }} props
 */
export function DesignLeadsContainer({ handleClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { translate } = useLanguageContext();

  const items = isMobile ? designLeadTypes : desktopItems;

  return (
    <Box
      className="design-cards-container"
      sx={{ mt: isMobile ? "-900px" : "-540px" }}
    >
      <Title title={translate(questions.category)} className="design-title" />
      <Box>
        {items.map((lead) => (
          <LeadCard
            key={lead.value}
            lead={lead}
            handleClick={handleClick}
            className="location"
          />
        ))}
      </Box>
    </Box>
  );
}
