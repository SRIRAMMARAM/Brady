"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/amenities";
import Footer from "@/components/sections/Footer";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

export default function ExperiencePage() {
  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.95) 100%)" }} />
        <div className="relative w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #7c3aed, #00e5ff)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(0,229,255,0.6)" }}>Signature Experiences</span>
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
              Curated for<br />the Rare
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Experiences grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-40 pt-20">
        <div className="w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={staggerItem}
                className="group overflow-hidden"
                style={{ background: "rgba(13,13,20,0.6)", border: "1px solid rgba(212,168,67,0.15)", backdropFilter: "blur(20px)" }}
                whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              >
                <div className="relative overflow-hidden" style={{ height: "340px" }}>
                  <motion.div className="w-full h-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }}>
                    <div
                      className="w-full h-full"
                      style={{ backgroundImage: `url('${exp.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                  </motion.div>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(13,13,20,0.9) 100%)" }} />
                  <div className="absolute top-5 left-5">
                    <span className="text-xs px-3 py-1.5 tracking-widest uppercase" style={{ background: "rgba(212,168,67,0.15)", border: "1px solid rgba(212,168,67,0.3)", color: "#d4a843", backdropFilter: "blur(10px)" }}>
                      {exp.tag}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: "rgba(152,152,168,0.4)" }}>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      <span>{exp.duration}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                    <span>${exp.price.toLocaleString()} per person</span>
                  </div>

                  <h2
                    className="font-light mb-3 leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2rem", color: "#f0f0f5", letterSpacing: "-0.02em" }}
                  >
                    {exp.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(152,152,168,0.6)" }}>
                    {exp.description}
                  </p>

                  <Link href="/booking" data-cursor="hover">
                    <motion.button
                      className="flex items-center gap-2 px-7 py-3 text-xs tracking-[0.2em] uppercase"
                      style={{ border: "1px solid rgba(212,168,67,0.3)", color: "#d4a843", background: "rgba(212,168,67,0.06)" }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Reserve Experience
                      <ArrowUpRight size={12} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
