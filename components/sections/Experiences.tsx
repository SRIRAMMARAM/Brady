"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Clock, DollarSign } from "lucide-react";
import { experiences } from "@/data/amenities";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { useScrollAnimationConfig } from "@/hooks/useScrollAnimation";

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseX, [-100, 100], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      variants={staggerItem}
      className="group relative overflow-hidden"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative overflow-hidden"
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "380px" }}>
          <motion.div
            className="w-full h-full"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('${exp.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.4) 50%, rgba(5,5,8,0.95) 100%)",
            }}
          />

          {/* Tag */}
          <div className="absolute top-5 left-5">
            <span
              className="text-xs px-3 py-1.5 tracking-widest uppercase"
              style={{
                background: "rgba(212,168,67,0.15)",
                border: "1px solid rgba(212,168,67,0.3)",
                color: "#d4a843",
                backdropFilter: "blur(10px)",
              }}
            >
              {exp.tag}
            </span>
          </div>

          {/* Reveal overlay on hover */}
          <motion.div
            className="absolute inset-0 flex items-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="w-full p-4"
              style={{
                background: "rgba(5,5,8,0.7)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "rgba(200,200,212,0.5)" }}>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign size={12} />
                  <span>${exp.price.toLocaleString()} per person</span>
                </div>
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] uppercase"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,229,255,0.15))",
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "#f0f0f5",
                }}
                data-cursor="hover"
              >
                Book This Experience
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Card info */}
        <div
          className="p-5"
          style={{
            background: "rgba(13,13,20,0.8)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderTop: "none",
          }}
        >
          <h3
            className="font-light mb-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1.4rem",
              color: "#f0f0f5",
              letterSpacing: "-0.01em",
            }}
          >
            {exp.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(152,152,168,0.55)" }}>
            {exp.description.slice(0, 90)}…
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experiences() {
  const header = useScrollAnimationConfig(0.2);
  const cards = useScrollAnimationConfig(0.1);

  return (
    <section className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: "#050508" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
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
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #7c3aed)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(0,229,255,0.6)" }}>
              Signature Experiences
            </span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #00e5ff, transparent)" }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-light leading-none mx-auto"
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
            Curated Moments<br />Beyond Compare
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={cards.ref}
          variants={staggerContainer}
          initial={cards.initial}
          animate={cards.animate}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
