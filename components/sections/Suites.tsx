"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";
import { featuredRooms } from "@/data/rooms";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

export default function Suites() {
  const header = useScrollAnimationConfig(0.2);
  const cards = useScrollAnimationConfig(0.1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const gold = "rgba(212,168,67,0.9)";

  return (
    <section className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: "#050508" }}>
      {/* Ambient warm glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(212,168,67,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          ref={header.ref}
          variants={staggerContainer}
          initial={header.initial}
          animate={header.animate}
          className="mb-16 md:mb-24"
        >
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>
              Our Rooms
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
              Every Room<br />Tells a Story
            </motion.h2>

            <motion.div variants={staggerItem} className="max-w-xs">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(200,185,150,0.55)" }}>
                Five rooms. Five different journeys. We don&apos;t just give you a bed —
                we match you with the experience you came here for.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Room cards — horizontal scroll row */}
      </div>
      <motion.div
        ref={cards.ref}
        variants={staggerContainer}
        initial={cards.initial}
        animate={cards.animate}
        className="flex gap-3 w-full"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {featuredRooms.map((room) => {
          const isHovered = hoveredId === room.id;
          const isShrunk = hoveredId !== null && !isHovered;
          return (
            <motion.div
              key={room.id}
              variants={staggerItem}
              className="relative flex flex-col overflow-hidden rounded-lg cursor-pointer"
              style={{
                flex: isHovered ? "1.8 1 0" : isShrunk ? "0.7 1 0" : "1 1 0",
                minWidth: 0,
                transition: "flex 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "rgba(13,13,20,0.6)",
                border: `1px solid ${isHovered ? "rgba(212,168,67,0.35)" : "rgba(255,255,255,0.08)"}`,
              }}
              onMouseEnter={() => setHoveredId(room.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden flex-shrink-0" style={{ height: "480px" }}>
                <motion.div
                  className="w-full h-full"
                  animate={{ scale: isHovered ? 1.07 : 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${room.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </motion.div>

                {/* Amber overlay on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,6,2,0.85) 100%)" }}
                />
              </div>

              {/* Card content */}
              <div className="flex flex-col p-4">
                {/* Name + rating */}
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {room.name}
                  </p>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <Star size={12} fill={gold} style={{ color: gold }} />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>{room.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {room.location}
                </p>

                {/* Divider */}
                <div className="w-full h-px mb-3" style={{ background: "rgba(255,255,255,0.07)" }} />

                {/* Specs */}
                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>{room.beds}</span>
                  <span>·</span>
                  <span>{room.guests}</span>
                </div>

                {/* Tagline — only visible when expanded */}
                <motion.p
                  className="text-xs leading-relaxed mb-4 italic"
                  style={{ color: "rgba(200,185,150,0.55)", fontFamily: '"Cormorant Garamond", serif', fontSize: "0.9rem" }}
                  animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  &ldquo;{room.tagline}&rdquo;
                </motion.p>

                {/* Price + CTA */}
                <div className="flex items-end justify-between mt-auto">
                  <p
                    className="font-light leading-none"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: "1.5rem",
                      color: gold,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ${room.price}
                    <span className="text-xs ml-1" style={{ color: "rgba(200,185,150,0.4)" }}>/night</span>
                  </p>

                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.4, scale: isHovered ? 1 : 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/booking?room=${room.id}`} data-cursor="hover">
                      <motion.button
                        className="px-3 py-2 text-xs tracking-widest uppercase"
                        style={{
                          background: isHovered ? "rgba(212,168,67,0.2)" : "rgba(212,168,67,0.08)",
                          color: gold,
                          border: "1px solid rgba(212,168,67,0.3)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        Reserve
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="relative w-full px-6 md:px-12 lg:px-20">

        {/* View all CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/rooms" data-cursor="hover">
            <motion.button
              className="flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(240,240,245,0.6)",
                background: "transparent",
              }}
              whileHover={{
                borderColor: "rgba(212,168,67,0.3)",
                color: gold,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore All Rooms
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
