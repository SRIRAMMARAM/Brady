import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brady Casa Inn — Log Cabin Luxury, Lofted in Love",
  description:
    "A boutique cabin inn where rustic warmth meets refined comfort. Five rooms, five stories — each one made for a different kind of stay.",
  keywords: ["cabin inn", "log cabin luxury", "Brady Casa Inn", "boutique hotel", "mountain view ca"],
  openGraph: {
    title: "Brady Casa Inn",
    description: "Log Cabin Luxury, Lofted in Love",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      style={{ scrollBehavior: "auto" }}
    >
      <body style={{ backgroundColor: "#080604", color: "#f5efe0", overflowX: "hidden" }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
