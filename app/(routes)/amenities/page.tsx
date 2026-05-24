"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Star, ArrowUpRight } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const venues = [
  {
    id: "noct",
    name: "NOCT",
    subtitle: "Tasting Omakase",
    description:
      "Three Michelin stars. The most exclusive dining experience in the Northern Hemisphere. Chef Ishaan Rao's 18-course omakase is a meditation on fire, fermentation, and the sublime. One table. One seating. Six nights per week.",
    stars: 3,
    capacity: "8 guests maximum",
    hours: "20:00 · Single seating",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    tag: "Michelin ★★★",
    accent: { border: "rgba(212,168,67,0.25)", tag: "rgba(212,168,67,0.12)", text: "#d4a843" },
  },
  {
    id: "vanta",
    name: "VANTA",
    subtitle: "The Dark Bar",
    description:
      "An underground cocktail sanctuary bathed in absolute black. Award-winning mixologists craft molecular cocktails against a backdrop of low-frequency sound art. Reservation essential.",
    stars: 0,
    capacity: "24 guests",
    hours: "21:00 – 04:00",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80",
    tag: "Bar & Lounge",
    accent: { border: "rgba(124,58,237,0.25)", tag: "rgba(124,58,237,0.12)", text: "#a78bfa" },
  },
  {
    id: "zenith",
    name: "ZENITH",
    subtitle: "Sky Brasserie",
    description:
      "Floor 82. Open-air terrace with unobstructed panoramas. Contemporary cuisine with seasonal ingredients flown in weekly from seven countries. The most spectacular table in the city.",
    stars: 1,
    capacity: "60 covers",
    hours: "07:00 – 23:00",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80",
    tag: "Michelin ★",
    accent: { border: "rgba(0,229,255,0.2)", tag: "rgba(0,229,255,0.1)", text: "#00e5ff" },
  },
];

export default function DiningPage() {
  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,67,0.06) 0%, transparent 60%)" }}
        />
        <div className="relative w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #d4a843, #f5d98a)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.7)" }}>
                Culinary Arts
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-light leading-none mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(3rem, 8vw, 8rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f0f0f5 0%, #9898a8 40%, #f0f0f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dining<br />as Theatre
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Venues */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="w-full space-y-8">
          {venues.map((venue, i) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group overflow-hidden"
              style={{ background: "rgba(13,13,20,0.6)", border: `1px solid ${venue.accent.border}`, backdropFilter: "blur(20px)" }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:col-start-2" : ""}`} style={{ height: "360px" }}>
                  <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}>
                    <div
                      className="w-full h-full"
                      style={{ backgroundImage: `url('${venue.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                  </motion.div>
                  <div className="absolute inset-0" style={{ background: "rgba(5,5,8,0.2)" }} />
                  <div className="absolute top-5 left-5">
                    <span
                      className="text-xs px-3 py-1.5 tracking-widest uppercase"
                      style={{ background: venue.accent.tag, border: `1px solid ${venue.accent.border}`, color: venue.accent.text, backdropFilter: "blur(10px)" }}
                    >
                      {venue.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center p-8 md:p-12 ${i % 2 === 1 ? "md:col-start-1" : ""}`}>
                  {venue.stars > 0 && (
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: venue.stars }).map((_, j) => (
                        <Star key={j} size={12} fill="#d4a843" style={{ color: "#d4a843" }} />
                      ))}
                    </div>
                  )}
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: venue.accent.text, opacity: 0.6 }}>
                    {venue.subtitle}
                  </p>
                  <h2
                    className="font-light mb-4 leading-none"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "3rem", color: "#f0f0f5", letterSpacing: "-0.02em" }}
                  >
                    {venue.name}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(152,152,168,0.6)" }}>
                    {venue.description}
                  </p>

                  <div className="flex items-center gap-6 mb-7 text-xs" style={{ color: "rgba(200,200,212,0.35)" }}>
                    <span>{venue.capacity}</span>
                    <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                    <span>{venue.hours}</span>
                  </div>

                  <Link href="/booking" data-cursor="hover">
                    <motion.button
                      className="inline-flex items-center gap-2 px-7 py-3 text-xs tracking-[0.2em] uppercase"
                      style={{ border: `1px solid ${venue.accent.border}`, color: venue.accent.text, background: venue.accent.tag }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Reserve a Table
                      <ArrowUpRight size={12} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
