import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import HomeClient from "@/components/public/HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  const [
    settings,
    categories,
    solutions,
    portfolio,
    stats,
    owner,
    faqs,
  ] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.serviceCategory.findMany({
      where: { isVisible: true },
      include: { services: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    }),
    prisma.solution.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" },
      take: 3,
    }),
    prisma.portfolioProject.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" },
      take: 6,
    }),
    prisma.statistic.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    prisma.ownerProfile.findUnique({ where: { id: "default" } }),
    prisma.fAQ.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
      take: 4,
    }),
  ]);

  const defaultSettings = settings || {
    siteName: "TARGET PRO",
    slogan: "«ТЕХНОЛОГИИ, РЕКЛАМА И АВТОМАТИЗАЦИЯ ДЛЯ ВАШЕГО БИЗНЕСА»",
    phone: "+998932368910",
    telegram: "@Mr_Zarrux",
    telegramUrl: "https://t.me/Mr_Zarrux",
    phoneUrl: "tel:+998932368910",
    email: "zarrux12@gmail.com",
    address: "Узбекистан г. Самарканд",
    logoUrl: "/logo.png",
  };

  return (
    <main className="min-h-screen bg-transparent text-white relative">
      <Navbar settings={defaultSettings} />

      <HomeClient
        categories={categories}
        solutions={solutions}
        portfolio={portfolio}
        stats={stats}
        owner={owner}
        faqs={faqs}
        defaultSettings={defaultSettings}
      />

      <Footer settings={defaultSettings} />
      <FloatingCTA
        phone={defaultSettings.phone}
        telegramUrl={defaultSettings.telegramUrl}
        phoneUrl={defaultSettings.phoneUrl}
      />
    </main>
  );
}
