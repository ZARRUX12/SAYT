"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface ServiceCardSliderProps {
  images: string[];
  title: string;
  categoryName?: string;
  priceLabel?: string | null;
  className?: string;
}

export function ServiceCardSlider({
  images,
  title,
  categoryName,
  priceLabel,
  className = "",
}: ServiceCardSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const safeImages = images && images.length > 0 ? images : ["/images/services3d/website.png"];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`relative w-full h-44 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden group/card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,194,0,0.14)_0%,transparent_70%)] pointer-events-none group-hover/card:scale-125 transition-transform duration-700" />

      {/* Main active slide - smooth entrance from right to left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <img
            src={safeImages[activeIdx]}
            alt={`${title} - ${activeIdx + 1}`}
            className="w-full h-full object-cover rounded-xl border border-white/10 shadow-lg"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        {categoryName && (
          <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold/30">
            {categoryName}
          </span>
        )}
        {priceLabel && (
          <span className="text-[11px] font-mono font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
            {priceLabel}
          </span>
        )}
      </div>

      {/* Floating 10-Item Photo Counter & Prev/Next for Cards */}
      <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
        <span className="text-[9px] font-mono font-bold text-gold/90 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-gold/20 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-gold" />
          {String(activeIdx + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}
        </span>

        {/* Hover Controls */}
        {safeImages.length > 1 && (
          <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <button
              onClick={handlePrev}
              type="button"
              className="p-1 rounded-full bg-black/80 hover:bg-gold hover:text-black text-white border border-white/20 transition-all"
              title="Предыдущее фото"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="p-1 rounded-full bg-black/80 hover:bg-gold hover:text-black text-white border border-white/20 transition-all"
              title="Следующее фото"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Subtle bottom indicator dots sliding along */}
      <div className="absolute bottom-1 inset-x-0 flex justify-center gap-1 z-20 pointer-events-none">
        {safeImages.slice(0, 10).map((_, dotIdx) => (
          <div
            key={dotIdx}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              dotIdx === activeIdx ? "w-4 bg-gold shadow-[0_0_6px_rgba(255,194,0,0.8)]" : "w-1 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
