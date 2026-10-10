"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Eye, X } from "lucide-react";

interface ServiceImageSliderProps {
  images: string[];
  title?: string;
  autoPlay?: boolean;
  speed?: number; // duration for marquee loop in seconds
  aspectRatio?: "square" | "video" | "wide";
  className?: string;
  showMarquee?: boolean;
}

export function ServiceImageSlider({
  images,
  title = "Service Showcase",
  speed = 28,
  aspectRatio = "video",
  className = "",
  showMarquee = true,
}: ServiceImageSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Ensure we have at least images
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
    <div className={`relative flex flex-col gap-3 group/slider ${className}`}>
      {/* Main Image Display Frame */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
          aspectRatio === "video"
            ? "aspect-video"
            : aspectRatio === "square"
            ? "aspect-square"
            : "h-56 sm:h-72 w-full"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient golden glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,194,0,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Current Active Image with Smooth Slide Entrance from right to left */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center p-2"
          >
            <img
              src={safeImages[activeIdx]}
              alt={`${title} - 0${activeIdx + 1}`}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold/30 text-[10px] font-mono text-gold uppercase tracking-wider font-bold">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>
            {String(activeIdx + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}
          </span>
        </div>

        {/* Zoom / Lightbox Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setLightboxOpen(true);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-gold/50 text-white hover:text-gold transition-all duration-300 opacity-80 hover:opacity-100"
          title="Открыть на весь экран"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Navigation Arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 hover:border-gold/50 text-white hover:text-gold transition-all opacity-0 group-hover/slider:opacity-100"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 hover:border-gold/50 text-white hover:text-gold transition-all opacity-0 group-hover/slider:opacity-100"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Smooth Marquee (Ribbon) sliding infinitely to the LEFT */}
      {showMarquee && safeImages.length > 1 && (
        <div className="relative w-full overflow-hidden py-1 rounded-xl bg-black/40 border border-white/5">
          {/* Gradient edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Infinite sliding track to the left */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            animate={{
              x: isHovered ? undefined : ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: speed,
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
          >
            {/* Duplicated images list to create seamless infinite left-sliding loop */}
            {[...safeImages, ...safeImages].map((imgUrl, i) => {
              const originalIndex = i % safeImages.length;
              const isCurrent = originalIndex === activeIdx;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveIdx(originalIndex);
                  }}
                  className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border transition-all duration-300 ${
                    isCurrent
                      ? "border-gold scale-105 shadow-[0_0_12px_rgba(255,194,0,0.5)] ring-1 ring-gold"
                      : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/40"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Preview ${originalIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] font-mono text-center text-white/80 py-0.5">
                    0{originalIndex + 1}
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-0 right-0 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              <div
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={safeImages[activeIdx]}
                  alt={title}
                  className="max-w-full max-h-full object-contain rounded-2xl border border-gold/30 shadow-[0_0_50px_rgba(255,194,0,0.2)]"
                />

                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-black/70 hover:bg-gold hover:text-black text-white border border-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-black/70 hover:bg-gold hover:text-black text-white border border-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-gold">
                <span>{title}</span>
                <span>•</span>
                <span>
                  {activeIdx + 1} / {safeImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
