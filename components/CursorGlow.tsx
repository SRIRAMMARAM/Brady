"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const trailConfig = { stiffness: 100, damping: 25, mass: 1 };
  const trailX = useSpring(0, trailConfig);
  const trailY = useSpring(0, trailConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.getAttribute("data-cursor") === "hover";
      setIsHovering(interactive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [x, y, trailX, trailY, isVisible]);

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isHovering ? 0.15 : 0.08,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 229, 255, 1) 0%, rgba(124, 58, 237, 0.4) 60%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            backgroundColor: isHovering ? "#d4a843" : "#00e5ff",
            boxShadow: isHovering
              ? "0 0 12px rgba(212, 168, 67, 0.8), 0 0 30px rgba(212, 168, 67, 0.3)"
              : "0 0 10px rgba(0, 229, 255, 0.9), 0 0 25px rgba(0, 229, 255, 0.4)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>

      {/* Hover ring */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none"
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 9997,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(212, 168, 67, 0.5)",
              animation: "spin-slow 4s linear infinite",
            }}
          />
        </motion.div>
      )}
    </>
  );
}
