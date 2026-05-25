"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const amenityItems = [
  {
    id: "custom-coffee",
    name: "Custom Coffee",
    subtitle: "Food & Beverage",
    description: "In-house specialty coffee service for guests — crafted to order, every morning. Start your day right with a freshly brewed cup tailored to your taste.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    tag: "Every Morning",
  },
  {
    id: "sports-simulator",
    name: "Sports Simulator Rooms",
    subtitle: "Recreation & Wellness",
    description: "Interactive sports simulation experience. Tee off, swing, and play across virtual courses and arenas — rain or shine, any time of day.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    tag: "Open Daily",
  },
  {
    id: "spa",
    name: "Spa & Heart-Shaped Hot Tub",
    subtitle: "Recreation & Wellness",
    description: "A private spa featuring a heart-shaped hot tub — guests fill their own water for an intimate, made-just-for-two ritual. Perfect for romantic getaways.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
    tag: "Private Access",
  },
  {
    id: "sauna",
    name: "Dry & Wet Sauna",
    subtitle: "Recreation & Wellness",
    description: "Two saunas, two rituals — choose dry heat for clarity, or wet steam for deep relaxation. A true cabin wellness experience.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    tag: "Wellness",
  },
  {
    id: "indoor-gym",
    name: "Indoor Gym",
    subtitle: "Recreation & Wellness",
    description: "A fully equipped fitness facility, open to guests around the clock. Keep up with your routine no matter the hour.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    tag: "24 / 7",
  },
  {
    id: "interactive-tv",
    name: "Interactive TV",
    subtitle: "Interactive Technology",
    description: "Smart, interactive TV systems in every room — stream, browse, and personalize your stay from the comfort of your cabin bed.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80",
    tag: "In Every Room",
  },
  {
    id: "greenhouse",
    name: "Greenhouse & Garden Walkthrough",
    subtitle: "Outdoor & Nature",
    description: "A nature garden experience accessible to guests — quiet paths, fresh greens, and a moment of stillness amid the Texas Hill Country.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    tag: "Outdoor",
  },
];

const gold = "rgba(212,168,67,0.9)";
const border = "rgba(212,168,67,0.2)";

export default function AmenitiesPage() {
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
                Facilities & Comfort
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
              Amenities
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="max-w-md text-sm leading-relaxed"
              style={{ color: "rgba(200,185,150,0.55)" }}
            >
              Coffee in the morning, sauna at dusk, a quiet walk through the greenhouse — everything thoughtfully provided so your stay feels effortless.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Amenity Cards */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="w-full space-y-8">
          {amenityItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="group overflow-hidden"
              style={{ background: "rgba(13,13,8,0.6)", border: `1px solid ${border}`, backdropFilter: "blur(20px)" }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:col-start-2" : ""}`} style={{ height: "320px" }}>
                  <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}>
                    <div
                      className="w-full h-full"
                      style={{ backgroundImage: `url('${item.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                  </motion.div>
                  <div className="absolute inset-0" style={{ background: "rgba(5,5,8,0.25)" }} />
                  <div className="absolute top-5 left-5">
                    <span
                      className="text-xs px-3 py-1.5 tracking-widest uppercase"
                      style={{ background: "rgba(212,168,67,0.12)", border: `1px solid ${border}`, color: gold, backdropFilter: "blur(10px)" }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center p-8 md:p-12 ${i % 2 === 1 ? "md:col-start-1" : ""}`}>
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,168,67,0.55)" }}>
                    {item.subtitle}
                  </p>
                  <h2
                    className="font-light mb-4 leading-none"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "#f0ead8", letterSpacing: "-0.02em" }}
                  >
                    {item.name}
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(200,185,150,0.55)" }}>
                    {item.description}
                  </p>

                  <Link href="/booking" data-cursor="hover">
                    <motion.button
                      className="inline-flex items-center gap-2 px-7 py-3 text-xs tracking-[0.2em] uppercase"
                      style={{ border: `1px solid ${border}`, color: gold, background: "rgba(212,168,67,0.08)" }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Book Your Stay
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
