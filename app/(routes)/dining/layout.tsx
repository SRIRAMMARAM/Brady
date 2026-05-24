import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dining — Brady Inn",
  description: "Discover local dining near Brady Inn. From farm-to-table restaurants to cozy mountain cafés, explore the best flavors the area has to offer.",
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
