"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, BookOpen, Shield } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 20]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Background that appears on scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(5, 5, 8, 0.85)",
            backdropFilter: `blur(${navBlur}px)`,
            WebkitBackdropFilter: `blur(${navBlur}px)`,
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
            opacity: navOpacity,
          }}
        />

        <div className="relative flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" data-cursor="hover">
            <motion.div
              className="w-7 h-7 relative"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4 L28 15 H24 V27 H8 V15 H4 Z" fill="url(#cabinRoof)" fillOpacity="0.85" />
                <rect x="12" y="19" width="8" height="8" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" strokeWidth="0.75" />
                <line x1="16" y1="19" x2="16" y2="27" stroke="rgba(212,168,67,0.35)" strokeWidth="0.5" />
                <defs>
                  <linearGradient id="cabinRoof" x1="4" y1="4" x2="28" y2="27">
                    <stop stopColor="#d4a843" />
                    <stop offset="1" stopColor="#8a600e" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <div>
              <span
                className="text-sm font-light tracking-[0.15em] uppercase"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  background: "linear-gradient(135deg, #fdf4d3 0%, #d4a843 45%, #f5d98a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {SITE_NAME}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className="relative text-xs tracking-[0.15em] uppercase group"
                  style={{ color: "rgba(200, 200, 212, 0.7)" }}
                  data-cursor="hover"
                >
                  <span className="transition-colors duration-300 group-hover:text-white">
                    {link.label}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px"
                    style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA + Auth area */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" data-cursor="hover">
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.12em] uppercase"
                      style={{ border: "1px solid rgba(180,140,255,0.25)", color: "rgba(200,170,255,0.85)", background: "transparent" }}
                      whileHover={{ background: "rgba(180,140,255,0.08)", scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Shield size={13} />
                      Admin
                    </motion.button>
                  </Link>
                )}
                <Link href="/my-bookings" data-cursor="hover">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.12em] uppercase"
                    style={{ border: "1px solid rgba(212,168,67,0.2)", color: "rgba(212,168,67,0.7)", background: "transparent" }}
                    whileHover={{ background: "rgba(212,168,67,0.08)", scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen size={13} />
                    My Bookings
                  </motion.button>
                </Link>
                <motion.button
                  onClick={logout}
                  className="text-xs tracking-widest uppercase px-3 py-2"
                  style={{ color: "rgba(200,185,150,0.3)", background: "transparent", border: "none", cursor: "pointer" }}
                  whileHover={{ color: "rgba(200,185,150,0.6)" }}
                >
                  Sign out
                </motion.button>
              </>
            ) : (
              <Link href="/login" data-cursor="hover">
                <motion.button
                  className="text-xs tracking-widest uppercase px-3 py-2"
                  style={{ color: "rgba(200,185,150,0.45)", background: "transparent", border: "none", cursor: "pointer" }}
                  whileHover={{ color: "rgba(200,185,150,0.8)" }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}
            <Link href="/booking" data-cursor="hover">
              <motion.button
                className="relative px-6 py-2.5 text-xs tracking-[0.15em] uppercase overflow-hidden"
                style={{
                  border: "1px solid rgba(212, 168, 67, 0.4)",
                  color: "#d4a843",
                  background: "transparent",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.1), transparent)" }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Reserve</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "rgba(240,240,245,0.8)", cursor: "none" }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: "#080604" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Ambient */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(180,110,30,0.07) 0%, transparent 60%)",
              }}
            />

            <div className="flex flex-col justify-center items-center h-full gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-4"
                  >
                    <span
                      className="font-light tracking-[0.1em]"
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: "clamp(2rem, 6vw, 3.5rem)",
                        background: "linear-gradient(135deg, #f0f0f5, #9898a8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <Link href="/booking" onClick={() => setMobileOpen(false)}>
                  <button
                    className="px-10 py-3 text-xs tracking-[0.2em] uppercase"
                    style={{
                      border: "1px solid rgba(212,168,67,0.4)",
                      color: "#d4a843",
                      background: "transparent",
                    }}
                  >
                    Reserve Now
                  </button>
                </Link>

                {user ? (
                  <>
                    {user.role === "admin" && (
                      <Link href="/admin" onClick={() => setMobileOpen(false)}>
                        <button className="flex items-center gap-2 px-8 py-2.5 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(180,140,255,0.25)", color: "rgba(200,170,255,0.85)", background: "transparent" }}>
                          <Shield size={13} /> Admin
                        </button>
                      </Link>
                    )}
                    <Link href="/my-bookings" onClick={() => setMobileOpen(false)}>
                      <button className="flex items-center gap-2 px-8 py-2.5 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(212,168,67,0.25)", color: "rgba(212,168,67,0.7)", background: "transparent" }}>
                        <BookOpen size={13} /> My Bookings
                      </button>
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="text-xs tracking-widest uppercase px-8 py-2.5"
                      style={{ color: "rgba(200,185,150,0.35)", background: "transparent", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <button className="text-xs tracking-widest uppercase px-8 py-2.5" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,185,150,0.5)", background: "transparent" }}>
                      Sign In
                    </button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Bottom bar */}
            <motion.div
              className="px-8 pb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,168,67,0.3)" }}>
                hello@bradycasainn.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
