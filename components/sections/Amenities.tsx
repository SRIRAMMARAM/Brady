"use client";

import { motion } from "framer-motion";
import {
  Sparkles, UtensilsCrossed, Plane, Waves, Bot, Film, Car, Wine,
} from "lucide-react";
import { amenities } from "@/data/amenities";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles size={22} />,
  "utensils-crossed": <UtensilsCrossed size={22} />,
  plane: <Plane size={22} />,
  waves: <Waves size={22} />,
  bot: <Bot size={22} />,
  film: <Film size={22} />,
  car: <Car size={22} />,
  wine: <Wine size={22} />,
};

const categoryColors: Record<string, { color: string; glow: string; border: string }> = {
  wellness: { color: "#a78bfa", glow: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.2)" },
  dining: { color: "#d4a843", glow: "rgba(212,168,67,0.08)", border: "rgba(212,168,67,0.18)" },
  transport: { color: "#00e5ff", glow: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.18)" },
  tech: { color: "#00e5ff", glow: "rgba(0,229,255,0.1)", border: "rgba(0,229,255,0.2)" },
  experience: { color: "#f5d98a", glow: "rgba(245,217,138,0.08)", border: "rgba(245,217,138,0.18)" },
};

export default function Amenities() {
  const header = useScrollAnimationConfig(0.2);
  const grid = useScrollAnimationConfig(0.1);

  return (
    <section
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#0d0d14" }}
    >
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 50%, rgba(124,58,237,0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 50%, rgba(0,229,255,0.03) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)" }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          ref={header.ref}
          variants={staggerContainer}
          initial={header.initial}
          animate={header.animate}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #7c3aed, #00e5ff)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(0,229,255,0.6)" }}>
                World-Class Amenities
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-light leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f0f0f5 0%, #9898a8 40%, #f0f0f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Crafted for<br />the Exceptional
            </motion.h2>
          </div>

          <motion.p
            variants={staggerItem}
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "rgba(152,152,168,0.6)" }}
          >
            Every detail of Brady Inn has been engineered to exceed expectation.
            Not as a feature list — as a way of life.
          </motion.p>
        </motion.div>

        {/* Amenities grid */}
        <motion.div
          ref={grid.ref}
          variants={staggerContainer}
          initial={grid.initial}
          animate={grid.animate}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {amenities.map((item, i) => {
            const c = categoryColors[item.category];
            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="group relative p-6 overflow-hidden"
                style={{
                  background: "rgba(5,5,8,0.5)",
                  border: `1px solid ${c.border}`,
                  backdropFilter: "blur(20px)",
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {/* Hover glow bg */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${c.glow} 0%, transparent 70%)`,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Top line accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{
                    background: c.glow,
                    border: `1px solid ${c.border}`,
                    color: c.color,
                  }}
                >
                  {iconMap[item.icon]}
                </div>

                {/* Category badge */}
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: c.color, opacity: 0.6 }}
                >
                  {item.category}
                </p>

                <h3
                  className="font-light mb-3 leading-tight"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "1.25rem",
                    color: "#f0f0f5",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(152,152,168,0.55)" }}
                >
                  {item.description}
                </p>

                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${c.glow} 100%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
