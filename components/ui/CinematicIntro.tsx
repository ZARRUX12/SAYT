"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"particles" | "logo" | "airplane" | "exit">("particles");

  useEffect(() => {
    // Check if user already saw intro in current session
    const seen = sessionStorage.getItem("targetpro_intro_seen");
    if (!seen) {
      setVisible(true);

      const t1 = setTimeout(() => setPhase("logo"), 600);
      const t2 = setTimeout(() => setPhase("airplane"), 1300);
      const t3 = setTimeout(() => {
        setPhase("exit");
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("targetpro_intro_seen", "true");
        }, 500);
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, []);

  const handleSkip = () => {
    setVisible(false);
    sessionStorage.setItem("targetpro_intro_seen", "true");
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-auto overflow-hidden select-none"
      >
        {/* Ambient Gold Radial Flare */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

        {/* Dynamic Digital Gold Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                x: (Math.random() - 0.5) * 120,
                y: (Math.random() - 0.5) * 120,
                opacity: [0, 0.8, 0],
                scale: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.03,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#FFC200]"
            />
          ))}
        </div>

        {/* Logo & Monogram reveal */}
        <div className="relative flex flex-col items-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{
              scale: phase === "airplane" ? 1.05 : 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-20 h-20 mb-4 rounded-full border border-gold/40 shadow-gold flex items-center justify-center p-2 bg-dark/60 backdrop-blur-md"
          >
            <Image
              src="/logo.png"
              alt="TARGET PRO"
              fill
              className="object-contain p-2"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <span className="font-black text-2xl tracking-[0.3em] uppercase text-white block">
              TARGET <span className="text-gold">PRO</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-metallic/70 block mt-1">
              Digital Operating System
            </span>
          </motion.div>

          {/* Golden Airplane Trail Streak */}
          {phase === "airplane" && (
            <motion.div
              initial={{ x: -200, y: 100, scale: 0.2, opacity: 0 }}
              animate={{ x: 350, y: -150, scale: 1.2, opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute -top-10 left-0 pointer-events-none"
            >
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-white shadow-[0_0_15px_#FFC200] rotate-[-25deg]" />
            </motion.div>
          )}
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-[11px] font-mono uppercase tracking-widest text-metallic/60 hover:text-gold transition border border-white/10 hover:border-gold/40 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md"
        >
          Skip Intro →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
