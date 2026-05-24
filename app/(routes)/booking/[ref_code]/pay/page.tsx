"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle, AlertTriangle, Lock } from "lucide-react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Footer from "@/components/sections/Footer";
import { stripe as stripeApi, bookings as bookingApi, type BookingRead, ApiError } from "@/lib/api";

const gold = "rgba(212,168,67,0.9)";

// ─── Inner form (must be inside <Elements>) ──────────────────────────────
function CheckoutForm({ booking }: { booking: BookingRead }) {
  const stripe   = useStripe();
  const elements = useElements();
  const router   = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true); setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/lookup?ref=${booking.ref_code}`,
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }

    // Payment succeeded without redirect — go to confirmation
    router.push(`/booking/lookup?ref=${booking.ref_code}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && (
        <div className="px-3 py-2 text-xs flex items-center gap-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>
          <AlertTriangle size={13} /> {error}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
        style={{ background: submitting || !stripe ? "rgba(255,255,255,0.05)" : gold, color: submitting || !stripe ? "rgba(255,255,255,0.2)" : "#080806", border: "none" }}
        whileHover={(!stripe || submitting) ? {} : { scale: 1.01 }}
        whileTap={(!stripe || submitting) ? {} : { scale: 0.99 }}
      >
        <Lock size={13} />
        {submitting ? "Processing…" : `Pay $${booking.total_price.toLocaleString()}`}
      </motion.button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function PayOnlinePage() {
  const params   = useParams<{ ref_code: string }>();
  const refCode  = params?.ref_code ?? "";

  const [booking,       setBooking]       = useState<BookingRead | null>(null);
  const [clientSecret,  setClientSecret]  = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);

  useEffect(() => {
    if (!refCode) return;
    (async () => {
      try {
        // 1. Load booking, stripe config, and create payment intent in parallel
        const [bk, cfg, pay] = await Promise.all([
          bookingApi.get(refCode),
          stripeApi.config(),
          bookingApi.payOnline(refCode),
        ]);
        setBooking(bk);
        setClientSecret(pay.client_secret);

        const pk = cfg.publishable_key ?? cfg.publishableKey;
        if (typeof pk !== "string" || !pk.startsWith("pk_")) {
          throw new Error("Stripe publishable key missing from /stripe/config response");
        }
        setStripePromise(loadStripe(pk));
      } catch (e) {
        setError(e instanceof ApiError ? e.message : (e instanceof Error ? e.message : "Failed to load payment"));
      } finally {
        setLoading(false);
      }
    })();
  }, [refCode]);

  const elementsOptions = useMemo(() => clientSecret ? {
    clientSecret,
    appearance: {
      theme: "night" as const,
      variables: {
        colorPrimary:     "#d4a843",
        colorBackground:  "#0a0a08",
        colorText:        "#f0e8d0",
        colorDanger:      "#dc6464",
        fontFamily:       "system-ui, sans-serif",
        borderRadius:     "0px",
      },
    },
  } : undefined, [clientSecret]);

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(212,168,67,0.05) 0%, transparent 60%)" }} />

      <section className="relative pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <Link href="/my-bookings" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to my bookings
          </Link>

          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(212,168,67,0.6)" }}>Complete Payment</p>
          <h1 className="font-light leading-none mb-8" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Secure Checkout
          </h1>

          {loading && (
            <div className="flex items-center gap-3 py-12">
              <div className="w-5 h-5 border animate-spin" style={{ borderColor: "rgba(212,168,67,0.3)", borderTopColor: gold }} />
              <span className="text-sm" style={{ color: "rgba(200,185,150,0.5)" }}>Preparing your payment…</span>
            </div>
          )}

          {error && (
            <div className="p-6 flex items-start gap-3" style={{ background: "rgba(220,80,80,0.06)", border: "1px solid rgba(220,80,80,0.2)" }}>
              <AlertTriangle size={18} style={{ color: "rgba(220,100,100,0.8)" }} />
              <div>
                <p className="text-sm mb-1" style={{ color: "rgba(245,235,200,0.85)" }}>Cannot start payment</p>
                <p className="text-xs" style={{ color: "rgba(200,185,150,0.5)" }}>{error}</p>
              </div>
            </div>
          )}

          {booking && (booking.payment_status === "paid" || booking.payment_status === "refunded") && (
            <div className="p-6 flex items-start gap-3" style={{ background: "rgba(60,180,80,0.06)", border: "1px solid rgba(60,180,80,0.2)" }}>
              <CheckCircle size={18} style={{ color: "rgba(80,200,120,0.8)" }} />
              <div>
                <p className="text-sm mb-1" style={{ color: "rgba(245,235,200,0.85)" }}>This booking is already {booking.payment_status}</p>
                <p className="text-xs" style={{ color: "rgba(200,185,150,0.5)" }}>No payment is required.</p>
              </div>
            </div>
          )}

          {booking && booking.payment_status === "unpaid" && clientSecret && stripePromise && (
            <>
              {/* Booking summary */}
              <div className="mb-8 p-5 grid grid-cols-2 gap-y-3 gap-x-6" style={{ background: "rgba(13,13,8,0.5)", border: "1px solid rgba(212,168,67,0.12)" }}>
                <div className="col-span-2 pb-3 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>Booking</p>
                  <p className="text-sm" style={{ color: "rgba(245,235,200,0.85)", fontFamily: '"Cormorant Garamond", serif', fontSize: "1.25rem" }}>{booking.room.name}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>Stay</p>
                  <p className="text-xs" style={{ color: "rgba(200,185,150,0.7)" }}>{booking.check_in} → {booking.check_out}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>Nights</p>
                  <p className="text-xs" style={{ color: "rgba(200,185,150,0.7)" }}>{booking.nights}</p>
                </div>
                <div className="col-span-2 pt-3 mt-1 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>Total Due</span>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.75rem", color: gold, letterSpacing: "-0.02em" }}>${booking.total_price.toLocaleString()}</span>
                </div>
              </div>

              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutForm booking={booking} />
              </Elements>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
