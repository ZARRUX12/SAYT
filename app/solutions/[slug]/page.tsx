import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function SolutionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [solution, settings] = await Promise.all([
    prisma.solution.findUnique({
      where: { slug: params.slug },
    }),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
  ]);

  if (!solution) {
    notFound();
  }

  const defaultSettings = settings || {
    siteName: "TARGET PRO",
    phone: "+998932368910",
    telegramUrl: "https://t.me/Mr_Zarrux",
    phoneUrl: "tel:+998932368910",
    logoUrl: "/logo.png",
  };

  let servicesList: string[] = [];
  let featuresList: string[] = [];
  try {
    servicesList = JSON.parse(solution.services || "[]");
    featuresList = JSON.parse(solution.features || "[]");
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navbar settings={defaultSettings} />

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono text-metallic/60 mb-6">
          <Link href="/" className="hover:text-white">Главная</Link>
          <span>/</span>
          <Link href="/solutions" className="hover:text-white">Решения</Link>
          <span>/</span>
          <span className="text-gold">{solution.title}</span>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-12 border border-gold/30 shadow-gold">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
            Готовое решение
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-3 mb-3">
            {solution.title}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-gold/90 mb-6">
            {solution.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-metallic leading-relaxed mb-8">
            {solution.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/brief?service=${encodeURIComponent(solution.title)}`}
              className="px-8 py-3.5 rounded-full bg-gold text-black text-xs font-black uppercase tracking-widest shadow-gold"
            >
              Заказать решение
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">
              Входящие услуги
            </h3>
            <div className="space-y-3">
              {servicesList.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-metallic">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">
              Преимущества комплекса
            </h3>
            <div className="space-y-3">
              {featuresList.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-metallic">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
