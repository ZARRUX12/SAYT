"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, Rocket, Zap, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CinematicIntro from "@/components/ui/CinematicIntro";
import MagneticButton from "@/components/ui/MagneticButton";
import SmartServiceMarketplace from "@/components/public/SmartServiceMarketplace";
import InteractiveProcessTimeline from "@/components/public/InteractiveProcessTimeline";
import ClientReviewsMarquee from "@/components/public/ClientReviewsMarquee";

const DigitalGlobe = dynamic(() => import("@/components/3d/DigitalGlobe"), {
  ssr: false,
});

const DigitalUniverse = dynamic(() => import("@/components/3d/DigitalUniverse"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] md:h-[700px] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-metallic font-mono">
          Loading 3D Digital Universe...
        </span>
      </div>
    </div>
  ),
});

interface HomeClientProps {
  categories: any[];
  solutions: any[];
  portfolio: any[];
  stats: any[];
  owner: any;
  faqs: any[];
  defaultSettings: any;
}

export default function HomeClient({
  categories,
  solutions,
  portfolio,
  stats,
  owner,
  faqs,
  defaultSettings,
}: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* 0. CINEMATIC INTRO (First-time visit) */}
      <CinematicIntro />

      {/* 1. HERO SECTION WITH 3D UNIVERSE */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {t.hero.tag}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-4">
            {t.hero.title1} <span className="gold-gradient-text">{t.hero.title2}</span>
          </h1>

          <p className="text-lg sm:text-2xl font-light text-metallic tracking-wide max-w-3xl mx-auto mb-4">
            {t.hero.slogan}
          </p>

          <p className="text-xs sm:text-sm uppercase tracking-widest text-metallic/70 font-mono max-w-2xl mx-auto mb-8">
            {t.hero.subtext}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <MagneticButton>
              <Link
                href="/services"
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-extrabold uppercase tracking-widest shadow-gold hover:shadow-gold-lg transition-all duration-300 block"
              >
                {t.hero.btnServices}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/brief"
                className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-gold/50 text-xs font-bold uppercase tracking-widest transition-all duration-300 block"
              >
                {t.hero.btnDiscuss}
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Real 3D Digital Universe */}
        <div className="relative">
          <DigitalUniverse />
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center justify-center text-metallic/60 -mt-6 relative z-10">
          <span className="text-[10px] uppercase tracking-widest font-mono mb-1">
            {t.hero.scroll}
          </span>
          <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
        </div>
      </section>

      {/* 2. CAPABILITIES STRIP */}
      <section className="py-6 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 text-xs uppercase font-mono tracking-widest text-metallic">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold" /> {t.strip.perf}
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold" /> {t.strip.security}
          </span>
          <span className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-gold" /> {t.strip.turnkey}
          </span>
        </div>
      </section>

      {/* 3. SMART SERVICE MARKETPLACE (with real-time search & project selection) */}
      <SmartServiceMarketplace categories={categories} />

      {/* 4. READY SOLUTIONS PACKAGES */}
      <section className="py-20 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
              {t.solutions.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mt-2">
              {t.solutions.title}
            </h2>
            <p className="text-xs sm:text-sm text-metallic mt-3">
              {t.solutions.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((sol) => {
              let servicesList: string[] = [];
              try {
                servicesList = JSON.parse(sol.services || "[]");
              } catch {}

              return (
                <div
                  key={sol.id}
                  className="glass-panel rounded-2xl p-8 flex flex-col justify-between border border-gold/20 relative group hover:border-gold/60 transition-all duration-300"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                      {t.solutions.package}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-wide mt-1 mb-2">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-gold/90 font-medium mb-4">
                      {sol.subtitle}
                    </p>
                    <p className="text-xs text-metallic leading-relaxed mb-6">
                      {sol.description}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {servicesList.map((sName: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 text-xs text-metallic/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                          <span>{sName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="w-full py-3 rounded-xl bg-gold/15 hover:bg-gold text-gold hover:text-black font-bold text-xs uppercase tracking-wider text-center border border-gold/40 transition-all duration-300"
                  >
                    {t.solutions.details}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PROCESS TIMELINE (Horizontal 6-Step Engineering Standard) */}
      <InteractiveProcessTimeline />

      {/* 6. 3D DIGITAL GLOBE (Global Technology Reach) */}
      <DigitalGlobe />

      {/* 7. GLOBAL CLIENT REVIEWS (Infinite Seamless Marquee) */}
      <ClientReviewsMarquee />

      {/* 8. STATISTICS */}
      {stats.length > 0 && (
        <section className="py-16 border-y border-white/10 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.id} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-black text-gold font-mono">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-white">
                  {s.name}
                </div>
                {s.description && (
                  <p className="text-[11px] text-metallic/70 max-w-xs mx-auto">
                    {s.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. PORTFOLIO PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
              {t.portfolio.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mt-2">
              {t.portfolio.title}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold hover:underline"
          >
            {t.portfolio.allWorks} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolio.map((proj) => (
            <Link
              key={proj.id}
              href={`/portfolio/${proj.slug}`}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col"
            >
              <div className="relative h-48 w-full bg-dark flex items-center justify-center border-b border-white/5 overflow-hidden">
                <Image
                  src={proj.coverImage || "/logo.png"}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest bg-black/80 px-2.5 py-1 rounded-full text-gold border border-gold/30">
                  {proj.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-gold transition-colors mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-metallic line-clamp-2 leading-relaxed">
                    {proj.shortDesc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gold font-bold uppercase tracking-wider">
                  <span>{t.portfolio.explore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. OWNER PROFILE */}
      {owner && (
        <section className="py-20 bg-transparent border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-gold">
                <Image
                  src={owner.photoUrl || "/logo.png"}
                  alt={owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
                  {t.aboutPage.ownerBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  {owner.name} {owner.surname}
                </h3>
                <p className="text-xs font-semibold text-metallic uppercase tracking-wider">
                  {owner.position}
                </p>
                <p className="text-xs sm:text-sm text-metallic leading-relaxed max-w-2xl">
                  {owner.shortBio}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                    href={defaultSettings.telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider shadow-gold"
                  >
                    {t.aboutPage.btnPersonalTg}
                  </a>
                  <Link
                    href="/about"
                    className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-semibold uppercase tracking-wider"
                  >
                    {t.nav.about}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. FAQ */}
      {(t.faq.items && t.faq.items.length > 0) && (
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
              {t.faq.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mt-2">
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((f, idx) => (
              <details
                key={idx}
                className="glass-card rounded-xl p-5 group cursor-pointer border border-white/5 open:border-gold/40 transition-all duration-200"
              >
                <summary className="font-semibold text-sm uppercase tracking-wide flex items-center justify-between text-white list-none group-hover:text-gold transition-colors">
                  <span>{f.question}</span>
                  <ChevronDown className="w-4 h-4 text-gold group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-metallic leading-relaxed mt-4 pt-3 border-t border-white/5">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 10. BOTTOM CTA BANNER */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center glass-panel rounded-3xl p-10 md:p-16 border border-gold/30 shadow-gold">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {t.bottomCta.title1} <span className="gold-gradient-text">{t.bottomCta.title2}</span>
          </h2>
          <p className="text-xs sm:text-sm text-metallic max-w-xl mx-auto mb-8">
            {t.bottomCta.desc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/calculator"
              className="px-8 py-4 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold transition-all duration-300"
            >
              {t.bottomCta.btnCalc}
            </Link>
            <Link
              href="/brief"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              {t.bottomCta.btnBrief}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
