"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Bot, Zap, Network, Database, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AIClient() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Futuristic Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-mono uppercase mb-4">
          <Cpu className="w-3.5 h-3.5" /> Next-Gen AI Integration
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
          {t.aiPage.title} <span className="gold-gradient-text">{t.aiPage.highlight}</span>
        </h1>
        <p className="text-sm sm:text-base text-metallic leading-relaxed">
          {t.aiPage.desc}
        </p>
      </div>

      {/* Neural Network Visualization Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div className="glass-panel rounded-2xl p-8 border border-gold/30 shadow-gold group">
          <Bot className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
            {t.aiPage.gptTitle}
          </h3>
          <p className="text-xs text-metallic leading-relaxed mb-4">
            {t.aiPage.gptDesc}
          </p>
          <div className="text-[11px] font-mono text-gold font-semibold">
            Telegram • Web • WhatsApp
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-gold/30 shadow-gold group">
          <Network className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
            {t.aiPage.automationTitle}
          </h3>
          <p className="text-xs text-metallic leading-relaxed mb-4">
            {t.aiPage.automationDesc}
          </p>
          <div className="text-[11px] font-mono text-gold font-semibold">
            API • Webhooks • CRM
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-gold/30 shadow-gold group">
          <Database className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
            {t.aiPage.scrapingTitle}
          </h3>
          <p className="text-xs text-metallic leading-relaxed mb-4">
            {t.aiPage.scrapingDesc}
          </p>
          <div className="text-[11px] font-mono text-gold font-semibold">
            Scraping • Python • Big Data
          </div>
        </div>
      </div>

      {/* AI Capabilities Showcase */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 mb-16">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-center">
          {t.aiPage.archTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gold font-mono font-bold text-sm block mb-1">{t.aiPage.step1}</span>
            <p className="text-xs text-metallic">{t.aiPage.step1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gold font-mono font-bold text-sm block mb-1">{t.aiPage.step2}</span>
            <p className="text-xs text-metallic">{t.aiPage.step2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gold font-mono font-bold text-sm block mb-1">{t.aiPage.step3}</span>
            <p className="text-xs text-metallic">{t.aiPage.step3Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gold font-mono font-bold text-sm block mb-1">{t.aiPage.step4}</span>
            <p className="text-xs text-metallic">{t.aiPage.step4Desc}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/brief?service=AI-разработка"
          className="px-10 py-4 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold inline-flex items-center gap-2"
        >
          <span>{t.aiPage.btnIntegrate}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}