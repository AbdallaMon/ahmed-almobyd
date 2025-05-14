import { Suspense } from "react";
import LanguageProvider from "./providers/LanguageProvider";
import ClientPage from "./UiComponents/client-page/ClientPage";
import FloatingWhatsAppButton from "./UiComponents/buttons/FloatingWhatsappButton";

export default function page() {
  return (
    <LanguageProvider>
      <Suspense>
        <ClientPage />
        <FloatingWhatsAppButton />
      </Suspense>
    </LanguageProvider>
  );
}
