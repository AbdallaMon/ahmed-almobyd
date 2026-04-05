"use client";
import { Box } from "@mui/material";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { leads, questions } from "@/app/v2/constants/leads";
import { Title } from "./Title";
import { LeadCard } from "./LeadCard";

/**
 * Renders the main service selection cards (Consultation, Interior Design, etc.).
 *
 * @param {{ handleClick: Function, isCatAnimated?: boolean }} props
 */
export function LeadCardsContainer({ handleClick, isCatAnimated }) {
  const { translate } = useLanguageContext();

  return (
    <Box className="leads-cards-container">
      <Title title={translate(questions.category)} className="category-title" />
      <Box>
        {leads.map((lead) => (
          <LeadCard
            key={lead.value}
            lead={lead}
            handleClick={handleClick}
            isCatAnimated={isCatAnimated}
          />
        ))}
      </Box>
    </Box>
  );
}
