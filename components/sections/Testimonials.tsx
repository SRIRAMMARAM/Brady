"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const header = useScrollAnimationConfig(0.2);

  const paginate = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[active];

  return (
    <section
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#0d0d14" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(212,168,67,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 40%, rgba(124,58,237,0.05) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)" }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          ref={header.ref}
          variants={staggerContainer}
          initial={header.initial}
          animate={header.animate}
          className="mb-16 md:mb-24 text-center"
        >
          <motion.div variants={staggerItem} className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4a843)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.7)" }}>
              Guest Voices
            </span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #d4a843, transparent)" }} />
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
            Voices of<br />the Extraordinary
          </motion.h2>
        </motion.div>

        {/* Main testimonial display */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Quote card */}
              <div
                className="relative p-8 md:p-14 mb-10"
                style={{
                  background: "rgba(5,5,8,0.6)",
                  border: "1px solid rgba(212,168,67,0.12)",
                  backdropFilter: "blur(30px)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.3), transparent)" }}
                />

                {/* Large quote mark */}
                <div
                  className="absolute top-6 left-8 md:top-10 md:left-14 font-light leading-none pointer-events-none select-none"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "10rem",
                    color: "rgba(212,168,67,0.06)",
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={12} fill="#d4a843" style={{ color: "#d4a843" }} />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote
                  className="relative font-light leading-relaxed mb-8"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)",
                    color: "rgba(240,240,245,0.85)",
                    letterSpacing: "0.01em",
                  }}
                >
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                    style={{ border: "1px solid rgba(212,168,67,0.2)" }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url('${current.avatar}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-0.5" style={{ color: "#f0f0f5" }}>
                      {current.name}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(152,152,168,0.5)" }}>
                      {current.title} · {current.location}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "rgba(212,168,67,0.5)" }}>
                      {current.stayType}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className="transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === active
                      ? "linear-gradient(90deg, #7c3aed, #00e5ff)"
                      : "rgba(255,255,255,0.15)",
                  }}
                  data-cursor="hover"
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => paginate(-1)}
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(240,240,245,0.5)",
                  background: "transparent",
                }}
                whileHover={{ borderColor: "rgba(212,168,67,0.4)", color: "#d4a843", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                data-cursor="hover"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={() => paginate(1)}
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(240,240,245,0.5)",
                  background: "transparent",
                }}
                whileHover={{ borderColor: "rgba(212,168,67,0.4)", color: "#d4a843", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                data-cursor="hover"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-8 text-center">
          <span className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
