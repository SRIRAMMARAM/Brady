"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { featuredRooms } from "@/data/rooms";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

export default function Suites() {
  const header = useScrollAnimationConfig(0.2);
  const cards = useScrollAnimationConfig(0.1);

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

        {/* Room cards grid */}
        <motion.div
          ref={cards.ref}
          variants={staggerContainer}
          initial={cards.initial}
          animate={cards.animate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredRooms.map((room) => (
            <motion.div
              key={room.id}
              variants={staggerItem}
              className="group relative flex flex-col overflow-hidden rounded-lg"
              style={{
                background: "rgba(13,13,20,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "280px" }}>
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
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
              </div>

              {/* Card content */}
              <div className="flex flex-col p-5">
                {/* Location */}
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {room.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star size={14} fill={gold} style={{ color: gold }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{room.rating}</span>
                  </div>
                </div>

                {/* Location + distance */}
                <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {room.location}
                </p>

                {/* Divider */}
                <div className="w-full h-px mb-3" style={{ background: "rgba(255,255,255,0.08)" }} />

                {/* Specs */}
                <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span>{room.beds}</span>
                  <span>·</span>
                  <span>{room.guests}</span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                      From
                    </p>
                    <p
                      className="font-light leading-none"
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: "1.75rem",
                        color: gold,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ${room.price.toLocaleString()}
                      <span className="text-xs ml-1" style={{ color: "rgba(200,185,150,0.4)" }}>
                        / night
                      </span>
                    </p>
                  </div>

                  <Link href={`/booking?room=${room.id}`} data-cursor="hover">
                    <motion.button
                      className="px-5 py-2.5 text-xs tracking-widest uppercase"
                      style={{
                        background: "rgba(212,168,67,0.1)",
                        color: gold,
                        border: "1px solid rgba(212,168,67,0.3)",
                      }}
                      whileHover={{ background: "rgba(212,168,67,0.2)", scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      Reserve
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
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
