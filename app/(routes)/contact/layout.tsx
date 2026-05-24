import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Brady Inn",
  description: "Get in touch with Brady Inn. We're happy to answer questions about availability, group bookings, or your upcoming stay.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
