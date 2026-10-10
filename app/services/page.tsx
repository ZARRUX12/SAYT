import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import ServicesClient from "@/components/public/ServicesClient";

export const revalidate = 60;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [settings, categories, services] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.serviceCategory.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    prisma.service.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const defaultSettings = settings || {
    siteName: "TARGET PRO",
    phone: "+998932368910",
    telegramUrl: "https://t.me/Mr_Zarrux",
    phoneUrl: "tel:+998932368910",
    logoUrl: "/logo.png",
  };

  return (
    <main className="min-h-screen bg-transparent text-white relative">
      <Navbar settings={defaultSettings} />

      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesClient
          categories={categories}
          services={services}
          initialCategory={searchParams.category}
        />
      </div>

      <Footer settings={defaultSettings} />
      <FloatingCTA
        phone={defaultSettings.phone}
        telegramUrl={defaultSettings.telegramUrl}
        phoneUrl={defaultSettings.phoneUrl}
      />
    </main>
  );
}
