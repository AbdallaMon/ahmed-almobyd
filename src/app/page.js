import { Suspense } from "react";
import ClientPage from "./components/client-page/ClientPage";
import FloatingWhatsAppButton from "./components/buttons/FloatingWhatsappButton";
import LanguageProvider from "./providers/LanguageProvider";

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
