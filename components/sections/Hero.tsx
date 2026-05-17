"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, ChevronRight } from "lucide-react";
import { heroTextReveal, fadeIn, staggerContainer } from "@/animations/variants";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "700px" }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,6,4,0.2) 0%, rgba(8,6,4,0.45) 40%, rgba(8,6,4,0.88) 85%, rgba(8,6,4,1) 100%)",
          }}
        />
        {/* Side vignettes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,6,4,0.45) 0%, transparent 30%, transparent 70%, rgba(8,6,4,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* Ambient orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.09) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(160,90,30,0.07) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative flex flex-col justify-end h-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.75)" }}>
              Brady Casa Inn &nbsp;·&nbsp; Log Cabin Luxury
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              variants={heroTextReveal}
              className="font-light leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #fdf4d3 0%, #d4a843 35%, #f5d98a 65%, #c8912a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Brady Casa Inn
            </motion.h1>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden mb-10">
            <motion.p
              variants={heroTextReveal}
              className="font-light italic"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
                color: "rgba(245,228,175,0.65)",
                letterSpacing: "0.04em",
              }}
            >
              Log Cabin Luxury, Lofted in Love
            </motion.p>
          </div>

          {/* Description + CTA row */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-8"
          >
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(220,200,160,0.6)", letterSpacing: "0.02em" }}
            >
              Five cabin rooms. Each named for the experience inside it.
              Tell us what kind of stay you&apos;re looking for —
              we&apos;ll find your perfect match.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/booking" data-cursor="hover">
                <motion.button
                  className="relative px-8 py-4 text-xs tracking-[0.2em] uppercase overflow-hidden"
                  style={{
                    background: "rgba(212,168,67,0.18)",
                    border: "1px solid rgba(212,168,67,0.5)",
                    color: "rgba(253,244,211,0.92)",
                    backdropFilter: "blur(12px)",
                  }}
                  whileHover={{ scale: 1.03, background: "rgba(212,168,67,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative">Find Your Room</span>
                </motion.button>
              </Link>

              <Link
                href="/rooms"
                className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase group"
                style={{ color: "rgba(212,168,67,0.6)" }}
                data-cursor="hover"
              >
                <span className="transition-colors duration-300 group-hover:text-amber-300">
                  See All Rooms
                </span>
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-8 right-6 md:right-12 lg:right-20 flex flex-col items-end gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full" style={{ background: "#d4a843" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,168,67,0.35)" }}>
              Scroll to explore
            </span>
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <ArrowDown size={14} style={{ color: "rgba(212,168,67,0.45)" }} />
          </motion.div>
        </motion.div>

        {/* Live status indicator */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#d4a843" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs tracking-widest" style={{ color: "rgba(212,168,67,0.35)" }}>
            5 rooms available tonight
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
