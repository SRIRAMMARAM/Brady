"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, LogIn } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { useAuth, ApiError } from "@/contexts/AuthContext";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { FIELD_STYLE } from "@/lib/theme";

const gold = "rgba(212,168,67,0.9)";
const fieldBase = FIELD_STYLE;

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const { login, user } = useAuth();
  const router          = useRouter();
  const searchParams    = useSearchParams();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  // Redirect once we have a user — explicit ?redirect= takes priority, then role-based default
  useEffect(() => {
    if (!user) return;
    const explicit = searchParams.get("redirect");
    router.replace(explicit ?? (user.role === "admin" ? "/admin" : "/my-bookings"));
  }, [user, router, searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      // navigation is handled by the useEffect above once user state updates
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(212,168,67,0.05) 0%, transparent 60%)" }}
      />

      <section className="relative pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group"
            style={{ color: "rgba(152,152,168,0.4)" }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>Sign In</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-light leading-none mb-10"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(3rem, 7vw, 6rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome<br />Back
            </motion.h1>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 p-8 mb-6"
            style={{ background: "rgba(10,10,8,0.6)", border: "1px solid rgba(212,168,67,0.1)" }}
          >
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 text-sm outline-none"
                style={fieldBase}
                onFocus={(e) => { e.target.style.borderColor = gold; }}
                onBlur={(e)  => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }}
              />
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm outline-none"
                style={fieldBase}
                onFocus={(e) => { e.target.style.borderColor = gold; }}
                onBlur={(e)  => { e.target.style.borderColor = "rgba(212,168,67,0.15)"; }}
              />
            </div>

            {error && (
              <p className="text-xs px-3 py-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              style={{ background: loading ? "rgba(255,255,255,0.05)" : gold, color: loading ? "rgba(255,255,255,0.2)" : "#080806", border: "none" }}
              whileHover={loading ? {} : { scale: 1.01 }}
              whileTap={loading  ? {} : { scale: 0.99 }}
            >
              <LogIn size={13} />
              {loading ? "Signing in…" : "Sign In"}
            </motion.button>
          </motion.form>

          <p className="text-xs text-center" style={{ color: "rgba(200,185,150,0.35)" }}>
            New here?{" "}
            <Link href="/booking" style={{ color: "rgba(212,168,67,0.5)", textDecoration: "underline" }}>
              Make a reservation
            </Link>{" "}
            to create an account.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
