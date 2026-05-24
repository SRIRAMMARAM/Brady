import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms — Brady Inn",
  description: "Explore our five handcrafted log cabin rooms, from the intimate Fireside Room to the sprawling Family Lodge. Each space tells its own story.",
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
