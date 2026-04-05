"use client";
import { useEffect } from "react";
import DotsLoader from "@/app/v2/shared/components/DotsLoader";

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/register";
    }
  }, []);
  return <DotsLoader />;

  // return (
  // <LanguageProvider>
  //   <Suspense>
  //     <ClientPage />
  //     <FloatingWhatsAppButton />
  //   </Suspense>
  // </LanguageProvider>
  // );
}
