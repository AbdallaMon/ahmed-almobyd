"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import {
  consultationLead,
  designLead,
  LeadType,
  questions,
} from "@/app/v2/constants";
import { Title } from "./Title";
import { LeadCategoryItem } from "./LeadCategoryItem";

/**
 * Renders the list of lead sub-types (e.g. Room, Plan, Apartment, Villa).
 *
 * @param {{
 *   leadCategory: string,
 *   location: string,
 *   onItemClick: Function,
 * }} props
 */
export function LeadCategoryItemsContainer({
  leadCategory,
  location,
  onItemClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { translate } = useLanguageContext();

  const items = leadCategory === "DESIGN" ? designLead : consultationLead;

  const mtValue = isMobile
    ? location
      ? "-550px"
      : "-500px"
    : location
      ? "-350px"
      : "-300px";

  // Items are only clickable after a location has been selected
  const handleClick = location ? onItemClick : () => null;
  return (
    <Box sx={{ mt: mtValue }}>
      <Title title={translate(questions.type)} className="item-title" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item) => (
          <LeadCategoryItem
            key={item.value}
            title={translate(LeadType[item.value])}
            value={item.value}
            subtitle={item.subtext}
            onClick={handleClick}
          />
        ))}
      </Box>
    </Box>
  );
}
