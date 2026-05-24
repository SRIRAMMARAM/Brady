"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { useAuth, ApiError } from "@/contexts/AuthContext";
import { userBookings, availability, rooms as apiRooms, type RoomRead, type PaymentMode } from "@/lib/api";
import { FIELD_STYLE } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as const;
const gold = "rgba(212,168,67,0.9)";

const ROOM_IMAGES: Record<string, string> = {
  queen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  king:  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  suite: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
  loft:  "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80",
};
function roomImg(type: string) {
  return ROOM_IMAGES[type.toLowerCase()] ?? "https://images.unsplash.com/photo-1542718610-a1e3ff82c8b9?w=800&q=80";
}

const slide = (dir: number) => ({
  initial:  { opacity: 0, x: dir * 60 },
  animate:  { opacity: 1, x: 0 },
  exit:     { opacity: 0, x: dir * -60 },
  transition: { duration: 0.5, ease: EASE },
});

function nightCount(ci: string, co: string) {
  if (!ci || !co) return 0;
  const d = (new Date(co).getTime() - new Date(ci).getTime()) / 86_400_000;
  return d > 0 ? d : 0;
}

const fieldBase = FIELD_STYLE;

export default function BookingPage() {
  return (
    <Suspense>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const router      = useRouter();
  const searchParams = useSearchParams();
  const { user, accessToken, logout, signup, login } = useAuth();

  const [step,         setStep]         = useState(1);
  const [dir,          setDir]          = useState(1);
  const [checkin,      setCheckin]      = useState("");
  const [checkout,     setCheckout]     = useState("");
  const [guests,       setGuests]       = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<RoomRead | null>(null);
  const [paymentMode,  setPaymentMode]  = useState<PaymentMode>("property");
  const [name,         setName]         = useState("");
  const [email,        setEmail]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [password,     setPassword]     = useState("");
  const [apiError,     setApiError]     = useState<string | null>(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [checking,     setChecking]     = useState(false);
  const [availableIds, setAvailableIds] = useState<Set<number> | null>(null);
  const [apiRoomList,  setApiRoomList]  = useState<RoomRead[] | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const minCheckout = checkin
    ? new Date(new Date(checkin).getTime() + 86_400_000).toISOString().split("T")[0]
    : today;

  const nights = nightCount(checkin, checkout);

  useEffect(() => {
    apiRooms.list().then(setApiRoomList).catch(() => {});
  }, []);

  // Pre-select room from ?room=<api_id> URL param, skip room picker step
  useEffect(() => {
    const roomParam = searchParams.get("room");
    if (!roomParam || !apiRoomList) return;
    const found = apiRoomList.find((r) => r.id === parseInt(roomParam, 10));
    if (found) setSelectedRoom(found);
  }, [searchParams, apiRoomList]);

  function go(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setApiError(null);
  }

  async function goFromGuests() {
    setChecking(true);
    if (checkin && checkout) {
      try {
        const avail = await availability.check(checkin, checkout, guests);
        setAvailableIds(new Set(avail.map((r) => r.id)));
      } catch {
        setAvailableIds(null);
      }
    }
    setChecking(false);
    // If room already pre-selected from URL, skip room picker
    go(selectedRoom ? 4 : 3);
  }

  async function handleReserve() {
    if (!selectedRoom) return;
    setSubmitting(true);
    setApiError(null);
    try {
      let token = accessToken;
      if (!token) {
        try {
          token = await signup(name, email, phone, password);
        } catch (e) {
          if (e instanceof ApiError && e.status === 409) {
            token = await login(email, password);
          } else { throw e; }
        }
      }
      if (!token) throw new Error("Authentication failed");

      const booking = await userBookings.create({
        room_id:      selectedRoom.id,
        check_in:     checkin,
        check_out:    checkout,
        payment_mode: paymentMode,
      }, token);

      if (paymentMode === "online") {
        router.push(`/booking/${booking.ref_code}/pay`);
      } else {
        router.push(`/booking/confirmed/${booking.ref_code}`);
      }
    } catch (e) {
      setApiError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = !submitting && !!selectedRoom && (!!user || (!!name && !!email && !!phone && !!password));

  return (
    <div style={{ backgroundColor: "#080806", minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(212,168,67,0.07) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(180,100,50,0.05) 0%, transparent 50%)" }}
      />

      <div className="relative z-10 flex min-h-screen">

        {/* ── LEFT: wizard panel ──────────────────────────────── */}
        <div className="flex flex-col w-full lg:w-[58%] xl:w-[55%] px-8 md:px-16 xl:px-24 pt-28 pb-16">

          {/* back + progress */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group"
              style={{ color: "rgba(200,190,160,0.35)" }}
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mt-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <motion.div
                    className="h-px"
                    style={{ background: s <= step ? gold : "rgba(255,255,255,0.1)" }}
                    animate={{ width: s === step ? 56 : 28 }}
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
          </div>

          {/* ── wizard steps ──────────────────────────────────── */}
          <div className="flex-1">
            <AnimatePresence mode="wait" custom={dir}>

              {/* ── STEP 1: DATES ──────────────────────────────── */}
              {step === 1 && (
                <motion.div key="step1" {...slide(dir)}>
                  <h1
                    className="font-light mb-3 leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem,4.5vw,5.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}
                  >
                    When does your<br />story begin?
                  </h1>
                  <p className="text-base mb-12" style={{ color: "rgba(200,185,150,0.5)" }}>
                    Pick your dates and we&apos;ll take care of the rest.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                    {[
                      { label: "Check-in",  val: checkin,  set: setCheckin,  min: today       },
                      { label: "Check-out", val: checkout, set: setCheckout, min: minCheckout },
                    ].map(({ label, val, set, min }) => (
                      <div key={label}>
                        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(212,168,67,0.55)" }}>{label}</p>
                        <div className="relative flex items-center px-5 py-5" style={fieldBase}>
                          <Calendar size={18} className="mr-4 flex-shrink-0" style={{ color: gold }} />
                          <input
                            type="date"
                            value={val}
                            min={min}
                            onChange={(e) => {
                              set(e.target.value);
                              if (label === "Check-in" && checkout && e.target.value >= checkout) {
                                setCheckout("");
                              }
                            }}
                            className="w-full bg-transparent text-base outline-none"
                            style={{ color: "rgba(240,235,220,0.85)", colorScheme: "dark" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {nights > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-3 px-5 py-3 mb-8"
                      style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.2)" }}
                    >
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

              {/* ── STEP 2: GUESTS ─────────────────────────────── */}
              {step === 2 && (
                <motion.div key="step2" {...slide(dir)}>
                  <h1
                    className="font-light mb-3 leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem,4.5vw,5.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}
                  >
                    Who&apos;s joining<br />your story?
                  </h1>
                  <p className="text-base mb-14" style={{ color: "rgba(200,185,150,0.5)" }}>
                    Tell us how many people are coming along.
                  </p>

                  <div className="flex items-center gap-8 mb-6">
                    <motion.button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-14 h-14 flex items-center justify-center text-2xl"
                      style={{ border: "1px solid rgba(212,168,67,0.25)", color: gold, background: "transparent" }}
                      whileHover={{ scale: 1.1, borderColor: gold }}
                      whileTap={{ scale: 0.9 }}
                    >–</motion.button>

                    <div className="text-center">
                      <motion.p
                        key={guests}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "5rem", color: gold, lineHeight: 1, letterSpacing: "-0.04em" }}
                      >{guests}</motion.p>
                      <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(212,168,67,0.4)" }}>
                        {guests === 1 ? "Guest" : "Guests"}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => setGuests(Math.min(8, guests + 1))}
                      className="w-14 h-14 flex items-center justify-center text-2xl"
                      style={{ border: "1px solid rgba(212,168,67,0.25)", color: gold, background: "transparent" }}
                      whileHover={{ scale: 1.1, borderColor: gold }}
                      whileTap={{ scale: 0.9 }}
                    >+</motion.button>
                  </div>

                  <p className="text-sm mb-10" style={{ color: "rgba(200,185,150,0.35)" }}>
                    {guests === 1
                      ? "Just you. Sounds peaceful."
                      : guests === 2
                      ? "The two of you. Perfect."
                      : guests <= 4
                      ? "A small group. We'll make room."
                      : "A larger party — we'll find the right fit."}
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => go(1)}
                      className="text-xs tracking-widest uppercase px-6 py-4"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,160,0.35)", background: "transparent" }}
                    >
                      Back
                    </button>
                    <motion.button
                      onClick={goFromGuests}
                      disabled={checking}
                      className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase"
                      style={{ background: checking ? "rgba(212,168,67,0.4)" : gold, color: "#080806", border: "none" }}
                      whileHover={checking ? {} : { scale: 1.03 }}
                      whileTap={checking ? {} : { scale: 0.97 }}
                    >
                      {checking ? "Checking…" : <>Continue <ArrowRight size={16} /></>}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: ROOM PICKER ─────────────────────────── */}
              {step === 3 && (
                <motion.div key="step3" {...slide(dir)}>
                  <h1
                    className="font-light mb-3 leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(3rem,4.5vw,5.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}
                  >
                    Choose<br />your room
                  </h1>
                  <p className="text-base mb-8" style={{ color: "rgba(200,185,150,0.5)" }}>
                    {availableIds !== null
                      ? `${availableIds.size} room${availableIds.size !== 1 ? "s" : ""} available for your dates`
                      : `${guests} guest${guests !== 1 ? "s" : ""} · ${nights} ${nights === 1 ? "night" : "nights"}`}
                  </p>

                  {!apiRoomList ? (
                    <div className="flex justify-center py-12">
                      <div className="w-5 h-5 border animate-spin" style={{ borderColor: "rgba(212,168,67,0.3)", borderTopColor: gold }} />
                    </div>
                  ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                    {apiRoomList.map((room) => {
                      const isAvailable = availableIds === null || availableIds.has(room.id);
                      const isSelected  = selectedRoom?.id === room.id;
                      return (
                        <motion.button
                          key={room.id}
                          onClick={() => { if (isAvailable) setSelectedRoom(room); }}
                          className="relative text-left overflow-hidden"
                          style={{
                            background: isSelected ? "rgba(212,168,67,0.08)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? `1px solid ${gold}` : isAvailable ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
                            opacity: isAvailable ? 1 : 0.4,
                            cursor: isAvailable ? "pointer" : "not-allowed",
                          }}
                          whileHover={isAvailable ? { y: -2, transition: { duration: 0.2 } } : {}}
                          whileTap={isAvailable ? { scale: 0.99 } : {}}
                        >
                          {/* Room image */}
                          <div className="relative h-32 overflow-hidden">
                            <div
                              className="w-full h-full"
                              style={{ backgroundImage: `url('${roomImg(room.type)}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                            />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,8,6,0.65) 100%)" }} />
                            {availableIds !== null && isAvailable && (
                              <div className="absolute top-2 right-2 px-2 py-0.5 text-xs" style={{ background: "rgba(60,180,80,0.15)", border: "1px solid rgba(60,180,80,0.3)", color: "rgba(100,200,100,0.9)" }}>
                                Available
                              </div>
                            )}
                            {!isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs tracking-widest uppercase px-3 py-1" style={{ background: "rgba(8,8,6,0.75)", color: "rgba(220,120,60,0.8)", border: "1px solid rgba(220,120,60,0.3)" }}>
                                  Unavailable
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Room info */}
                          <div className="p-3">
                            <div className="flex items-start justify-between mb-1">
                              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.15rem", color: isSelected ? "rgba(245,235,200,0.95)" : "rgba(220,210,185,0.75)" }}>
                                {room.name}
                              </p>
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: gold }} />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs" style={{ color: "rgba(180,170,140,0.45)" }}>
                                {room.type} · max {room.max_guests} guests
                              </p>
                              <p style={{ fontFamily: '"Cormorant Garamond", serif', color: isSelected ? gold : "rgba(212,168,67,0.6)", fontSize: "1.1rem" }}>
                                ${room.price_per_night.toLocaleString()}
                                <span className="text-xs" style={{ color: "rgba(200,185,150,0.35)" }}>/night</span>
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => go(2)}
                      className="text-xs tracking-widest uppercase px-6 py-4"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,160,0.35)", background: "transparent" }}
                    >
                      Back
                    </button>
                    <motion.button
                      onClick={() => go(4)}
                      disabled={!selectedRoom}
                      className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase"
                      style={{ background: selectedRoom ? gold : "rgba(255,255,255,0.05)", color: selectedRoom ? "#080806" : "rgba(255,255,255,0.2)", border: "none", cursor: selectedRoom ? "pointer" : "not-allowed" }}
                      whileHover={selectedRoom ? { scale: 1.03 } : {}}
                      whileTap={selectedRoom ? { scale: 0.97 } : {}}
                    >
                      Continue <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 4: CONFIRM ─────────────────────────────── */}
              {step === 4 && selectedRoom && (
                <motion.div key="step4" {...slide(dir)}>
                  <h1
                    className="font-light mb-6 leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2.5rem,4vw,4.5rem)", color: "rgba(245,235,200,0.95)", letterSpacing: "-0.03em" }}
                  >
                    Confirm your<br />reservation
                  </h1>

                  {/* Room + dates summary */}
                  <div className="flex items-center gap-4 p-4 mb-6" style={{ background: "rgba(10,10,8,0.5)", border: "1px solid rgba(212,168,67,0.12)" }}>
                    <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full" style={{ backgroundImage: `url('${roomImg(selectedRoom.type)}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-light truncate" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.2rem", color: "rgba(245,235,200,0.9)" }}>
                        {selectedRoom.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(200,185,150,0.45)" }}>
                        {checkin} → {checkout} · {nights} {nights === 1 ? "night" : "nights"} · {guests} {guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.5rem", color: gold, lineHeight: 1, letterSpacing: "-0.02em" }}>
                        ${(selectedRoom.price_per_night * nights).toLocaleString()}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(200,185,150,0.35)" }}>total</p>
                    </div>
                  </div>

                  {/* Availability warning */}
                  {availableIds !== null && !availableIds.has(selectedRoom.id) && (
                    <div className="mb-5 px-4 py-3 text-xs" style={{ background: "rgba(220,120,60,0.08)", border: "1px solid rgba(220,120,60,0.25)", color: "rgba(220,150,80,0.9)" }}>
                      This room may not be available for your dates. You can still reserve — our team will confirm shortly.
                    </div>
                  )}

                  {/* Auth block — show user card if logged in, otherwise show signup form */}
                  {user ? (
                    <div className="flex items-center gap-3 p-4 mb-5" style={{ background: "rgba(60,180,80,0.05)", border: "1px solid rgba(60,180,80,0.15)" }}>
                      <CheckCircle size={16} style={{ color: "rgba(80,200,120,0.8)" }} />
                      <div>
                        <p className="text-sm" style={{ color: "rgba(245,235,200,0.85)" }}>{user.name}</p>
                        <p className="text-xs" style={{ color: "rgba(200,185,150,0.45)" }}>{user.email}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="ml-auto text-xs tracking-widest uppercase"
                        style={{ color: "rgba(200,185,150,0.3)", background: "transparent", border: "none", cursor: "pointer" }}
                      >
                        Not you?
                      </button>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Your Name</p>
                          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" className="w-full px-4 py-3 text-sm outline-none" style={fieldBase} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Email Address</p>
                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-sm outline-none" style={fieldBase} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Phone</p>
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+1 555 000 0000" className="w-full px-4 py-3 text-sm outline-none" style={fieldBase} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Password</p>
                          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Min. 8 characters" className="w-full px-4 py-3 text-sm outline-none" style={fieldBase} onFocus={(e) => { e.target.style.borderColor = gold; }} onBlur={(e) => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }} />
                        </div>
                      </div>
                      <p className="text-xs text-center" style={{ color: "rgba(200,185,150,0.35)" }}>
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: "rgba(212,168,67,0.5)", textDecoration: "underline" }}>Sign in</Link>
                      </p>
                    </div>
                  )}

                  {/* Payment mode */}
                  <div className="flex gap-3 mb-2">
                    {(["property", "online"] as PaymentMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setPaymentMode(mode)}
                        className="flex-1 py-3 text-xs tracking-widest uppercase"
                        style={{
                          background: paymentMode === mode ? "rgba(212,168,67,0.12)" : "transparent",
                          border: `1px solid ${paymentMode === mode ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.08)"}`,
                          color: paymentMode === mode ? gold : "rgba(200,190,160,0.35)",
                        }}
                      >
                        {mode === "property" ? "Pay at Property" : "Pay Online"}
                      </button>
                    ))}
                  </div>
                  {paymentMode === "online" && (
                    <p className="text-xs mb-4" style={{ color: "rgba(200,185,150,0.35)" }}>
                      You&apos;ll be taken to our secure payment page after confirming.
                    </p>
                  )}
                  {paymentMode === "property" && (
                    <p className="text-xs mb-4" style={{ color: "rgba(200,185,150,0.35)" }}>
                      Pay when you arrive — no charge today.
                    </p>
                  )}

                  {apiError && (
                    <p className="text-xs mb-4 px-3 py-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>
                      {apiError}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      onClick={handleReserve}
                      disabled={!canSubmit}
                      className="flex-1 flex items-center justify-center gap-3 py-4 text-sm tracking-widest uppercase"
                      style={{ background: canSubmit ? gold : "rgba(255,255,255,0.05)", color: canSubmit ? "#080806" : "rgba(255,255,255,0.2)", border: "none" }}
                      whileHover={canSubmit ? { scale: 1.02 } : {}}
                      whileTap={canSubmit ? { scale: 0.98 } : {}}
                    >
                      {submitting ? "Reserving…" : "Confirm Reservation"}
                    </motion.button>
                    <button
                      onClick={() => go(3)}
                      className="px-8 py-4 text-xs tracking-widest uppercase"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,160,0.35)", background: "transparent" }}
                    >
                      Change Room
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: visual panel (desktop only) ─────────── */}
        <div
          className="hidden lg:flex lg:w-[42%] xl:w-[45%] fixed right-0 top-0 h-screen flex-col justify-end"
          style={{ backgroundColor: "#060401" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step === 4 && selectedRoom ? selectedRoom.id : "default"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: selectedRoom && (step === 3 || step === 4)
                  ? `url('${roomImg(selectedRoom.type)}')`
                  : "url('https://images.unsplash.com/photo-1542718610-a1e3ff82c8b9?w=1200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,6,0.55) 0%, rgba(8,8,6,0.2) 40%, rgba(8,8,6,0.7) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(212,168,67,0.08) 0%, transparent 60%)" }} />

          <div className="relative z-10 p-12 xl:p-16">
            <div className="w-10 h-px mb-6" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
            <p
              className="font-light leading-tight mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(1.8rem, 2.5vw, 2.8rem)", color: "rgba(253,244,211,0.92)", letterSpacing: "-0.02em" }}
            >
              {(step === 3 || step === 4) && selectedRoom ? (
                <>{selectedRoom.name}</>
              ) : (
                <>Log Cabin Luxury,<br />Lofted in Love.</>
              )}
            </p>
            <p className="text-sm" style={{ color: "rgba(220,195,140,0.45)" }}>Brady Inn · Mountain View, CA</p>

            <div className="mt-10 space-y-3">
              {[
                { n: 1, label: "Choose your dates" },
                { n: 2, label: "How many guests?" },
                { n: 3, label: "Choose your room" },
                { n: 4, label: "Confirm & reserve" },
              ].map(({ n, label }) => (
                <div key={n} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: n <= step ? "rgba(212,168,67,0.9)" : "rgba(255,255,255,0.15)" }} />
                  <span className="text-xs tracking-widest uppercase" style={{ color: n === step ? "rgba(212,168,67,0.8)" : n < step ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.2)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
