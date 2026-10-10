import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ProjectBuilderProvider } from "@/lib/context/ProjectBuilderContext";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgressAndScan from "@/components/ui/ScrollProgressAndScan";
import FloatingProjectTray from "@/components/ui/FloatingProjectTray";
import LuxuryParticleBackground from "@/components/ui/LuxuryParticleBackground";

export const metadata: Metadata = {
  title: "TARGET PRO — Технологии, Реклама и Автоматизация",
  description: "Полноценная цифровая платформа: веб-разработка, AI, Telegram-боты, комплексный SMM, SEO и IT-сервисы.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="bg-black text-white selection:bg-gold selection:text-black antialiased">
        <LuxuryParticleBackground />
        <LanguageProvider>
          <ProjectBuilderProvider>
            <ScrollProgressAndScan />
            <CustomCursor />
            <div className="relative z-[1]">
              {children}
            </div>
            <FloatingProjectTray />
          </ProjectBuilderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
