"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useParallax(
  speed = 0.3,
  inputRange: [number, number] = [0, 1]
): { ref: React.RefObject<HTMLDivElement | null>; y: MotionValue<string> } {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const outputStart = `${inputRange[0] * speed * -100}px`;
  const outputEnd = `${inputRange[1] * speed * 100}px`;

  const y = useTransform(scrollYProgress, [0, 1], [outputStart, outputEnd]);

  return { ref, y };
}

export function useHeroParallax() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], ["0%", "30%"]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  return { y, opacity };
}
