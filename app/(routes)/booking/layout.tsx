import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay — Brady Inn",
  description: "Reserve your cabin at Brady Inn. Check availability, choose your room, and book online or pay at the property.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
