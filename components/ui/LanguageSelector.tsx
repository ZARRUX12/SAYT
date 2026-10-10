"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  const languages: Array<{ code: Language; label: string }> = [
    { code: "ru", label: "RU" },
    { code: "uz", label: "UZ" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-dark/80 border border-gold/30 text-xs font-mono">
      <Globe className="w-3.5 h-3.5 text-gold ml-2 mr-1 shrink-0" />
      <div className="flex items-center">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-2.5 py-1 rounded-full transition-all duration-200 uppercase font-bold tracking-wider ${
              lang === l.code
                ? "bg-gold text-black shadow-gold"
                : "text-metallic hover:text-white"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
