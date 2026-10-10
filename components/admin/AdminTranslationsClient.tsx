"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Globe } from "lucide-react";
import { translations, Language } from "@/lib/i18n/translations";

export default function AdminTranslationsClient() {
  const [activeTab, setActiveTab] = useState<Language>("uz");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            i18n System & Content Localization
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
            Управление языками и переводами
          </h1>
          <p className="text-xs text-metallic mt-1">
            Централизованное управление текстами интерфейса для RU, UZ (Latin) и EN.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(["ru", "uz", "en"] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setActiveTab(l)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === l
                  ? "bg-gold text-black shadow-gold"
                  : "bg-white/5 text-metallic hover:text-white"
              }`}
            >
              {l === "ru" ? "Русский (RU)" : l === "uz" ? "O‘zbek (UZ)" : "English (EN)"}
            </button>
          ))}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Переводы успешно синхронизированы в системе!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Navigation Translations */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-2">
            <Globe className="w-4 h-4" /> Меню и навигация ({activeTab.toUpperCase()})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Главная</label>
              <input
                type="text"
                defaultValue={translations[activeTab].nav.home}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Услуги</label>
              <input
                type="text"
                defaultValue={translations[activeTab].nav.services}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Решения</label>
              <input
                type="text"
                defaultValue={translations[activeTab].nav.solutions}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Портфолио</label>
              <input
                type="text"
                defaultValue={translations[activeTab].nav.portfolio}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">AI & Автоматизация</label>
              <input
                type="text"
                defaultValue={translations[activeTab].nav.ai}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Контакты</label>
              <input
                type="text"
                defaultValue={translations[activeTab].nav.contact}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Translations */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gold">
            Главный экран Hero ({activeTab.toUpperCase()})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Бейдж-слоган</label>
              <input
                type="text"
                defaultValue={translations[activeTab].hero.tag}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Слоган компании</label>
              <input
                type="text"
                defaultValue={translations[activeTab].hero.slogan}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Кнопка «Наши услуги»</label>
              <input
                type="text"
                defaultValue={translations[activeTab].hero.btnServices}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">Кнопка «Обсудить проект»</label>
              <input
                type="text"
                defaultValue={translations[activeTab].hero.btnDiscuss}
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-gold"
          >
            <Save className="w-4 h-4" />
            <span>Сохранить переводы ({activeTab.toUpperCase()})</span>
          </button>
        </div>
      </form>
    </div>
  );
}
