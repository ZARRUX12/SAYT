"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, X, ArrowRight, Sparkles, Check, ChevronUp } from "lucide-react";
import { useProjectBuilder } from "@/lib/context/ProjectBuilderContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FloatingProjectTray() {
  const { selectedItems, removeItem, clearProject } = useProjectBuilder();
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (selectedItems.length === 0) return null;

  const labels = {
    ru: {
      trayTitle: "ВАШ ПРОЕКТ",
      servicesCount: "услуг выбрано",
      btnBuild: "СОБРАТЬ ПРОЕКТ →",
      clear: "Очистить",
      emptyNotice: "Выберите услуги для объединения в единую систему",
    },
    uz: {
      trayTitle: "SIZNING LOYIHANGIZ",
      servicesCount: "xizmat tanlandi",
      btnBuild: "LOYIHANI YIG‘ISH →",
      clear: "Tozalash",
      emptyNotice: "Yagona tizimga birlashtirish uchun xizmatlarni tanlang",
    },
    en: {
      trayTitle: "YOUR PROJECT",
      servicesCount: "services selected",
      btnBuild: "BUILD PROJECT →",
      clear: "Clear",
      emptyNotice: "Select services to unite into a single digital ecosystem",
    },
  }[language];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl select-none">
      <div className="glass-panel rounded-2xl p-4 border border-gold/40 shadow-[0_0_35px_rgba(255,194,0,0.3)] backdrop-blur-2xl bg-black/90">
        <div className="flex items-center justify-between gap-3">
          {/* Left info & count */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-gold shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest uppercase text-white">
                  {labels.trayTitle}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gold text-black text-[10px] font-black">
                  {selectedItems.length}
                </span>
              </div>
              <span className="text-[10px] text-metallic/70 font-mono flex items-center gap-1">
                {selectedItems.length} {labels.servicesCount}
                <ChevronUp
                  className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2">
            <Link
              href="/calculator"
              className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-wider shadow-gold transition-all duration-300 flex items-center gap-2"
            >
              <span>{labels.btnBuild}</span>
            </Link>
          </div>
        </div>

        {/* Expandable Selected List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/10 mt-3 pt-3"
            >
              <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-metallic/60 uppercase">
                <span>Включено в систему:</span>
                <button
                  onClick={clearProject}
                  className="hover:text-gold transition text-white/50"
                >
                  {labels.clear}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                  >
                    <Check className="w-3.5 h-3.5 text-gold" />
                    <span className="font-medium">{item.title}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/40 hover:text-white p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
