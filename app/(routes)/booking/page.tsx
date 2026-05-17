"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Calendar, CheckCircle,
  Heart, Wind, Flame, Users2, Moon,
} from "lucide-react";
import Footer from "@/components/sections/Footer";
import { rooms, intentMap, type StayIntent } from "@/data/rooms";

// ─── accent palette ───────────────────────────────────────────
const accentPalette = {
  gold: { border: "rgba(212,168,67,0.35)", glow: "rgba(212,168,67,0.12)", text: "#d4a843", bg: "rgba(212,168,67,0.08)" },
  warm: { border: "rgba(210,140,80,0.35)", glow: "rgba(210,140,80,0.12)", text: "#d28c50", bg: "rgba(210,140,80,0.08)" },
  rose: { border: "rgba(220,100,120,0.35)", glow: "rgba(220,100,120,0.12)", text: "#dc6478", bg: "rgba(220,100,120,0.08)" },
};

// ─── intent options ───────────────────────────────────────────
const intents: { id: StayIntent; label: string; sublabel: string; icon: React.ReactNode }[] = [
  { id: "family-comfort",    label: "Family Comfort",       sublabel: "Warm, spacious, made for everyone",   icon: <Users2 size={28} /> },
  { id: "quiet-getaway",     label: "Quiet Getaway",        sublabel: "Just peace, a book, and room to think", icon: <Wind size={28} /> },
  { id: "romantic-escape",   label: "Romantic Escape",      sublabel: "Two people, one perfect night",        icon: <Heart size={28} /> },
  { id: "spacious-group",    label: "Spacious Group Stay",  sublabel: "Everyone together, nobody on top of each other", icon: <Flame size={28} /> },
  { id: "simple-overnight",  label: "Simple Overnight Stop",sublabel: "Clean, comfortable, no fuss",          icon: <Moon size={28} /> },
];

// ─── step transition ──────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
const slide = (dir: number) => ({
  initial:  { opacity: 0, x: dir * 60 },
  animate:  { opacity: 1, x: 0 },
  exit:     { opacity: 0, x: dir * -60 },
  transition: { duration: 0.5, ease: EASE },
});

// ─── night counter ────────────────────────────────────────────
function nightCount(ci: string, co: string) {
  if (!ci || !co) return 0;
  const d = (new Date(co).getTime() - new Date(ci).getTime()) / 86_400_000;
  return d > 0 ? d : 0;
}

// ─── field style ─────────────────────────────────────────────
const fieldBase = {
  background: "rgba(10,10,14,0.7)",
  border: "1px solid rgba(212,168,67,0.15)",
  color: "rgba(240,235,220,0.85)",
  colorScheme: "dark" as const,
};

