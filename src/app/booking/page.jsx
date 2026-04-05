import { Suspense } from "react";
import BookingLayout from "../v2/modules/booking/BookingLayout";

export default function BookingPage() {
  return (
    <Suspense>
      <BookingLayout />
    </Suspense>
  );
}
