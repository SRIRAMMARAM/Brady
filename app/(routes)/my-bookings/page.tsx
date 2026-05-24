"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft, Calendar, Moon, Users, CheckCircle,
  XCircle, Clock, AlertTriangle, LogIn,
} from "lucide-react";
import Footer from "@/components/sections/Footer";
import { useAuth, ApiError } from "@/contexts/AuthContext";
import { userBookings, bookings as bookingApi, type BookingRead } from "@/lib/api";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { FIELD_STYLE, ERROR_STYLE, CARD_STYLE } from "@/lib/theme";

const gold = "rgba(212,168,67,0.9)";
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Status badge ─────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: BookingRead["booking_status"] }) {
  const map = {
    confirmed:  { icon: <CheckCircle  size={12} />, label: "Confirmed",  color: "rgba(80,200,120,0.9)",  bg: "rgba(60,180,80,0.08)",  border: "rgba(60,180,80,0.25)" },
    pending:    { icon: <Clock        size={12} />, label: "Pending",    color: "rgba(212,168,67,0.9)", bg: "rgba(212,168,67,0.08)", border: "rgba(212,168,67,0.25)" },
    cancelled:  { icon: <XCircle      size={12} />, label: "Cancelled",  color: "rgba(220,80,80,0.9)",  bg: "rgba(220,80,80,0.08)",  border: "rgba(220,80,80,0.25)" },
  };
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      {s.icon} {s.label}
    </span>
  );
}

// ─── Payment badge ────────────────────────────────────────────────────────
function PayBadge({ status, mode }: {
  status: BookingRead["payment_status"];
  mode:   BookingRead["payment_mode"];
}) {
  const label =
    status === "paid"     ? "Paid" :
    status === "refunded" ? "Refunded" :
    mode   === "online"   ? "Pay Online" :
    "Pay at Property";

  const rgba =
    status === "paid"     ? "60,180,80" :
    status === "refunded" ? "124,58,237" :
    mode   === "online"   ? "212,168,67" :
    "200,185,150";

  return (
    <span className="text-xs px-2 py-0.5" style={{
      background: `rgba(${rgba},0.08)`,
      border:     `1px solid rgba(${rgba},0.2)`,
      color:      `rgba(${rgba},0.8)`,
    }}>
      {label}
    </span>
  );
}

