import { Suspense } from "react";
import LanguageProvider from "../providers/LanguageProvider";
import BookingForm from "../UiComponents/client-page/booking/BookingForm";

export default function BookingPage() {
  return (
    <LanguageProvider>
      <Suspense>
        <BookingForm />
      </Suspense>
    </LanguageProvider>
  );
}
