"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Sparkles, Filter } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface PortfolioClientProps {
  projects: any[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(18);

  const categories = [
    { key: "ALL", label: language === "uz" ? "Barcha loyihalar" : language === "en" ? "All Projects" : "Все проекты" },
    { key: "WEBSITES", label: language === "uz" ? "Saytlar & E-Commerce" : language === "en" ? "Websites & Stores" : "Сайты и Магазины" },
    { key: "BOTS", label: language === "uz" ? "Telegram Botlar" : language === "en" ? "Telegram Bots" : "Telegram-боты" },
    { key: "SOFTWARE", label: language === "uz" ? "Dasturiy ta'minot" : language === "en" ? "Software & CRM" : "ПО и Сервисы" },
    { key: "AI", label: language === "uz" ? "AI & Avtomatizatsiya" : language === "en" ? "AI & Machine Learning" : "AI и Нейросети" },
    { key: "SMM", label: language === "uz" ? "SMM & Reklama" : language === "en" ? "SMM & Marketing" : "SMM и Маркетинг" },
    { key: "DESIGN", label: language === "uz" ? "Brending & Dizayn" : language === "en" ? "Branding & UI/UX" : "Дизайн и Брендбук" },
    { key: "VIDEO", label: language === "uz" ? "Video & Motion" : language === "en" ? "Video & 3D Motion" : "Видео и Моушн" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.portfolio.tag} ({projects.length})</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-1 mb-4">
          {t.portfolio.title}
        </h1>
        <p className="text-xs sm:text-sm text-metallic max-w-2xl mx-auto leading-relaxed">
          {t.portfolio.desc}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-metallic/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={
              language === "uz"
                ? "Loyiha yoki mijoz nomi bo‘yicha qidirish..."
                : language === "en"
                ? "Search by project or client name..."
                : "Поиск по названию проекта или клиенту..."
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(18);
            }}
            className="w-full bg-[#111111]/80 border border-white/10 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-metallic/50 focus:outline-none focus:border-gold/60 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const count =
              cat.key === "ALL"
                ? projects.length
                : projects.filter((p) => p.category === cat.key).length;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setVisibleCount(18);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(255,194,0,0.3)]"
                    : "bg-white/5 text-metallic/80 border-white/10 hover:border-gold/40 hover:text-white"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {displayedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((proj) => (
            <Link
              key={proj.id}
              href={`/portfolio/${proj.slug}`}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col border border-white/10 hover:border-gold/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(255,194,0,0.15)] bg-gradient-to-b from-[#14100D]/90 to-[#0A0806]/90"
            >
              <div className="relative h-56 w-full bg-dark flex items-center justify-center overflow-hidden border-b border-white/5">
                <Image
                  src={proj.coverImage || "/logo.png"}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-gold border border-gold/30 font-bold">
                  {proj.category}
                </span>
                <span className="absolute top-4 right-4 text-[10px] font-mono text-metallic/70 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  #{proj.order}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-metallic/70 font-mono block mb-1 truncate">
                    {t.portfolio.client}: <strong className="text-white">{proj.client}</strong>
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-gold transition-colors mb-2 line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-metallic line-clamp-3 leading-relaxed mb-4">
                    {proj.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gold font-bold uppercase tracking-wider">
                  <span>{t.portfolio.explore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl border border-white/10 max-w-md mx-auto">
          <Filter className="w-10 h-10 text-gold/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold uppercase text-white mb-2">
            {language === "uz" ? "Loyihalar topilmadi" : language === "en" ? "No Projects Found" : "Проекты не найдены"}
          </h3>
          <p className="text-xs text-metallic mb-6">
            {language === "uz"
              ? "Qidiruv so‘zini o‘zgartiring yoki barcha kategoriyalarni tanlang."
              : language === "en"
              ? "Try changing your search term or selecting all categories."
              : "Попробуйте изменить поисковый запрос или выбрать все категории."}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase hover:bg-gold hover:text-black transition-all"
          >
            {language === "uz" ? "Filtrni tozalash" : language === "en" ? "Reset Filters" : "Сбросить фильтры"}
          </button>
        </div>
      )}

      {/* Load More Button */}
      {displayedProjects.length < filteredProjects.length && (
        <div className="mt-14 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 18)}
            className="px-8 py-3.5 rounded-full bg-gold/10 hover:bg-gold border border-gold/40 hover:border-gold text-gold hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold inline-flex items-center gap-2 group"
          >
            <span>
              {language === "uz"
                ? `Yana ko‘rsatish (${filteredProjects.length - displayedProjects.length} ta qoldi)`
                : language === "en"
                ? `Load More (${filteredProjects.length - displayedProjects.length} remaining)`
                : `Показать еще (${filteredProjects.length - displayedProjects.length} осталось)`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}