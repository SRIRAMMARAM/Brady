"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { rooms } from "@/data/rooms";
import Footer from "@/components/sections/Footer";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const accentMap = {
  gold: { border: "rgba(212,168,67,0.25)", tag: "rgba(212,168,67,0.12)", tagText: "#d4a843" },
  warm: { border: "rgba(210,140,80,0.25)", tag: "rgba(210,140,80,0.12)", tagText: "#d28c50" },
  rose: { border: "rgba(220,100,120,0.25)", tag: "rgba(220,100,120,0.12)", tagText: "#dc6478" },
};

export default function RoomsPage() {
  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      {/* Page hero */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(212,168,67,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(180,110,50,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group"
            style={{ color: "rgba(152,152,168,0.4)" }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>
                Five Rooms. Five Stories.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-light leading-none mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(3rem, 8vw, 8rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Find the Room<br />That&apos;s Yours
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "rgba(200,185,150,0.55)" }}
            >
              Not every stay is the same. Browse our five rooms — each named
              for the experience it was built around.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Rooms grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {rooms.map((room) => {
              const accent = accentMap[room.accent];
              return (
                <motion.div
                  key={room.id}
                  id={room.id}
                  variants={staggerItem}
                  className="group relative flex flex-col overflow-hidden"
                  style={{
                    background: "rgba(13,13,20,0.6)",
                    border: `1px solid ${accent.border}`,
                    backdropFilter: "blur(20px)",
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: "280px" }}>
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
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 40%, rgba(13,13,20,0.9) 100%)" }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-xs px-3 py-1.5 tracking-widest uppercase"
                        style={{ background: accent.tag, color: accent.tagText, border: `1px solid ${accent.border}`, backdropFilter: "blur(10px)" }}
                      >
                        {room.type}
                      </span>
                    </div>
                    <div
                      className="absolute bottom-4 right-4 text-xs px-3 py-1"
                      style={{ background: "rgba(5,5,8,0.7)", color: "rgba(240,240,245,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}
                    >
                      {room.guests}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="w-full h-px mb-5" style={{ background: `linear-gradient(90deg, ${accent.border}, transparent)` }} />
                    <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: accent.tagText, opacity: 0.7 }}>
                      {room.type}
                    </p>
                    <h2
                      className="font-light mb-1 leading-tight"
                      style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.6rem", color: "rgba(245,235,210,0.95)", letterSpacing: "-0.01em" }}
                    >
                      {room.name}
                    </h2>
                    <p className="text-xs italic mb-3" style={{ color: accent.tagText, fontFamily: '"Cormorant Garamond", serif', fontSize: "0.95rem", opacity: 0.7 }}>
                      &ldquo;{room.tagline}&rdquo;
                    </p>
                    <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "rgba(200,190,160,0.55)" }}>
                      {room.story}
                    </p>

                    {/* Amenities */}
                    <div className="mb-5">
                      <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>
                        Includes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="text-xs px-2 py-1"
                            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(200,200,212,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
                          >
                            {a}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-xs px-2 py-1" style={{ color: "rgba(152,152,168,0.3)" }}>
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="flex items-center gap-4 mb-6 text-xs" style={{ color: "rgba(200,190,160,0.35)" }}>
                      <span>{room.beds}</span>
                      <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                      <span>{room.guests}</span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>From</p>
                        <p className="font-light leading-none" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2rem", color: accent.tagText, letterSpacing: "-0.02em" }}>
                          ${room.price.toLocaleString()}
                          <span className="text-xs ml-1" style={{ color: "rgba(200,185,150,0.35)" }}>/night</span>
                        </p>
                      </div>
                      <Link href="/booking" data-cursor="hover">
                        <motion.button
                          className="flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase"
                          style={{ border: `1px solid ${accent.border}`, color: accent.tagText, background: accent.tag }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          Reserve
                          <ArrowUpRight size={12} />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
