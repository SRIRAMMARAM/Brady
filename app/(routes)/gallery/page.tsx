"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80", label: "Obsidian Suite", cat: "Suites", span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80", label: "Aether Residence", cat: "Suites", span: "col-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80", label: "Chromatic Loft", cat: "Suites", span: "col-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", label: "NOCT Restaurant", cat: "Dining", span: "col-span-1 md:col-span-2" },
  { id: 5, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80", label: "Aether Spa", cat: "Wellness", span: "col-span-1" },
  { id: 6, src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80", label: "Infinity Pool", cat: "Amenities", span: "col-span-1" },
  { id: 7, src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&q=80", label: "Aerial Flight", cat: "Experiences", span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 8, src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80", label: "Nebula Suite", cat: "Suites", span: "col-span-1" },
  { id: 9, src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80", label: "VANTA Bar", cat: "Dining", span: "col-span-1" },
  { id: 10, src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=80", label: "Observatory Night", cat: "Experiences", span: "col-span-1 md:col-span-2" },
];

const cats = ["All", "Suites", "Dining", "Wellness", "Amenities", "Experiences"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<typeof galleryImages[0] | null>(null);

  const filtered = activeFilter === "All" ? galleryImages : galleryImages.filter((img) => img.cat === activeFilter);

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      {/* Lightbox */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(5,5,8,0.95)", backdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 p-2"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,240,245,0.6)" }}
            onClick={() => setLightbox(null)}
            data-cursor="hover"
          >
            <X size={20} />
          </button>
          <motion.div
            className="relative max-w-4xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full"
              style={{ height: "60vh", backgroundImage: `url('${lightbox.src}')`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(255,255,255,0.06)" }}
            />
            <div className="mt-4 flex items-center justify-between">
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.4rem", color: "#f0f0f5", fontWeight: 300 }}>
                {lightbox.label}
              </p>
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(0,229,255,0.5)" }}>
                {lightbox.cat}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="relative w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #7c3aed, #00e5ff)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(0,229,255,0.6)" }}>Visual Archive</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-light leading-none mb-10"
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
              The Gallery
            </motion.h1>

            {/* Filters */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
              {cats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="text-xs px-5 py-2 tracking-widest uppercase transition-all duration-300"
                  style={{
                    border: activeFilter === cat ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    color: activeFilter === cat ? "#00e5ff" : "rgba(152,152,168,0.4)",
                    background: activeFilter === cat ? "rgba(0,229,255,0.06)" : "transparent",
                  }}
                  data-cursor="hover"
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="w-full">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]"
            layout
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                className={`relative overflow-hidden group cursor-pointer ${img.span}`}
                onClick={() => setLightbox(img)}
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
                data-cursor="hover"
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-full h-full"
                    style={{ backgroundImage: `url('${img.src}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{ background: "linear-gradient(180deg, transparent 40%, rgba(5,5,8,0.9) 100%)" }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(0,229,255,0.6)" }}>
                    {img.cat}
                  </p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.1rem", color: "#f0f0f5", fontWeight: 300 }}>
                    {img.label}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
