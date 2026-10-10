"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressAndScan() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setProgress((window.scrollY / total) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1-2px Gold Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-gold via-[#FFF1A8] to-gold shadow-[0_0_12px_#FFC200] transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle Horizontal Golden Scan Line Effect (runs gently across dark space) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-25">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent animate-[scan_14s_ease-in-out_infinite]" />
      </div>
    </>
  );
}
