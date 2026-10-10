"use client";

import React, { useRef, useState } from "react";
import { Search, Plus, Check, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useProjectBuilder } from "@/lib/context/ProjectBuilderContext";
import { getServiceGallery } from "@/lib/serviceGalleries";
import { ServiceCardSlider } from "./ServiceCardSlider";

interface SmartMarketplaceProps {
  categories: any[];
}

export default function SmartServiceMarketplace({ categories }: SmartMarketplaceProps) {
  const { t, language } = useLanguage();
  const { addItem, hasItem } = useProjectBuilder();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>("all");

  const labels = {
    ru: {
      tag: "ИНТЕРАКТИВНЫЙ МАРКЕТПЛЕЙС",
      title: "Каталог цифровых решений",
      searchPlaceholder: "Поиск: сайт, telegram, AI, SMM, дизайн, реклама...",
      allCategories: "Все направления",
      addToProject: "В ПРОЕКТ",
      added: "ДОБАВЛЕНО",
      exploreDetails: "Подробнее",
      noResults: "По вашему запросу ничего не найдено",
    },
    uz: {
      tag: "INTERAKTIV MARKETPLEY",
      title: "Raqamli yechimlar katalogi",
      searchPlaceholder: "Qidirish: sayt, telegram, AI, SMM, dizayn, reklama...",
      allCategories: "Barcha yo‘nalishlar",
      addToProject: "LOYIHAGA",
      added: "QO‘SHILDI",
      exploreDetails: "Batafsil",
      noResults: "So‘rovingiz bo‘yicha hech narsa topilmadi",
    },
    en: {
      tag: "SMART SERVICE MARKETPLACE",
      title: "Digital Solutions Catalog",
      searchPlaceholder: "Search: website, telegram, AI, SMM, design, ads...",
      allCategories: "All Categories",
      addToProject: "ADD TO PROJECT",
      added: "ADDED",
      exploreDetails: "Explore",
      noResults: "No matching services found",
    },
  }[language];

  // Flatten services list across categories with active language translations
  const allServices: any[] = [];
  categories.forEach((cat) => {
    const localizedCatName = t.categoryMap?.[cat.slug] || cat.name;

    (cat.services || []).forEach((srv: any) => {
      const localizedService = t.serviceMap?.[srv.slug];
      const localizedTitle = localizedService?.title || srv.title;
      const localizedDesc = localizedService?.desc || srv.shortDesc || srv.description;

      allServices.push({
        ...srv,
        title: localizedTitle,
        description: localizedDesc,
        categoryName: localizedCatName,
        categorySlug: cat.slug,
        categoryNumber: cat.number,
        coverImage: srv.coverImage || `/images/services3d/${cat.icon3D || "website"}.png`,
        features: srv.features,
        priceLabel: srv.priceLabel,
        priceValue: srv.priceValue,
      });
    });
  });

  // Filter based on active category & search query
  const filteredServices = allServices.filter((srv) => {
    const matchesCat = activeCategorySlug === "all" || srv.categorySlug === activeCategorySlug;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesQuery =
      srv.title?.toLowerCase().includes(q) ||
      srv.description?.toLowerCase().includes(q) ||
      srv.categoryName?.toLowerCase().includes(q);

    return matchesCat && matchesQuery;
  });

  return (
    <section id="marketplace" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            {labels.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            {labels.title}
          </h2>
        </div>

        {/* Instant Search Bar */}
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-dark/80 border border-white/10 focus:border-gold/60 text-xs text-white placeholder-metallic/50 focus:outline-none transition-all shadow-inner backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-metallic/60 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => setActiveCategorySlug("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
            activeCategorySlug === "all"
              ? "bg-gold text-black border-gold shadow-gold"
              : "bg-white/5 text-metallic/80 border-white/10 hover:border-gold/40 hover:text-white"
          }`}
        >
          {labels.allCategories}
        </button>

        {categories.map((cat) => {
          const catLabel = t.categoryMap?.[cat.slug] || cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategorySlug(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                activeCategorySlug === cat.slug
                  ? "bg-gold text-black border-gold shadow-gold"
                  : "bg-white/5 text-metallic/80 border-white/10 hover:border-gold/40 hover:text-white"
              }`}
            >
              {catLabel}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 rounded-2xl border border-white/10 text-center bg-dark/40">
          <p className="text-sm text-metallic">{labels.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => {
            const added = hasItem(srv.id);

            let featuresList: string[] = [];
            try {
              if (Array.isArray(srv.features)) {
                featuresList = srv.features;
              } else if (typeof srv.features === "string") {
                featuresList = JSON.parse(srv.features);
              }
            } catch {
              featuresList = [];
            }

            return (
              <div
                key={srv.id}
                data-cursor="explore"
                className="glass-card rounded-2xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,194,0,0.15)] bg-gradient-to-b from-white/[0.04] to-transparent"
              >
                {/* Visual Cover Header with 10 photos slider */}
                <ServiceCardSlider
                  images={getServiceGallery(srv.slug, srv.categorySlug, srv.coverImage)}
                  title={srv.title}
                  categoryName={srv.categoryName}
                  priceLabel={srv.priceLabel || srv.priceText}
                />

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-white group-hover:text-gold transition-colors mb-2 line-clamp-1">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-metallic/80 leading-relaxed line-clamp-2 mb-4">
                      {srv.description}
                    </p>

                    {/* Features list */}
                    {featuresList.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-white/5 mb-4">
                        {featuresList.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-metallic/70">
                            <Check className="w-3 h-3 text-gold shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${srv.slug || srv.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-metallic hover:text-white flex items-center gap-1.5 transition"
                    >
                      <span>{labels.exploreDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() =>
                        addItem({
                          id: srv.id,
                          title: srv.title,
                          category: srv.categoryName,
                          price: srv.priceValue || srv.price || 2000000,
                        })
                      }
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                        added
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : "bg-gold hover:bg-gold-400 text-black shadow-gold"
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{labels.added}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{labels.addToProject}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
