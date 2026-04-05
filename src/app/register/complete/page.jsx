import CompleteRegisterPage from "@/app/v2/modules/complete-register/CompleteRegisterPage";
import { Suspense } from "react";

export default function page({ searchParams }) {
  const { leadId } = searchParams;
  return (
    <Suspense>
      <CompleteRegisterPage leadId={leadId} />
    </Suspense>
  );
}
