"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Search, Calendar, Moon, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { bookings as bookingApi, type BookingRead, ApiError } from "@/lib/api";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const gold = "rgba(212,168,67,0.9)";
const EASE = [0.16, 1, 0.3, 1] as const;

function StatusIcon({ status }: { status: BookingRead["booking_status"] }) {
  if (status === "confirmed")  return <CheckCircle size={40} style={{ color: "rgba(80,200,120,0.9)" }} />;
  if (status === "cancelled")  return <XCircle     size={40} style={{ color: "rgba(220,80,80,0.9)" }} />;
  return <Clock size={40} style={{ color: gold }} />;
}

export default function BookingLookupPage() {
  const searchParams = useSearchParams();
  const [refInput, setRefInput]   = useState(searchParams.get("ref") ?? "");
  const [booking,  setBooking]    = useState<BookingRead | null>(null);
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState<string | null>(null);

  const fieldStyle = {
    background: "rgba(10,10,14,0.7)",
    border: "1px solid rgba(212,168,67,0.15)",
    color: "rgba(240,235,220,0.85)",
    colorScheme: "dark" as const,
  };

  async function lookup(ref?: string) {
    const code = (ref ?? refInput).trim();
    if (!code) return;
    setLoading(true); setError(null); setBooking(null);
    try {
      const res = await bookingApi.get(code);
      setBooking(res);
    } catch (e) {
      setError(e instanceof ApiError && e.status === 404
        ? "No booking found with that reference code."
        : e instanceof ApiError ? e.message : "Failed to look up booking.");
    } finally {
      setLoading(false);
    }
  }

  // Auto-lookup if ref param is present in URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) lookup(ref);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusLabel = booking
    ? ({ confirmed: "Confirmed", pending: "Pending", cancelled: "Cancelled" }[booking.booking_status])
    : "";

  const statusColor = booking
    ? ({ confirmed: "rgba(80,200,120,0.9)", pending: gold, cancelled: "rgba(220,100,100,0.9)" }[booking.booking_status])
    : gold;

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(212,168,67,0.05) 0%, transparent 60%)" }} />

      {/* Header */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <div className="relative w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>Booking Status</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-light leading-none mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Find Your<br />Booking
            </motion.h1>
            <motion.p variants={staggerItem} className="text-sm max-w-sm" style={{ color: "rgba(200,185,150,0.45)" }}>
              Enter your booking reference code to view your reservation details.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Lookup form */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="max-w-xl">
          <div className="flex gap-3 mb-8">
            <input
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
              type="text"
              placeholder="e.g. BRADY-ABC123"
              className="flex-1 px-4 py-3.5 text-sm outline-none font-mono tracking-wider"
              style={fieldStyle}
              onFocus={(e) => { e.target.style.borderColor = gold; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }}
            />
            <motion.button
              onClick={() => lookup()}
              disabled={loading || !refInput.trim()}
              className="px-6 py-3.5 text-xs tracking-widest uppercase flex items-center gap-2"
              style={{ background: refInput.trim() && !loading ? gold : "rgba(255,255,255,0.05)", color: refInput.trim() && !loading ? "#080806" : "rgba(255,255,255,0.2)", border: "none" }}
              whileHover={refInput.trim() && !loading ? { scale: 1.02 } : {}}
              whileTap={refInput.trim() && !loading ? { scale: 0.98 } : {}}
            >
              <Search size={14} />
              {loading ? "Searching…" : "Look Up"}
            </motion.button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 px-4 py-3 text-sm" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.85)" }}>
              {error}
            </div>
          )}

          {/* Result */}
          {booking && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Status hero */}
              <div className="flex items-center gap-5 p-8 mb-4" style={{ background: "rgba(13,13,20,0.6)", border: `1px solid ${statusColor.replace("0.9", "0.2")}` }}>
                <StatusIcon status={booking.booking_status} />
                <div>
                  <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: statusColor }}>
                    {statusLabel}
                  </p>
                  <p className="font-light" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.02em" }}>
                    {booking.room.name}
                  </p>
                  <p className="text-xs mt-1 font-mono tracking-wider" style={{ color: "rgba(200,185,150,0.4)" }}>{booking.ref_code}</p>
                </div>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Check-in",   value: booking.check_in,               icon: <Calendar size={13} /> },
                  { label: "Check-out",  value: booking.check_out,              icon: <Calendar size={13} /> },
                  { label: "Nights",     value: `${booking.nights}`,            icon: <Moon size={13} /> },
                  { label: "Guests",     value: `${booking.room.max_guests} max`, icon: <Users size={13} /> },
                  { label: "Total",      value: `$${booking.total_price.toLocaleString()}`, icon: null },
                  { label: "Payment",    value: booking.payment_status === "paid" ? "Paid" : "Pay at property", icon: null },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="p-4" style={{ background: "rgba(10,10,8,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                      {icon}{label}
                    </p>
                    <p className="text-sm" style={{ color: "rgba(200,185,150,0.75)" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Guest */}
              <div className="p-4 mb-6" style={{ background: "rgba(10,10,8,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Guest</p>
                <p className="text-sm" style={{ color: "rgba(200,185,150,0.75)" }}>{booking.user.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(200,185,150,0.4)" }}>{booking.user.email}</p>
              </div>

              <div className="flex gap-3">
                <Link href="/my-bookings">
                  <motion.button className="px-6 py-3 text-xs tracking-widest uppercase" style={{ border: `1px solid rgba(212,168,67,0.3)`, color: "rgba(212,168,67,0.7)", background: "transparent" }} whileHover={{ background: "rgba(212,168,67,0.08)" }}>
                    All My Bookings
                  </motion.button>
                </Link>
                <Link href="/booking">
                  <motion.button className="px-6 py-3 text-xs tracking-widest uppercase" style={{ background: gold, color: "#080806", border: "none" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    New Reservation
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
