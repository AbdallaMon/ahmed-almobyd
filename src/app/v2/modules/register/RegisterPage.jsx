"use client";

import AnimatedLeadPage from "@/app/v2/modules/lead-selection/AnimatedLeadPage";
import { TempRegisterForm } from "./TempRegisterForm";

export default function RegisterPage() {
  return (
    <AnimatedLeadPage
      renderForm={({ location, category, item }) => (
        <TempRegisterForm location={location} category={category} item={item} />
      )}
    />
  );
}
