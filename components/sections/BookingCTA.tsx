"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, MapPin } from "lucide-react";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";

export default function BookingCTA() {
  const { ref, animate, initial } = useScrollAnimationConfig(0.15);

  return (
    <section
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#080604" }}
    >
      {/* Large ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.06) 0%, rgba(160,90,30,0.04) 30%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Decorative wood-grain lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,168,67,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          className="relative"
        >
          {/* Main container */}
          <div
            className="relative p-10 md:p-16 lg:p-20 overflow-hidden"
            style={{
              background: "rgba(15,11,6,0.75)",
              border: "1px solid rgba(212,168,67,0.18)",
              backdropFilter: "blur(40px)",
            }}
          >
            {/* Corner accents */}
            {[
              "top-0 left-0",
              "top-0 right-0 rotate-90",
              "bottom-0 right-0 rotate-180",
              "bottom-0 left-0 -rotate-90",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-8 h-8 pointer-events-none`}
                style={{
                  borderTop: "1px solid rgba(212,168,67,0.4)",
                  borderLeft: "1px solid rgba(212,168,67,0.4)",
                }}
              />
            ))}

            {/* Ambient inside glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center top, rgba(212,168,67,0.08) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left — copy */}
              <div>
                <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
                  <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.65)" }}>
                    Reserve Your Cabin
                  </span>
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="font-light leading-none mb-6"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "clamp(2.5rem, 5vw, 5rem)",
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #fdf4d3 0%, #d4a843 40%, #f5d98a 75%, #c8912a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Your Brady<br />Story Starts<br />Right Here
                </motion.h2>

                <motion.p
                  variants={staggerItem}
                  className="text-sm leading-relaxed mb-8 max-w-sm"
                  style={{ color: "rgba(220,200,160,0.55)" }}
                >
                  Our team is available every day. Every reservation is handled
                  personally — no bots, no queues. Just warm, unhurried service
                  from the moment you reach out.
                </motion.p>

                <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking" data-cursor="hover">
                    <motion.button
                      className="flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase"
                      style={{
                        background: "rgba(212,168,67,0.18)",
                        border: "1px solid rgba(212,168,67,0.5)",
                        color: "rgba(253,244,211,0.92)",
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{ scale: 1.03, background: "rgba(212,168,67,0.3)", transition: { duration: 0.25 } }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Find Your Room
                      <ArrowUpRight size={14} />
                    </motion.button>
                  </Link>

                  <Link href="/contact" data-cursor="hover">
                    <motion.button
                      className="flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase"
                      style={{
                        border: "1px solid rgba(212,168,67,0.25)",
                        color: "rgba(212,168,67,0.8)",
                        background: "transparent",
                      }}
                      whileHover={{
                        borderColor: "rgba(212,168,67,0.5)",
                        color: "#d4a843",
                        scale: 1.03,
                        transition: { duration: 0.25 },
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Contact Concierge
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Right — quick booking form */}
              <motion.div variants={fadeUp}>
                <div
                  className="p-7"
                  style={{
                    background: "rgba(5,5,8,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "rgba(212,168,67,0.55)" }}>
                    Quick Availability Check
                  </p>

                  <div className="space-y-4">
                    {/* Check-in */}
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Check-in
                      </label>
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: "rgba(13,13,20,0.8)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Calendar size={14} style={{ color: "rgba(212,168,67,0.5)" }} />
                        <input
                          type="date"
                          className="w-full bg-transparent text-sm outline-none"
                          style={{ color: "rgba(245,235,200,0.7)", colorScheme: "dark" }}
                        />
                      </div>
                    </div>

                    {/* Check-out */}
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Check-out
                      </label>
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: "rgba(10,7,3,0.8)",
                          border: "1px solid rgba(212,168,67,0.12)",
                        }}
                      >
                        <Calendar size={14} style={{ color: "rgba(212,168,67,0.5)" }} />
                        <input
                          type="date"
                          className="w-full bg-transparent text-sm outline-none"
                          style={{ color: "rgba(240,240,245,0.7)", colorScheme: "dark" }}
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Guests
                      </label>
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: "rgba(13,13,20,0.8)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Users size={14} style={{ color: "rgba(212,168,67,0.5)" }} />
                        <select
                          className="w-full bg-transparent text-sm outline-none appearance-none"
                          style={{ color: "rgba(240,240,245,0.7)", colorScheme: "dark" }}
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n} style={{ background: "#0d0d14" }}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Suite preference */}
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Suite Preference
                      </label>
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: "rgba(13,13,20,0.8)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <MapPin size={14} style={{ color: "rgba(212,168,67,0.5)" }} />
                        <select
                          className="w-full bg-transparent text-sm outline-none appearance-none"
                          style={{ color: "rgba(245,235,200,0.7)", colorScheme: "dark" }}
                        >
                          <option style={{ background: "#100c06" }}>Any Room</option>
                          <option style={{ background: "#100c06" }}>The Fireside Room</option>
                          <option style={{ background: "#100c06" }}>The Timber King</option>
                          <option style={{ background: "#100c06" }}>The Family Lodge</option>
                          <option style={{ background: "#100c06" }}>The Honeymoon Cabin</option>
                          <option style={{ background: "#100c06" }}>The Brady Loft</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      className="w-full py-4 text-xs tracking-[0.25em] uppercase mt-2"
                      style={{
                        background: "linear-gradient(135deg, #c8912a, #d4a843)",
                        color: "#0d0900",
                        border: "none",
                        fontWeight: 500,
                        letterSpacing: "0.25em",
                      }}
                      whileHover={{ opacity: 0.88, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                      data-cursor="hover"
                    >
                      Check Availability
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
