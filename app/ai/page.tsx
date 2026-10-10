import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import AIClient from "@/components/public/AIClient";

export const revalidate = 60;

export default async function AIPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });

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
      <AIClient />
      <Footer settings={defaultSettings} />
      <FloatingCTA
        phone={defaultSettings.phone}
        telegramUrl={defaultSettings.telegramUrl}
        phoneUrl={defaultSettings.phoneUrl}
      />
    </main>
  );
}
