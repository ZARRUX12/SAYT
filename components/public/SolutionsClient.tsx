"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SolutionsClientProps {
  solutions: any[];
}

export default function SolutionsClient({ solutions }: SolutionsClientProps) {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
          {t.solutions.tag}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mt-2 mb-4">
          {t.solutions.title}
        </h1>
        <p className="text-xs sm:text-sm text-metallic">
          {t.solutions.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((sol) => {
          let servicesList: string[] = [];
          try {
            servicesList = JSON.parse(sol.services || "[]");
          } catch {}

          return (
            <div
              key={sol.id}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-gold/20 hover:border-gold/60 transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                  {t.solutions.package}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-wide mt-1 mb-2">
                  {sol.title}
                </h3>
                <p className="text-xs font-semibold text-gold/90 mb-4">
                  {sol.subtitle}
                </p>
                <p className="text-xs text-metallic leading-relaxed mb-6">
                  {sol.description}
                </p>

                {servicesList.length > 0 && (
                  <div className="space-y-2 border-t border-white/5 pt-4 mb-6">
                    <span className="text-[11px] font-bold uppercase text-white/80 block mb-2">
                      {t.solutions.includedServices}:
                    </span>
                    {servicesList.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-metallic">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1 hover:underline"
                >
                  {t.solutions.details} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/calculator?service=${encodeURIComponent(sol.title)}`}
                  className="px-4 py-2 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider shadow-gold"
                >
                  {t.solutions.order}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}