import { bookings as bookingApi } from "@/lib/api";
import {
  BookingConfirmedView,
  BookingConfirmedError,
} from "@/components/BookingConfirmedView";

export default async function BookingConfirmedPage({
  params,
}: {
  params: Promise<{ ref_code: string }>;
}) {
  const { ref_code } = await params;

  try {
    const booking = await bookingApi.get(ref_code);
    return <BookingConfirmedView booking={booking} />;
  } catch {
    return <BookingConfirmedError message="Booking not found or could not be loaded." />;
  }
}
