"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Calendar, Moon, ArrowRight } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { type BookingRead } from "@/lib/api";

const gold = "rgba(212,168,67,0.9)";
const EASE = [0.16, 1, 0.3, 1] as const;

export function BookingConfirmedView({ booking }: { booking: BookingRead }) {
  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,67,0.06) 0%, transparent 60%)" }}
      />

      <section className="relative flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-lg w-full text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
            style={{ background: "rgba(60,180,80,0.1)", border: "1px solid rgba(60,180,80,0.25)" }}
          >
            <CheckCircle size={40} style={{ color: "rgba(80,200,120,0.9)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(212,168,67,0.6)" }}>
              Reservation Confirmed
            </p>
            <h1
              className="font-light mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2.5rem,6vw,5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}
            >
              Your chapter<br />is reserved.
            </h1>
            <p className="text-sm mb-8" style={{ color: "rgba(200,185,150,0.45)" }}>
              A confirmation has been sent to <span style={{ color: "rgba(212,168,67,0.7)" }}>{booking.user.email}</span>
            </p>
          </motion.div>

          {/* Booking card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
            className="p-6 mb-8 text-left"
            style={{ background: "rgba(13,13,8,0.7)", border: "1px solid rgba(212,168,67,0.15)" }}
          >
            <p
              className="font-light mb-5 text-center"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.5rem", color: "rgba(245,235,200,0.9)" }}
            >
              {booking.room.name}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { icon: <Calendar size={12} />, label: "Check-in",  value: booking.check_in  },
                { icon: <Calendar size={12} />, label: "Check-out", value: booking.check_out },
                { icon: <Moon     size={12} />, label: "Nights",    value: String(booking.nights) },
                { icon: null,                   label: "Payment",   value: booking.payment_mode === "online" ? "Online – Pending" : "Pay at Property" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {icon && <span style={{ color: gold }}>{icon}</span>}
                    {label}
                  </p>
                  <p className="text-sm" style={{ color: "rgba(200,185,150,0.75)" }}>{value}</p>
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div>
                <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>Ref Code</p>
                <p className="font-mono text-sm" style={{ color: "rgba(200,185,150,0.65)", letterSpacing: "0.08em" }}>
                  {booking.ref_code}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>Total</p>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.75rem", color: gold, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  ${booking.total_price.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/my-bookings">
              <motion.button
                className="w-full sm:w-auto px-8 py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                style={{ background: gold, color: "#080806", border: "none" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                My Bookings <ArrowRight size={13} />
              </motion.button>
            </Link>
            <Link href="/">
              <motion.button
                className="w-full sm:w-auto px-8 py-4 text-xs tracking-widest uppercase"
                style={{ border: "1px solid rgba(212,168,67,0.3)", color: "rgba(212,168,67,0.7)", background: "transparent" }}
                whileHover={{ background: "rgba(212,168,67,0.08)" }}
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export function BookingConfirmedError({ message }: { message: string }) {
  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }} className="flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm mb-4" style={{ color: "rgba(220,100,100,0.8)" }}>{message}</p>
        <Link href="/" className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,168,67,0.5)", textDecoration: "underline" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
