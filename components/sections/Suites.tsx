"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredRooms } from "@/data/rooms";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const accentMap = {
  gold: {
    border: "rgba(212,168,67,0.25)",
    glow: "rgba(212,168,67,0.07)",
    tag: "rgba(212,168,67,0.12)",
    tagText: "#d4a843",
    line: "linear-gradient(90deg, #8a600e, #d4a843)",
  },
  warm: {
    border: "rgba(210,140,80,0.25)",
    glow: "rgba(210,140,80,0.07)",
    tag: "rgba(210,140,80,0.12)",
    tagText: "#d28c50",
    line: "linear-gradient(90deg, #7a4a18, #d28c50)",
  },
  rose: {
    border: "rgba(220,100,120,0.25)",
    glow: "rgba(220,100,120,0.07)",
    tag: "rgba(220,100,120,0.12)",
    tagText: "#dc6478",
    line: "linear-gradient(90deg, #8a1a30, #dc6478)",
  },
};

export default function Suites() {
  const header = useScrollAnimationConfig(0.2);
  const cards = useScrollAnimationConfig(0.1);

  return (
    <section className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: "#050508" }}>
      {/* Ambient blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(124,58,237,0.05) 0%, transparent 60%)",
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

        {/* Room cards grid */}
        <motion.div
          ref={cards.ref}
          variants={staggerContainer}
          initial={cards.initial}
          animate={cards.animate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredRooms.map((room) => {
            const accent = accentMap[room.accent];
            return (
              <motion.div
                key={room.id}
                variants={staggerItem}
                className="group relative flex flex-col overflow-hidden"
                style={{
                  background: "rgba(13,13,20,0.6)",
                  border: `1px solid ${accent.border}`,
                  backdropFilter: "blur(20px)",
                }}
                whileHover={{ y: -8, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${accent.glow} 0%, transparent 70%)`,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "260px" }}>
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

                  {/* Image overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, transparent 40%, rgba(13,13,20,0.8) 100%)",
                    }}
                  />

                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs px-3 py-1.5 tracking-widest uppercase"
                      style={{
                        background: accent.tag,
                        color: accent.tagText,
                        border: `1px solid ${accent.border}`,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {room.type}
                    </span>
                  </div>

                  {/* Guests badge */}
                  <div
                    className="absolute bottom-4 right-4 text-xs px-3 py-1 tracking-widest"
                    style={{
                      background: "rgba(5,5,8,0.7)",
                      color: "rgba(240,240,245,0.4)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {room.guests}
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Top line */}
                  <div className="w-full h-px mb-5" style={{ background: `linear-gradient(90deg, ${accent.border}, transparent)` }} />

                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: accent.tagText, opacity: 0.7 }}>
                    {room.type}
                  </p>
                  <h3
                    className="font-light mb-1 leading-tight"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: "1.6rem",
                      color: "rgba(245,235,210,0.95)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {room.name}
                  </h3>
                  <p className="text-xs italic mb-3" style={{ color: accent.tagText, fontFamily: '"Cormorant Garamond", serif', fontSize: "0.95rem", opacity: 0.75 }}>
                    &ldquo;{room.tagline}&rdquo;
                  </p>
                  <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: "rgba(200,190,160,0.55)" }}>
                    {room.description.slice(0, 110)}…
                  </p>

                  {/* Specs row */}
                  <div className="flex items-center gap-4 mb-6 text-xs" style={{ color: "rgba(200,190,160,0.35)" }}>
                    <span>{room.beds}</span>
                    <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                    <span>{room.guests}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                        From
                      </p>
                      <p
                        className="font-light leading-none"
                        style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: "1.8rem",
                          color: accent.tagText,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        ${room.price.toLocaleString()}
                        <span className="text-xs ml-1" style={{ color: "rgba(200,185,150,0.35)" }}>
                          / night
                        </span>
                      </p>
                    </div>

                    <Link href="/booking" data-cursor="hover">
                      <motion.button
                        className="flex items-center gap-2 p-3"
                        style={{
                          border: `1px solid ${accent.border}`,
                          color: accent.tagText,
                          background: accent.tag,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

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
                borderColor: "rgba(0,229,255,0.3)",
                color: "#00e5ff",
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore All Rooms
              <ArrowUpRight size={14} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
