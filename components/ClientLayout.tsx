"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface ClientLayoutProps {
  children: React.ReactNode;
}

function SmoothScrollProvider() {
  useSmoothScroll();
  return null;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <SmoothScrollProvider />
      {!isMobile && <CursorGlow />}
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
