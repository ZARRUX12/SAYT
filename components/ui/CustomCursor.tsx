"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text">("default");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect mobile touch devices to disable custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Detect hover target attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("button, a, input, [role='button'], .cursor-pointer");
      const serviceEl = target.closest("[data-cursor='explore']");
      const portfolioEl = target.closest("[data-cursor='view']");

      if (serviceEl) {
        setCursorVariant("text");
        setCursorText("EXPLORE");
      } else if (portfolioEl) {
        setCursorVariant("text");
        setCursorText("VIEW CASE");
      } else if (clickable) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#FFC200] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: pos.x,
          y: pos.y,
          opacity: cursorVariant === "text" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Outer Dynamic Follower Ring & Glass Badge */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold/60 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center backdrop-blur-[2px]"
        animate={{
          x: pos.x,
          y: pos.y,
          width: cursorVariant === "text" ? 90 : cursorVariant === "hover" ? 44 : 26,
          height: cursorVariant === "text" ? 32 : cursorVariant === "hover" ? 44 : 26,
          borderRadius: cursorVariant === "text" ? "9999px" : "50%",
          backgroundColor:
            cursorVariant === "text"
              ? "rgba(0, 0, 0, 0.85)"
              : cursorVariant === "hover"
              ? "rgba(255, 194, 0, 0.15)"
              : "rgba(255, 194, 0, 0.03)",
          borderColor: cursorVariant === "hover" ? "#FFC200" : "rgba(255, 194, 0, 0.4)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-[10px] font-black tracking-widest text-gold uppercase select-none px-2">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