// ─── Login form ───────────────────────────────────────────────────────────
function LoginPrompt() {
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const fieldStyle = FIELD_STYLE;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(null);
    try { await login(email, password); }
    catch (e) { setError(e instanceof ApiError ? e.message : "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <div className="flex items-center gap-3 mb-6">
        <LogIn size={20} style={{ color: gold }} />
        <p className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.55)" }}>Sign in to view your bookings</p>
      </div>
      <h2 className="font-light mb-10 leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2rem,4vw,3.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.02em" }}>
        Welcome back
      </h2>
      <form onSubmit={handleLogin} className="space-y-4 p-8" style={{ background: "rgba(10,10,8,0.6)", border: "1px solid rgba(212,168,67,0.1)" }}>
        <div>
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="your@email.com" className="w-full px-4 py-3 text-sm outline-none" style={fieldStyle} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="••••••••" className="w-full px-4 py-3 text-sm outline-none" style={fieldStyle} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
        </div>
        {error && <p className="text-xs px-3 py-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>{error}</p>}
        <motion.button type="submit" disabled={loading} className="w-full py-4 text-xs tracking-widest uppercase" style={{ background: loading ? "rgba(255,255,255,0.05)" : gold, color: loading ? "rgba(255,255,255,0.2)" : "#080806", border: "none" }} whileHover={loading ? {} : { scale: 1.01 }} whileTap={loading ? {} : { scale: 0.99 }}>
          {loading ? "Signing in…" : "Sign In"}
        </motion.button>
      </form>
      <p className="mt-4 text-xs text-center" style={{ color: "rgba(200,185,150,0.3)" }}>
        New here?{" "}
        <Link href="/booking" style={{ color: "rgba(212,168,67,0.5)", textDecoration: "underline" }}>Make a reservation</Link>
        {" "}to create an account.
      </p>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function MyBookingsPage() {
  const { user, accessToken, logout, isLoading: authLoading } = useAuth();
  const [myBookings, setMyBookings] = useState<BookingRead[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = useCallback(async (p = 1) => {
    if (!accessToken) return;
    setLoading(true); setError(null);
    try {
      const res = await userBookings.list(accessToken, p, 10);
      setMyBookings(res.items);
      setTotalPages(res.pages);
      setPage(p);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => { if (accessToken) fetchBookings(1); }, [accessToken, fetchBookings]);

  async function handleCancel(ref_code: string) {
    if (!accessToken) return;
    setCancelling(ref_code);
    try {
      await bookingApi.cancel(ref_code, accessToken);
      setMyBookings((prev) => prev.map((b) => b.ref_code === ref_code ? { ...b, booking_status: "cancelled" } : b));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to cancel.");
    } finally {
      setCancelling(null);
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#050508" }}>
        <div className="w-6 h-6 border border-t-transparent animate-spin" style={{ borderColor: gold, borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(212,168,67,0.05) 0%, transparent 60%)" }} />

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
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>Your Stays</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-light leading-none mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              My Bookings
            </motion.h1>
            {user && (
              <motion.div variants={staggerItem} className="flex items-center gap-4">
                <p className="text-sm" style={{ color: "rgba(200,185,150,0.45)" }}>
                  Signed in as <span style={{ color: "rgba(212,168,67,0.7)" }}>{user.email}</span>
                </p>
                <button onClick={logout} className="text-xs tracking-widest uppercase underline" style={{ color: "rgba(200,185,150,0.25)", background: "none", border: "none", cursor: "pointer" }}>
                  Sign out
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        {!user ? (
          <LoginPrompt />
        ) : (
          <>
            {error && (
              <div className="mb-6 px-4 py-3 text-xs flex items-center gap-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>
                <AlertTriangle size={14} /> {error}
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="w-6 h-6 border animate-spin" style={{ borderColor: "rgba(212,168,67,0.3)", borderTopColor: gold }} />
              </div>
            ) : myBookings.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-light mb-3" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.5rem", color: "rgba(245,235,200,0.5)" }}>No bookings yet</p>
                <p className="text-sm mb-8" style={{ color: "rgba(200,185,150,0.3)" }}>Your upcoming stays will appear here.</p>
                <Link href="/booking">
                  <motion.button className="px-8 py-4 text-xs tracking-widest uppercase" style={{ border: `1px solid ${gold}`, color: gold, background: "transparent" }} whileHover={{ background: "rgba(212,168,67,0.08)" }}>
                    Make a Reservation
                  </motion.button>
                </Link>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {myBookings.map((booking) => (
                      <motion.div
                        key={booking.ref_code}
                        variants={staggerItem}
                        className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start"
                        style={{ background: "rgba(13,13,20,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        {/* Left — info */}
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <p className="font-light" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.5rem", color: "rgba(245,235,200,0.9)" }}>
                              {booking.room.name}
                            </p>
                            <StatusBadge status={booking.booking_status} />
                            <PayBadge status={booking.payment_status} mode={booking.payment_mode} />
                          </div>

                          <div className="flex flex-wrap gap-6 text-xs mb-4" style={{ color: "rgba(200,185,150,0.5)" }}>
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} /> {booking.check_in} → {booking.check_out}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Moon size={12} /> {booking.nights} {booking.nights === 1 ? "night" : "nights"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users size={12} /> {booking.room.max_guests} max guests
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-6">
                            <div>
                              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>Total</p>
                              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.75rem", color: gold, letterSpacing: "-0.02em", lineHeight: 1 }}>
                                ${booking.total_price.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>Ref Code</p>
                              <p className="text-sm font-mono" style={{ color: "rgba(200,185,150,0.6)", letterSpacing: "0.08em" }}>{booking.ref_code}</p>
                            </div>
                          </div>
                        </div>

                        {/* Right — actions */}
                        {booking.booking_status !== "cancelled" && (
                          <div className="flex flex-col gap-2 min-w-[140px]">
                            {booking.payment_mode === "online" && booking.payment_status === "unpaid" && (
                              <Link href={`/booking/${booking.ref_code}/pay`}>
                                <motion.button className="w-full py-2.5 text-xs tracking-widest uppercase" style={{ background: gold, color: "#080806", border: "none" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  Pay Now
                                </motion.button>
                              </Link>
                            )}
                            <Link href={`/booking/lookup?ref=${booking.ref_code}`}>
                              <motion.button className="w-full py-2.5 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(212,168,67,0.25)", color: "rgba(212,168,67,0.7)", background: "transparent" }} whileHover={{ background: "rgba(212,168,67,0.08)" }}>
                                View Details
                              </motion.button>
                            </Link>
                            <motion.button
                              onClick={() => handleCancel(booking.ref_code)}
                              disabled={cancelling === booking.ref_code}
                              className="w-full py-2.5 text-xs tracking-widest uppercase"
                              style={{ border: "1px solid rgba(220,80,80,0.2)", color: cancelling === booking.ref_code ? "rgba(255,255,255,0.2)" : "rgba(220,100,100,0.6)", background: "transparent" }}
                              whileHover={cancelling === booking.ref_code ? {} : { background: "rgba(220,80,80,0.06)" }}
                            >
                              {cancelling === booking.ref_code ? "Cancelling…" : "Cancel"}
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-10">
                    <button onClick={() => fetchBookings(page - 1)} disabled={page === 1} className="px-5 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: page === 1 ? "rgba(255,255,255,0.15)" : "rgba(200,185,150,0.5)", background: "transparent" }}>
                      Prev
                    </button>
                    <span className="text-xs" style={{ color: "rgba(200,185,150,0.35)" }}>{page} / {totalPages}</span>
                    <button onClick={() => fetchBookings(page + 1)} disabled={page === totalPages} className="px-5 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: page === totalPages ? "rgba(255,255,255,0.15)" : "rgba(200,185,150,0.5)", background: "transparent" }}>
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
