"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { CONTACT_INFO } from "@/constants";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    background: "rgba(13,13,20,0.8)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "rgba(240,240,245,0.85)",
  };

  const contacts = [
    { icon: <Phone size={18} />, label: "Telephone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, accent: "rgba(0,229,255,0.5)" },
    { icon: <Mail size={18} />, label: "Concierge", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, accent: "rgba(212,168,67,0.5)" },
    { icon: <MapPin size={18} />, label: "Location", value: CONTACT_INFO.address, href: "#", accent: "rgba(124,58,237,0.5)" },
  ];

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)" }} />

      <section className="relative pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <div className="relative w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #7c3aed, #00e5ff)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(0,229,255,0.6)" }}>Get in Touch</span>
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
              Speak With<br />Our Concierge
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contacts.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 p-6 group"
                style={{ background: "rgba(13,13,20,0.6)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", display: "flex" }}
                data-cursor="hover"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.07)", color: c.accent }}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>{c.label}</p>
                  <p className="text-sm" style={{ color: "rgba(200,200,212,0.7)" }}>{c.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6"
              style={{ background: "rgba(13,13,20,0.6)", border: "1px solid rgba(212,168,67,0.12)", backdropFilter: "blur(20px)" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(212,168,67,0.5)" }}>Concierge Hours</p>
              <p className="text-sm" style={{ color: "rgba(200,200,212,0.6)" }}>24 hours · 7 days · 365 days</p>
              <p className="text-xs mt-2" style={{ color: "rgba(152,152,168,0.3)" }}>Average response time: &lt; 4 minutes</p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center p-8" style={{ background: "rgba(13,13,20,0.7)", border: "1px solid rgba(0,229,255,0.12)", backdropFilter: "blur(40px)" }}>
                <CheckCircle size={48} className="mb-6" style={{ color: "#00e5ff" }} />
                <h2 className="font-light mb-3" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.5rem", color: "#f0f0f5" }}>Message Received</h2>
                <p className="text-sm" style={{ color: "rgba(152,152,168,0.6)" }}>Our concierge team will respond within 4 minutes.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 space-y-5"
                style={{ background: "rgba(13,13,20,0.7)", border: "1px solid rgba(124,58,237,0.12)", backdropFilter: "blur(40px)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[{ label: "Your Name", key: "name", type: "text" }, { label: "Email Address", key: "email", type: "email" }].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block mb-2 text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(0,229,255,0.3)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block mb-2 text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,229,255,0.3)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none resize-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,229,255,0.3)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #00e5ff)", color: "#f0f0f5", border: "none" }}
                  whileHover={{ opacity: 0.9, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  data-cursor="hover"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
