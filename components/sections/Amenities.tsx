"use client";

import { motion } from "framer-motion";
import { Coffee, Gamepad2, Heart, Flame, Dumbbell, Tv, Leaf } from "lucide-react";
import { amenities, amenityCategories } from "@/data/amenities";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";

const iconMap: Record<string, React.ReactNode> = {
  coffee:   <Coffee size={18} />,
  gamepad:  <Gamepad2 size={18} />,
  heart:    <Heart size={18} />,
  flame:    <Flame size={18} />,
  dumbbell: <Dumbbell size={18} />,
  tv:       <Tv size={18} />,
  leaf:     <Leaf size={18} />,
};

const gold = "rgba(212,168,67,0.9)";

export default function Amenities() {
  const header = useScrollAnimationConfig(0.2);
  const grid   = useScrollAnimationConfig(0.1);

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
            "radial-gradient(ellipse at 10% 50%, rgba(212,168,67,0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 50%, rgba(180,100,50,0.04) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent)" }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          ref={header.ref}
          variants={staggerContainer}
          initial={header.initial}
          animate={header.animate}
          className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #d4a843, #f5d98a)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.7)" }}>
                Facilities & Amenities
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-light leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Everything<br />you need.
            </motion.h2>
          </div>

          <motion.p
            variants={staggerItem}
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "rgba(200,185,150,0.55)" }}
          >
            Coffee in the morning, sauna at dusk, a quiet walk through the
            greenhouse — everything thoughtfully provided so your stay feels
            effortless.
          </motion.p>
        </motion.div>

        {/* Categorized list */}
        <motion.div
          ref={grid.ref}
          variants={staggerContainer}
          initial={grid.initial}
          animate={grid.animate}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14"
        >
          {amenityCategories.map((cat) => {
            const items = amenities.filter((a) => a.category === cat.id);
            if (items.length === 0) return null;
            return (
              <motion.div key={cat.id} variants={staggerItem}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px" style={{ background: gold, opacity: 0.5 }} />
                  <p
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: gold }}
                  >
                    {cat.label}
                  </p>
                </div>
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          border: "1px solid rgba(212,168,67,0.25)",
                          color: gold,
                          background: "rgba(212,168,67,0.05)",
                        }}
                      >
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <h3
                          className="font-light mb-1 leading-tight"
                          style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: "1.35rem",
                            color: "rgba(245,235,200,0.95)",
                          }}
                        >
                          {item.name}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(200,185,150,0.55)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
