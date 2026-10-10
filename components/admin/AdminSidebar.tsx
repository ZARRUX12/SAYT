"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  FileText,
  Users,
  Image as ImageIcon,
  Phone,
  Settings,
  ShieldAlert,
  LogOut,
  Sliders,
  ExternalLink,
  Globe,
  Box,
  Sparkles,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const navSections = [
    {
      title: "ГЛАВНОЕ",
      items: [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { title: "3D Сцена (Universe)", href: "/admin/scene3d", icon: Box },
        { title: "Анимации (Motion UX)", href: "/admin/animations", icon: Sparkles },
      ],
    },
    {
      title: "КОНТЕНТ И УСЛУГИ",
      items: [
        { title: "Услуги (3D & Прайс)", href: "/admin/services", icon: Layers },
        { title: "Категории", href: "/admin/categories", icon: Sliders },
        { title: "Решения", href: "/admin/solutions", icon: FolderKanban },
        { title: "Портфолио", href: "/admin/portfolio", icon: FileText },
        { title: "Переводы (RU/UZ/EN)", href: "/admin/translations", icon: Globe },
        { title: "Медиатека", href: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      title: "БИЗНЕС И ЗАЯВКИ",
      items: [
        { title: "Лиды (Заявки)", href: "/admin/leads", icon: Users },
        { title: "Брифы (ТЗ)", href: "/admin/briefs", icon: FileText },
        { title: "Профиль основателя", href: "/admin/owner", icon: Users },
        { title: "Контакты и локация", href: "/admin/contacts", icon: Phone },
      ],
    },
    {
      title: "СИСТЕМА",
      items: [
        { title: "Настройки сайта", href: "/admin/settings", icon: Settings },
        { title: "Журнал аудита", href: "/admin/logs", icon: ShieldAlert },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-dark/95 border-r border-gold/20 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white block">
                TARGET <span className="text-gold">PRO</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-metallic/60 font-mono">
                Admin CMS
              </span>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-metallic hover:text-gold p-1"
            title="Перейти на сайт"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold/70 px-3 block mb-2">
                {section.title}
              </span>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-gold text-black shadow-gold font-bold"
                          : "text-metallic hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}
