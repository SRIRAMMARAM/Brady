import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings — Brady Inn",
};

export default function MyBookingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
