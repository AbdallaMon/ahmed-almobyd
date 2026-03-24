import { Suspense } from "react";
import LanguageProvider from "../providers/LanguageProvider";
import VideoLandingPage from "../UiComponents/client-page/booking/VideoLandingPage";

export default function BookingPage() {
  return (
    <LanguageProvider>
      <Suspense>
        <VideoLandingPage />
      </Suspense>
    </LanguageProvider>
  );
}
