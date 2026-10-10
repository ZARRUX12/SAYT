"use client";

import React from "react";
import Image from "next/image";
import { Shield, Target, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AboutClientProps {
  owner: any;
  defaultSettings: any;
}

export default function AboutClient({ owner, defaultSettings }: AboutClientProps) {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
          {t.aboutPage.tag}
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mt-2 mb-4">
          {t.aboutPage.title} <span className="gold-gradient-text">PRO</span>
        </h1>
        <p className="text-sm sm:text-base text-metallic leading-relaxed">
          {t.aboutPage.desc}
        </p>
      </div>

      {/* Owner Profile Dynamic from Admin CMS */}
      {owner && (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-20 border border-gold/30 shadow-gold flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 shrink-0 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-gold">
            <Image
              src={owner.photoUrl || "/logo.png"}
              alt={owner.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-center md:text-left flex-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
              {t.aboutPage.ownerBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              {owner.name} {owner.surname}
            </h2>
            <p className="text-xs font-bold text-metallic uppercase tracking-wider">
              {owner.position}
            </p>
            <p className="text-xs sm:text-sm text-metallic leading-relaxed">
              {owner.fullBio || owner.shortBio}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={defaultSettings.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider shadow-gold"
              >
                {t.aboutPage.btnPersonalTg}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Our Values & Approach */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="glass-card rounded-2xl p-8 border border-white/10">
          <Target className="w-8 h-8 text-gold mb-4" />
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
            {t.aboutPage.valuesResult}
          </h3>
          <p className="text-xs text-metallic leading-relaxed">
            {t.aboutPage.valuesResultDesc}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/10">
          <Zap className="w-8 h-8 text-gold mb-4" />
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
            {t.aboutPage.valuesSpeed}
          </h3>
          <p className="text-xs text-metallic leading-relaxed">
            {t.aboutPage.valuesSpeedDesc}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/10">
          <Shield className="w-8 h-8 text-gold mb-4" />
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
            {t.aboutPage.valuesSecurity}
          </h3>
          <p className="text-xs text-metallic leading-relaxed">
            {t.aboutPage.valuesSecurityDesc}
          </p>
        </div>
      </div>
    </div>
  );
}