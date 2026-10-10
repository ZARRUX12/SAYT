"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Send, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FooterProps {
  settings: {
    siteName?: string;
    slogan?: string;
    phone?: string;
    telegramUrl?: string;
    phoneUrl?: string;
    email?: string;
    address?: string;
    logoUrl?: string;
    copyright?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-gold/15 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gold/30 blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gold/30 shadow-gold">
                <Image
                  src={settings.logoUrl || "/logo.png"}
                  alt="TARGET PRO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                {settings.siteName || "TARGET PRO"}
              </span>
            </div>
            <p className="text-xs text-metallic leading-relaxed">
              {settings.slogan || "«ТЕХНОЛОГИИ, РЕКЛАМА И АВТОМАТИЗАЦИЯ ДЛЯ ВАШЕГО БИЗНЕСА»"}
            </p>
            <div className="pt-2">
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:underline uppercase tracking-wider"
              >
                {t.brief.title} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs text-metallic">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  {t.nav.solutions}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-white transition-colors">
                  {t.nav.ai}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  {t.nav.calculator}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold">
              {t.footer.directionsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-metallic">
              <li>{t.services.all12}</li>
              <li>Web & Mobile Systems</li>
              <li>AI Agents & Automations</li>
              <li>Telegram Bots & WebApps</li>
              <li>Growth & Media Marketing</li>
              <li>IT Systems & Cyber Security</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2 text-xs text-metallic">
              <a
                href={settings.phoneUrl || "tel:+998932368910"}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold shrink-0" />
                {settings.phone || "+998932368910"}
              </a>
              <a
                href={settings.telegramUrl || "https://t.me/Mr_Zarrux"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Send className="w-4 h-4 text-gold shrink-0" />
                Telegram: @Mr_Zarrux
              </a>
              <a
                href={`mailto:${settings.email || "zarrux12@gmail.com"}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold shrink-0" />
                {settings.email || "zarrux12@gmail.com"}
              </a>
              <div className="flex items-center gap-2 text-metallic/80">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                {settings.address || "Узбекистан г. Самарканд"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-metallic/60">
          <p>{settings.copyright || "© TARGET PRO."} {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-gold transition-colors">
              {t.nav.contact}
            </Link>
            <Link href="/admin/login" className="hover:text-gold transition-colors">
              {t.footer.adminPanel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
