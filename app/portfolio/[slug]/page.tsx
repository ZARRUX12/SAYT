import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const revalidate = 60;

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [project, settings] = await Promise.all([
    prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
      include: { images: true },
    }),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
  ]);

  if (!project) {
    notFound();
  }

  const defaultSettings = settings || {
    siteName: "TARGET PRO",
    phone: "+998932368910",
    telegramUrl: "https://t.me/Mr_Zarrux",
    phoneUrl: "tel:+998932368910",
    logoUrl: "/logo.png",
  };

  let techList: string[] = [];
  try {
    techList = JSON.parse(project.technologies || "[]");
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navbar settings={defaultSettings} />

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono text-metallic/60 mb-6">
          <Link href="/" className="hover:text-white">Главная</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-white">Портфолио</Link>
          <span>/</span>
          <span className="text-gold">{project.title}</span>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-12 border border-gold/30 shadow-gold">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-metallic/70">
              Клиент: {project.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base text-metallic leading-relaxed mb-8">
            {project.shortDesc}
          </p>

          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10 mb-8">
            <Image
              src={project.coverImage || "/logo.png"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-2">
                Задача
              </h3>
              <p className="text-xs sm:text-sm text-metallic leading-relaxed">
                {project.challenge || "Разработка решения для автоматизации и масштабирования бизнеса."}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-2">
                Решение
              </h3>
              <p className="text-xs sm:text-sm text-metallic leading-relaxed">
                {project.solution || "Индивидуальный стек технологий, запуск в срок и техническое сопровождение."}
              </p>
            </div>
          </div>

          {project.results && (
            <div className="mt-8 p-6 rounded-2xl bg-gold/10 border border-gold/30">
              <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
                Результат
              </span>
              <p className="text-sm text-white font-medium">
                {project.results}
              </p>
            </div>
          )}

          {techList.length > 0 && (
            <div className="mt-8">
              <span className="text-xs font-bold uppercase tracking-wider text-metallic block mb-3">
                Использованные технологии:
              </span>
              <div className="flex flex-wrap gap-2">
                {techList.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs text-white font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/brief"
            className="px-10 py-4 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold inline-flex items-center gap-2"
          >
            <span>ОБСУДИТЬ ПОХОЖИЙ ПРОЕКТ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
