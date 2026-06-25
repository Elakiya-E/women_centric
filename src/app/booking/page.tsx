export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import BookingContent from "./BookingContent";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