export default function BookingPage() {
  const [step, setStep]       = useState(1);
  const [dir,  setDir]        = useState(1);
  const [checkin,  setCheckin]  = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests,   setGuests]   = useState(2);
  const [intent,   setIntent]   = useState<StayIntent | null>(null);
  const [email,    setEmail]    = useState("");
  const [name,     setName]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const recommended = intent ? rooms.find((r) => r.id === intentMap[intent]) : null;
  const nights = nightCount(checkin, checkout);

  function go(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
  }

  const gold = "rgba(212,168,67,0.9)";

  return (
    <div style={{ backgroundColor: "#080806", minHeight: "100vh" }}>
      {/* warm ambient bg */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 30% 30%, rgba(212,168,67,0.07) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(180,100,50,0.05) 0%, transparent 50%)",
      }} />

      {/* ── full-screen split layout ───────────────────────── */}
      <div className="relative z-10 flex min-h-screen">

        {/* ── LEFT: wizard panel ─────────────────────────── */}
        <div className="flex flex-col w-full lg:w-[58%] xl:w-[55%] px-8 md:px-16 xl:px-24 pt-28 pb-16">

          {/* back + progress */}
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(200,190,160,0.35)" }}>
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>

            {!submitted && (
              <div className="flex items-center gap-3 mt-8">
                {[1,2,3,4].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <motion.div
                      className="h-px"
                      style={{ background: s <= step ? gold : "rgba(255,255,255,0.1)" }}
                      animate={{ width: s === step ? 56 : 28 }}
                      initial={{ width: s === step ? 56 : 28 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                      style={{
                        background: s < step ? gold : s === step ? "rgba(212,168,67,0.15)" : "transparent",
                        border: s <= step ? `1px solid ${gold}` : "1px solid rgba(255,255,255,0.1)",
                        color: s <= step ? (s < step ? "#080806" : gold) : "rgba(255,255,255,0.2)",
                        fontWeight: s < step ? 700 : 400,
                      }}
                      animate={{ scale: s === step ? 1.15 : 1 }}
                    >
                      {s < step ? "✓" : s}
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── wizard steps ─────────────────────────────── */}
          <div className="flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          {/* ──────────────── STEP 1 — DATES ──────────────── */}
          {step === 1 && !submitted && (
            <motion.div key="step1" {...slide(dir)}>
              <h1 className="font-light mb-3 leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem,4.5vw,5.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}>
                When does your<br />story begin?
              </h1>
              <p className="text-base mb-12" style={{ color: "rgba(200,185,150,0.5)" }}>Pick your dates and we&apos;ll take care of the rest.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {[
                  { label: "Check-in",  val: checkin,  set: setCheckin  },
                  { label: "Check-out", val: checkout, set: setCheckout },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(212,168,67,0.55)" }}>{label}</p>
                    <div className="relative flex items-center px-5 py-5" style={fieldBase}>
                      <Calendar size={18} className="mr-4 flex-shrink-0" style={{ color: gold }} />
                      <input
                        type="date"
                        value={val}
                        onChange={(e) => set(e.target.value)}
                        className="w-full bg-transparent text-base outline-none"
                        style={{ color: "rgba(240,235,220,0.85)", colorScheme: "dark" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {nights > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-3 px-5 py-3 mb-8" style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.2)" }}>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.6rem", color: gold }}>{nights}</span>
                  <span className="text-xs" style={{ color: "rgba(212,168,67,0.6)" }}>{nights === 1 ? "night" : "nights"} selected</span>
                </motion.div>
              )}

              <motion.button
                onClick={() => go(2)}
                disabled={!checkin || !checkout || nights <= 0}
                className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase"
                style={{ background: checkin && checkout && nights > 0 ? gold : "rgba(255,255,255,0.05)", color: checkin && checkout && nights > 0 ? "#080806" : "rgba(255,255,255,0.2)", border: "none", cursor: checkin && checkout && nights > 0 ? "pointer" : "not-allowed" }}
                whileHover={checkin && checkout && nights > 0 ? { scale: 1.03 } : {}}
                whileTap={checkin && checkout && nights > 0 ? { scale: 0.97 } : {}}
              >
                Continue <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* ──────────────── STEP 2 — GUESTS ─────────────── */}
          {step === 2 && !submitted && (
            <motion.div key="step2" {...slide(dir)}>
              <h1 className="font-light mb-3 leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem,4.5vw,5.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}>
                Who&apos;s joining<br />your story?
              </h1>
              <p className="text-base mb-14" style={{ color: "rgba(200,185,150,0.5)" }}>Tell us how many people are coming along.</p>

              <div className="flex items-center gap-8 mb-6">
                <motion.button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-14 h-14 flex items-center justify-center text-2xl"
                  style={{ border: `1px solid rgba(212,168,67,0.25)`, color: gold, background: "transparent" }}
                  whileHover={{ scale: 1.1, borderColor: gold }}
                  whileTap={{ scale: 0.9 }}
                >
                  –
                </motion.button>

                <div className="text-center">
                  <motion.p
                    key={guests}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "5rem", color: gold, lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    {guests}
                  </motion.p>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(212,168,67,0.4)" }}>
                    {guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>

                <motion.button
                  onClick={() => setGuests(Math.min(4, guests + 1))}
                  className="w-14 h-14 flex items-center justify-center text-2xl"
                  style={{ border: `1px solid rgba(212,168,67,0.25)`, color: gold, background: "transparent" }}
                  whileHover={{ scale: 1.1, borderColor: gold }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>

              <p className="text-sm mb-10" style={{ color: "rgba(200,185,150,0.35)" }}>
                {guests === 1 ? "Just you. Sounds peaceful." : guests === 2 ? "The two of you. Perfect." : guests === 3 ? "A trio. We'll make room." : "A group of four. The more the merrier."}
              </p>

              <div className="flex items-center gap-4">
                <button onClick={() => go(1)} className="text-xs tracking-widest uppercase px-6 py-4" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,160,0.35)", background: "transparent" }}>
                  Back
                </button>
                <motion.button
                  onClick={() => go(3)}
                  className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase"
                  style={{ background: gold, color: "#080806", border: "none" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ──────────────── STEP 3 — INTENT ─────────────── */}
          {step === 3 && !submitted && (
            <motion.div key="step3" {...slide(dir)}>
              <h1 className="font-light mb-3 leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem,4.5vw,5.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}>
                What kind of stay<br />are you looking for?
              </h1>
              <p className="text-base mb-12" style={{ color: "rgba(200,185,150,0.5)" }}>We&apos;ll find the room that tells your story.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                {intents.map((opt) => {
                  const active = intent === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => setIntent(opt.id)}
                      className="relative text-left p-5 transition-all duration-300"
                      style={{
                        background: active ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.02)",
                        border: active ? `1px solid ${gold}` : "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{ y: -3, transition: { duration: 0.25 } }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {active && (
                        <motion.div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: gold }} layoutId="intentDot" />
                      )}
                      <div className="mb-3" style={{ color: active ? gold : "rgba(200,190,160,0.4)" }}>
                        {opt.icon}
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: active ? "rgba(245,235,200,0.95)" : "rgba(220,210,185,0.6)" }}>
                        {opt.label}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(180,170,140,0.4)" }}>
                        {opt.sublabel}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => go(2)} className="text-xs tracking-widest uppercase px-6 py-4" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,160,0.35)", background: "transparent" }}>
                  Back
                </button>
                <motion.button
                  onClick={() => go(4)}
                  disabled={!intent}
                  className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase"
                  style={{ background: intent ? gold : "rgba(255,255,255,0.05)", color: intent ? "#080806" : "rgba(255,255,255,0.2)", border: "none", cursor: intent ? "pointer" : "not-allowed" }}
                  whileHover={intent ? { scale: 1.03 } : {}}
                  whileTap={intent ? { scale: 0.97 } : {}}
                >
                  Find My Room <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ──────────────── STEP 4 — RECOMMENDATION ─────── */}
          {step === 4 && !submitted && recommended && (
            <motion.div key="step4" {...slide(dir)}>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(212,168,67,0.55)" }}>
                We found your room
              </p>
              <h1 className="font-light mb-1 leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2.5rem,5.5vw,5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.02em" }}>
                {recommended.name}
              </h1>
              <p className="text-sm mb-8 italic" style={{ color: gold, fontFamily: '"Cormorant Garamond", serif', fontSize: "1.1rem" }}>
                &ldquo;{recommended.tagline}&rdquo;
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* image */}
                <div className="relative overflow-hidden" style={{ height: "280px", border: `1px solid ${accentPalette[recommended.accent].border}` }}>
                  <div className="w-full h-full" style={{ backgroundImage: `url('${recommended.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,8,6,0.7) 100%)" }} />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,168,67,0.7)" }}>{recommended.type}</p>
                  </div>
                </div>

                {/* story + price */}
                <div className="flex flex-col justify-between">
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(200,190,160,0.7)" }}>
                    {recommended.story}
                  </p>

                  <div>
                    <div className="flex items-end gap-3 mb-4">
                      <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "3rem", color: gold, letterSpacing: "-0.03em", lineHeight: 1 }}>
                        ${recommended.price}
                      </span>
                      <span className="text-xs pb-2" style={{ color: "rgba(200,185,150,0.4)" }}>/ night</span>
                      {nights > 0 && (
                        <span className="text-xs pb-2" style={{ color: "rgba(212,168,67,0.5)" }}>
                          · ${(recommended.price * nights).toLocaleString()} total
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {[recommended.beds, recommended.guests].map((t) => (
                        <span key={t} className="text-xs px-3 py-1.5" style={{ background: accentPalette[recommended.accent].bg, border: `1px solid ${accentPalette[recommended.accent].border}`, color: accentPalette[recommended.accent].text }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* confirm form */}
              <div className="p-6 mb-6" style={{ background: "rgba(10,10,8,0.6)", border: "1px solid rgba(212,168,67,0.1)" }}>
                <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "rgba(212,168,67,0.45)" }}>Confirm your reservation</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Your Name</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" className="w-full px-4 py-3 text-sm outline-none" style={fieldBase} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Email Address</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-sm outline-none" style={fieldBase} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs mb-5 p-3" style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.1)" }}>
                  <Calendar size={13} style={{ color: gold }} />
                  <span style={{ color: "rgba(200,185,150,0.5)" }}>
                    {checkin || "—"} → {checkout || "—"} · {guests} {guests === 1 ? "guest" : "guests"}
                  </span>
                  <button onClick={() => go(1)} className="ml-auto text-xs underline" style={{ color: "rgba(212,168,67,0.4)" }}>
                    Edit
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => { if (name && email) setSubmitted(true); }}
                  disabled={!name || !email}
                  className="flex-1 flex items-center justify-center gap-3 py-4 text-sm tracking-widest uppercase"
                  style={{ background: name && email ? gold : "rgba(255,255,255,0.05)", color: name && email ? "#080806" : "rgba(255,255,255,0.2)", border: "none" }}
                  whileHover={name && email ? { scale: 1.02 } : {}}
                  whileTap={name && email ? { scale: 0.98 } : {}}
                >
                  Reserve {recommended.name}
                </motion.button>
                <button onClick={() => go(3)} className="px-8 py-4 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,160,0.35)", background: "transparent" }}>
                  Different vibe?
                </button>
              </div>
            </motion.div>
          )}

          {/* ──────────────── CONFIRMED ───────────────────── */}
          {submitted && (
            <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center py-20">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
                <CheckCircle size={56} style={{ color: gold }} />
              </motion.div>
              <h2 className="font-light mb-3" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2rem,5vw,4rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.02em" }}>
                Your chapter is reserved.
              </h2>
              <p className="text-sm mb-2 max-w-sm" style={{ color: "rgba(200,190,160,0.55)" }}>
                {recommended?.name} · {checkin} to {checkout} · {guests} {guests === 1 ? "guest" : "guests"}
              </p>
              <p className="text-xs mb-10" style={{ color: "rgba(212,168,67,0.45)" }}>
                Confirmation will arrive at {email}
              </p>
              <Link href="/">
                <motion.button className="px-8 py-4 text-xs tracking-widest uppercase" style={{ border: `1px solid ${gold}`, color: gold, background: "transparent" }} whileHover={{ background: "rgba(212,168,67,0.08)" }}>
                  Back to Home
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
          </div>{/* flex-1 steps */}
        </div>{/* left panel */}

        {/* ── RIGHT: visual panel (desktop only) ─────────── */}
        <div
          className="hidden lg:flex lg:w-[42%] xl:w-[45%] fixed right-0 top-0 h-screen flex-col justify-end"
          style={{ backgroundColor: "#060401" }}
        >
          {/* Cabin background image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1542718610-a1e3ff82c8b9?w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,6,0.55) 0%, rgba(8,8,6,0.2) 40%, rgba(8,8,6,0.7) 100%)" }} />
          {/* Amber warm tint */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(212,168,67,0.08) 0%, transparent 60%)" }} />

          {/* Bottom copy */}
          <div className="relative z-10 p-12 xl:p-16">
            <div className="w-10 h-px mb-6" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
            <p
              className="font-light leading-tight mb-3"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(1.8rem, 2.5vw, 2.8rem)",
                color: "rgba(253,244,211,0.92)",
                letterSpacing: "-0.02em",
              }}
            >
              Log Cabin Luxury,<br />Lofted in Love.
            </p>
            <p className="text-sm" style={{ color: "rgba(220,195,140,0.45)" }}>
              Brady Inn · Mountain View, CA
            </p>

            {/* Step labels */}
            <div className="mt-10 space-y-3">
              {[
                { n: 1, label: "Choose your dates" },
                { n: 2, label: "How many guests?" },
                { n: 3, label: "Pick your vibe" },
                { n: 4, label: "Confirm & reserve" },
              ].map(({ n, label }) => (
                <div key={n} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: n <= step ? "rgba(212,168,67,0.9)" : "rgba(255,255,255,0.15)" }}
                  />
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: n === step ? "rgba(212,168,67,0.8)" : n < step ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.2)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>{/* split layout */}

      <Footer />
    </div>
  );
}
