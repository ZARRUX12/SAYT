import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import ContactClient from "@/components/public/ContactClient";

export const revalidate = 60;

export default async function ContactPage() {
  const [settings, location, socials] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.location.findUnique({ where: { id: "default" } }),
    prisma.socialLink.findMany({ where: { isVisible: true }, orderBy: { order: "asc" } }),
  ]);

  const defaultSettings = settings || {
    siteName: "TARGET PRO",
    phone: "+998932368910",
    telegram: "@Mr_Zarrux",
    telegramUrl: "https://t.me/Mr_Zarrux",
    phoneUrl: "tel:+998932368910",
    email: "zarrux12@gmail.com",
    address: "Узбекистан г. Самарканд",
    logoUrl: "/logo.png",
  };

  const loc = location || {
    country: "Узбекистан",
    city: "Самарканд",
    address: "г. Самарканд, ТРЦ FAMILY PARK, Narpay ko'chasi",
    latitude: 39.66302,
    longitude: 66.908035,
    googleMapsUrl: "https://maps.google.com/?q=39.66302,66.908035",
    workingHours: "Без выходных, 24/7",
  };

  const routeUrl = loc.googleMapsUrl || `https://maps.google.com/?q=${loc.latitude},${loc.longitude}`;

  return (
    <main className="min-h-screen bg-transparent text-white relative">
      <Navbar settings={defaultSettings} />
      <ContactClient
        defaultSettings={defaultSettings}
        loc={loc}
        socials={socials}
        routeUrl={routeUrl}
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
