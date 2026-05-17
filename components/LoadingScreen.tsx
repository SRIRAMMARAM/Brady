"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const duration = 2800;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const eased = Math.pow(current / steps, 0.6) * 100;
      setProgress(Math.min(Math.round(eased), 100));

      if (current >= steps) {
        clearInterval(timer);
        setPhase("reveal");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 900);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loading"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#050508", zIndex: 10000 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Ambient orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Sigil / Icon */}
            <motion.div
              className="w-16 h-16 mb-6 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#grad1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx="32" cy="32" r="14" stroke="rgba(0,229,255,0.4)" strokeWidth="0.5" />
                <path
                  d="M32 8 L40 28 L32 24 L24 28 Z"
                  fill="url(#grad2)"
                  fillOpacity="0.9"
                />
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#00e5ff" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="24" y1="8" x2="40" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#d4a843" />
                    <stop offset="1" stopColor="#f5d98a" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Brand name */}
            <div className="text-center">
              <motion.p
                className="text-xs tracking-[0.5em] uppercase mb-1"
                style={{ color: "rgba(0,229,255,0.6)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Welcome to
              </motion.p>
              <motion.h1
                className="text-5xl font-light tracking-[0.15em]"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  background: "linear-gradient(135deg, #f0f0f5 0%, #9898a8 40%, #f0f0f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Brady Inn
              </motion.h1>
              <motion.p
                className="text-xs tracking-[0.3em] uppercase mt-2"
                style={{ color: "rgba(212,168,67,0.6)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Where Darkness Meets Divinity
              </motion.p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative w-64 md:w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div
              className="w-full h-px mb-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed, #00e5ff)",
                  boxShadow: "0 0 10px rgba(0,229,255,0.5)",
                  transition: "width 0.02s linear",
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Initialising
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(0,229,255,0.6)" }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
