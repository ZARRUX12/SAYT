"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getServiceGallery } from "@/lib/serviceGalleries";
import { ServiceCardSlider } from "./ServiceCardSlider";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  coverImage?: string | null;
  priceMode: string;
  priceLabel: string | null;
  features: string;
  tags: string | null;
  category: {
    id: string;
    name: string;
    number: string;
    slug: string;
    icon3D?: string | null;
  };
}

interface CategoryItem {
  id: string;
  number: string;
  name: string;
  slug: string;
  icon3D?: string | null;
  description: string | null;
}

interface ServicesClientProps {
  categories: CategoryItem[];
  services: ServiceItem[];
  initialCategory?: string;
}

export default function ServicesClient({
  categories,
  services,
  initialCategory,
}: ServicesClientProps) {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory || "all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredServices = useMemo(() => {
    return services
      .map((s) => {
        const localizedService = t.serviceMap?.[s.slug];
        const localizedCatName = t.categoryMap?.[s.category.slug] || s.category.name;
        return {
          ...s,
          title: localizedService?.title || s.title,
          shortDesc: localizedService?.desc || s.shortDesc,
          category: {
            ...s.category,
            name: localizedCatName,
          },
        };
      })
      .filter((s) => {
        // Category filter
        if (selectedCat !== "all" && s.category.slug !== selectedCat) {
          return false;
        }

        // Search filter
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          const matchTitle = s.title.toLowerCase().includes(query);
          const matchDesc = s.shortDesc.toLowerCase().includes(query);
          const matchTags = s.tags ? s.tags.toLowerCase().includes(query) : false;
          const matchCat = s.category.name.toLowerCase().includes(query);
          return matchTitle || matchDesc || matchTags || matchCat;
        }

        return true;
      });
  }, [services, selectedCat, searchQuery, t]);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
          {t.services.tag}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mt-2 mb-4">
          {t.services.title}
        </h1>
        <p className="text-xs sm:text-sm text-metallic leading-relaxed">
          {t.services.all12}
        </p>
      </div>

      {/* Search Header */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.services.searchPlaceholder}
            className="w-full bg-dark/80 border border-gold/30 focus:border-gold rounded-full px-6 py-4 pl-12 text-sm text-white placeholder-metallic/50 focus:outline-none focus:ring-1 focus:ring-gold shadow-gold transition-all"
          />
          <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        {searchQuery && (
          <p className="text-xs text-metallic mt-2 text-center font-mono">
            {t.services.found} <span className="text-gold font-bold">{filteredServices.length}</span>
          </p>
        )}
      </div>

      {/* Two Column Layout: Categories Left, Services Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Categories */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs uppercase font-bold tracking-widest text-gold font-mono px-3 py-2">
            {t.services.categories}
          </div>

          <button
            onClick={() => setSelectedCat("all")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-between ${
              selectedCat === "all"
                ? "bg-gold text-black shadow-gold font-bold"
                : "text-metallic hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{t.services.allServices}</span>
            <span className="text-[10px] font-mono opacity-80">{services.length}</span>
          </button>

          {categories.map((c) => {
            const count = services.filter((s) => s.category.id === c.id).length;
            const isSelected = selectedCat === c.slug;
            const localizedCatName = t.categoryMap?.[c.slug] || c.name;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.slug)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? "bg-gold text-black shadow-gold font-bold"
                    : "text-metallic hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="text-[10px] font-mono opacity-60 shrink-0">
                    {c.number}
                  </span>
                  <span className="truncate">{localizedCatName}</span>
                </div>
                <span className="text-[10px] font-mono opacity-80 shrink-0">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content: Service Cards Grid */}
        <div className="lg:col-span-3">
          {filteredServices.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <p className="text-base text-metallic mb-2">{t.services.notFound}</p>
              <p className="text-xs text-metallic/60">
                {t.services.notFoundDesc}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => {
                let featuresList: string[] = [];
                try {
                  featuresList = JSON.parse(service.features || "[]");
                } catch {
                  featuresList = [];
                }

                return (
                  <div
                    key={service.id}
                    className="glass-card rounded-2xl flex flex-col justify-between border border-white/10 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,194,0,0.15)] group overflow-hidden transition-all duration-300 bg-gradient-to-b from-white/[0.04] to-transparent"
                  >
                    {/* Top Cover Visual with 10 photos slider */}
                    <ServiceCardSlider
                      images={getServiceGallery(service.slug, service.category?.slug, service.coverImage)}
                      title={service.title}
                      categoryName={service.category.name}
                      priceLabel={service.priceMode !== "HIDDEN" ? service.priceLabel : null}
                    />

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide group-hover:text-gold transition-colors mb-2 line-clamp-1">
                          {service.title}
                        </h3>

                        <p className="text-xs text-metallic/80 leading-relaxed mb-4 line-clamp-2">
                          {service.shortDesc}
                        </p>

                        {featuresList.length > 0 && (
                          <div className="space-y-1.5 border-t border-white/5 pt-3 mb-4">
                            {featuresList.slice(0, 3).map((feat, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-metallic/80">
                                <Check className="w-3 h-3 text-gold shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1 hover:underline"
                      >
                        {t.services.viewDetails} <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/calculator?service=${encodeURIComponent(service.title)}`}
                        className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold text-[11px] font-semibold uppercase tracking-wider transition-all duration-200"
                      >
                        {t.services.addToProject}
                      </Link>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
