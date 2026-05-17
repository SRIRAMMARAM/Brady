"use client";

import { motion } from "framer-motion";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";
import { staggerContainer, staggerItem } from "@/animations/variants";

const stats = [
  { value: "88", label: "Floors Above", sub: "the city lights" },
  { value: "42", label: "Bespoke Suites", sub: "each one unique" },
  { value: "3★", label: "Michelin Stars", sub: "NOCT Restaurant" },
  { value: "∞", label: "Altitude Pool", sub: "open 24 hours" },
];

export default function Stats() {
  const { ref, animate, initial } = useScrollAnimationConfig(0.2);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050508 0%, #0d0d14 50%, #050508 100%)",
        }}
      />
      {/* Horizontal dividers */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)",
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="relative flex flex-col items-center justify-center py-12 px-6 text-center group"
            >
              {/* Vertical separator (not on last) */}
              {i < stats.length - 1 && (
                <div
                  className="absolute right-0 top-1/4 bottom-1/4 w-px hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)",
                  }}
                />
              )}

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)",
                }}
                transition={{ duration: 0.4 }}
              />

              <motion.p
                className="font-light mb-2 leading-none"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  background:
                    "linear-gradient(135deg, #f0f0f5 0%, #9898a8 50%, #f0f0f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.03em",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={animate === "visible" ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {stat.value}
              </motion.p>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ color: "rgba(240,240,245,0.6)" }}
              >
                {stat.label}
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(152,152,168,0.4)" }}
              >
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
