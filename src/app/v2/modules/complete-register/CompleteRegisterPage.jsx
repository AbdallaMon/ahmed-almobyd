"use client";

import AnimatedLeadPage from "@/app/v2/modules/lead-selection/AnimatedLeadPage";
import { CompleteRegisterForm } from "./CompleteRegisterForm";

export default function CompleteRegisterPage({ leadId }) {
  return (
    <AnimatedLeadPage
      renderForm={({ location, category, item }) => (
        <CompleteRegisterForm
          location={location}
          category={category}
          item={item}
          leadId={leadId}
        />
      )}
    />
  );
}
