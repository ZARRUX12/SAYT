"use client";

import React from "react";
import { Phone, Send, Mail, MapPin, Navigation } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ContactClientProps {
  defaultSettings: any;
  loc: any;
  socials: any[];
  routeUrl: string;
}

export default function ContactClient({
  defaultSettings,
  loc,
  socials,
  routeUrl,
}: ContactClientProps) {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
          {t.contact.tag}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mt-2 mb-4">
          {t.contact.title}
        </h1>
        <p className="text-xs sm:text-sm text-metallic">
          {t.contact.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Details */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-gold/20 shadow-gold space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            {t.contact.directTitle}
          </h2>

          <div className="space-y-4">
            <a
              href={defaultSettings.phoneUrl}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-metallic/60 font-mono block">
                  {t.contact.phoneLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-gold transition-colors">
                  {defaultSettings.phone}
                </span>
              </div>
            </a>

            <a
              href={defaultSettings.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-metallic/60 font-mono block">
                  {t.contact.tgLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-gold transition-colors">
                  {defaultSettings.telegram}
                </span>
              </div>
            </a>

            <a
              href={`mailto:${defaultSettings.email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-metallic/60 font-mono block">
                  {t.contact.emailLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-gold transition-colors">
                  {defaultSettings.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-metallic/60 font-mono block">
                  {t.contact.locationLabel}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white block">
                  {loc.address}
                </span>
                <span className="text-[11px] text-metallic/70 font-mono">
                  {loc.workingHours || "Без выходных, 24/7"}
                </span>
              </div>
            </div>
          </div>

          {socials.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-3">
                {t.contact.socialTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 text-xs font-semibold text-white hover:text-gold transition-all"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Map */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                {t.contact.mapTitle}
              </h3>
              <a
                href={routeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider shadow-gold"
              >
                <Navigation className="w-3.5 h-3.5" />
                {t.contact.btnRoute}
              </a>
            </div>
            <p className="text-xs text-metallic mb-6">
              {loc.address} • {loc.workingHours}
            </p>

            {/* Embedded OpenStreetMap */}
            {loc.latitude && loc.longitude ? (
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-white/15 shadow-inner">
                <iframe
                  title="TARGET PRO Location Map"
                  className="w-full h-full pointer-events-auto filter contrast-[1.05] brightness-[0.95]"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${loc.longitude - 0.005}%2C${loc.latitude - 0.003}%2C${loc.longitude + 0.005}%2C${loc.latitude + 0.003}&layer=mapnik&marker=${loc.latitude}%2C${loc.longitude}`}
                />
                <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            ) : (
              <div className="w-full h-80 rounded-2xl bg-dark flex items-center justify-center border border-white/10 text-xs text-metallic">
                Coordinates not specified
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-metallic/70 font-mono">
            GPS: {loc.latitude?.toFixed(6)}, {loc.longitude?.toFixed(6)}
          </div>
        </div>
      </div>
    </div>
  );
}