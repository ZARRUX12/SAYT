"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSelector from "@/components/ui/LanguageSelector";

interface NavbarProps {
  settings: {
    siteName?: string;
    phone?: string;
    telegramUrl?: string;
    phoneUrl?: string;
    logoUrl?: string;
  };
}

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: t.nav.home, url: "/" },
    { title: t.nav.services, url: "/services" },
    { title: t.nav.solutions, url: "/solutions" },
    { title: t.nav.portfolio, url: "/portfolio" },
    { title: t.nav.ai, url: "/ai" },
    { title: t.nav.about, url: "/about" },
    { title: t.nav.contact, url: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-gold/15 py-3 shadow-glass"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with exact original asset */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gold/30 group-hover:border-gold transition-colors duration-300 shadow-gold">
            <Image
              src={settings.logoUrl || "/logo.png"}
              alt="TARGET PRO Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-widest text-white group-hover:text-gold transition-colors">
              {settings.siteName || "TARGET PRO"}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-metallic/70 font-mono">
              Digital Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "bg-gold/15 text-gold border border-gold/40 shadow-sm"
                    : "text-metallic hover:text-white hover:bg-white/5"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Language Selector */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />

          <Link
            href="/brief"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold hover:bg-gold-400 text-black shadow-gold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {t.nav.discuss}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger and Selector */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-white hover:text-gold focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-gold/20 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide uppercase ${
                  pathname === item.url
                    ? "bg-gold/15 text-gold border border-gold/30"
                    : "text-metallic hover:text-white hover:bg-white/5"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/brief"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold text-black text-xs font-bold uppercase tracking-wider shadow-gold"
            >
              {t.nav.discuss}
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-4 text-xs text-metallic pt-2">
              <a
                href={settings.phoneUrl || "tel:+998932368910"}
                className="flex items-center gap-1 hover:text-gold"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                {settings.phone || "+998932368910"}
              </a>
              <a
                href={settings.telegramUrl || "https://t.me/Mr_Zarrux"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-gold"
              >
                <Send className="w-3.5 h-3.5 text-gold" />
                @Mr_Zarrux
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
