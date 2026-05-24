import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Brady Inn",
  description: "Browse photos of Brady Inn's cabin rooms, outdoor spaces, and the natural beauty surrounding our mountain retreat.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
