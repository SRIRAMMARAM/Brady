"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, SITE_NAME, CONTACT_INFO } from "@/constants";
import { staggerContainer, staggerItem } from "@/animations/variants";

const footerLinks = {
  Rooms: [
    { label: "The Fireside Room", href: "/rooms#the-fireside-room" },
    { label: "The Timber King", href: "/rooms#the-timber-king" },
    { label: "The Family Lodge", href: "/rooms#the-family-lodge" },
    { label: "The Honeymoon Cabin", href: "/rooms#the-honeymoon-cabin" },
    { label: "The Brady Loft", href: "/rooms#the-brady-loft" },
  ],
  Experiences: [
    { label: "Cabin Breakfast", href: "/dining" },
    { label: "Nature Trails", href: "/experience#trails" },
    { label: "Stargazing Nights", href: "/experience#stargazing" },
    { label: "Firepit & S'mores", href: "/experience#firepit" },
    { label: "All Experiences", href: "/experience" },
  ],
  Company: [
    { label: "Gallery", href: "/gallery" },
    { label: "Press", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#080604" }}
    >
      {/* Top divider */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,168,67,0.35), rgba(200,145,42,0.25), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212,168,67,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Main footer content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
        >
          {/* Brand column */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4 L28 15 H24 V27 H8 V15 H4 Z" fill="url(#footCabin)" fillOpacity="0.85" />
                  <rect x="12" y="19" width="8" height="8" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.45)" strokeWidth="0.75" />
                  <line x1="16" y1="19" x2="16" y2="27" stroke="rgba(212,168,67,0.3)" strokeWidth="0.5" />
                  <defs>
                    <linearGradient id="footCabin" x1="4" y1="4" x2="28" y2="27">
                      <stop stopColor="#d4a843" />
                      <stop offset="1" stopColor="#8a600e" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
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

            <p
              className="text-sm leading-relaxed mb-8 max-w-xs"
              style={{ color: "rgba(220,195,140,0.45)" }}
            >
              A boutique cabin inn where rustic warmth meets
              refined comfort. Five rooms, five stories — each
              one made for a different kind of stay.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(212,168,67,0.5)" }}>
                Contact
              </p>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="block text-xs"
                style={{ color: "rgba(200,200,212,0.4)" }}
                data-cursor="hover"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="block text-xs"
                style={{ color: "rgba(200,200,212,0.4)" }}
                data-cursor="hover"
              >
                {CONTACT_INFO.email}
              </a>
              <p className="text-xs" style={{ color: "rgba(152,152,168,0.3)" }}>
                {CONTACT_INFO.address}
              </p>
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={staggerItem}>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs group flex items-center gap-1.5 transition-colors duration-300"
                      style={{ color: "rgba(152,152,168,0.45)" }}
                      data-cursor="hover"
                    >
                      <span className="group-hover:text-chrome-200 transition-colors duration-300" style={{ color: "inherit" }}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-xs" style={{ color: "rgba(212,168,67,0.2)" }}>
            © {year} Brady Casa Inn. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#d4a843" }}
            />
            <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,168,67,0.22)" }}>
              Mountain View · California
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#d4a843" }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-xs" style={{ color: "rgba(212,168,67,0.28)" }}>
              Open year-round
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
