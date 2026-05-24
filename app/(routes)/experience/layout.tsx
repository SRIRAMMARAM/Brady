import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences — Brady Inn",
  description: "From guided hikes to starlit evenings by the fire — explore the curated experiences waiting for you at Brady Inn.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
