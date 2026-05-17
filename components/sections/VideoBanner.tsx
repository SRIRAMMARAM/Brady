"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { useState } from "react";

export default function VideoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "85vh", minHeight: "500px" }}>
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y, scale }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Multi-layer overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,8,0.6) 0%, rgba(5,5,8,0.3) 40%, rgba(5,5,8,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,8,0.5) 100%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-6">
        {/* Play button */}
        <motion.button
          className="relative mb-10"
          onClick={() => setPlaying(!playing)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          data-cursor="hover"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(0,229,255,0.3)" }}
            animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(124,58,237,0.3)" }}
            animate={{ scale: [1, 1.3, 1.6], opacity: [0.4, 0.15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          />

          {/* Main circle */}
          <div
            className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full"
            style={{
              background: "rgba(5,5,8,0.6)",
              border: "1px solid rgba(0,229,255,0.25)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Play
              size={22}
              fill="rgba(0,229,255,0.9)"
              className="ml-1"
              style={{ color: "rgba(0,229,255,0.9)" }}
            />
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-5"
            style={{ color: "rgba(0,229,255,0.6)" }}
          >
            Cinematic Experience
          </p>
          <h2
            className="font-light leading-none mb-6"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "clamp(2rem, 6vw, 6rem)",
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #f0f0f5 0%, #9898a8 50%, #f0f0f5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Beyond Every<br />Horizon
          </h2>
          <p
            className="text-sm max-w-md mx-auto leading-relaxed"
            style={{ color: "rgba(200,200,212,0.5)" }}
          >
            88 floors. One perspective. A vantage point that reshapes how you
            see the world — and yourself.
          </p>
        </motion.div>
      </div>

      {/* Side labels */}
      <motion.div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div
          className="w-px h-16"
          style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)" }}
        />
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{
            writingMode: "vertical-rl",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Observatory Ridge · CA
        </p>
        <div
          className="w-px h-16"
          style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
