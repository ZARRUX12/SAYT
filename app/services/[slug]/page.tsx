import prisma from "@/lib/db/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Shield, Zap, HelpCircle } from "lucide-react";

import { getServiceGallery } from "@/lib/serviceGalleries";
import { ServiceImageSlider } from "@/components/public/ServiceImageSlider";

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [service, settings] = await Promise.all([
    prisma.service.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    }),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
  ]);

  if (!service || service.status !== "PUBLISHED") {
    notFound();
  }

  const galleryImages = getServiceGallery(
    service.slug,
    service.category?.slug,
    service.coverImage || (service.category?.icon3D ? `/images/services3d/${service.category.icon3D}.png` : null)
  );

  const defaultSettings = settings || {
    siteName: "TARGET PRO",
    phone: "+998932368910",
    telegramUrl: "https://t.me/Mr_Zarrux",
    phoneUrl: "tel:+998932368910",
    logoUrl: "/logo.png",
  };

  let featuresList: string[] = [];
  let workflowList: string[] = [];
  let advantagesList: string[] = [];
  let faqList: Array<{ q: string; a: string }> = [];

  try {
    featuresList = JSON.parse(service.features || "[]");
  } catch {}
  try {
    workflowList = JSON.parse(service.workflow || "[]");
  } catch {}
  try {
    advantagesList = JSON.parse(service.advantages || "[]");
  } catch {}
  try {
    faqList = JSON.parse(service.faq || "[]");
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navbar settings={defaultSettings} />

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-metallic/60 mb-6">
          <Link href="/" className="hover:text-white">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-white">Услуги</Link>
          <span>/</span>
          <Link href={`/services?category=${service.category.slug}`} className="hover:text-gold text-gold/80">
            {service.category.name}
          </Link>
        </div>

        {/* Header Block */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-12 border border-gold/20 shadow-gold relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(255,194,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                  {service.category.name}
                </span>
                {service.priceLabel && service.priceMode !== "HIDDEN" && (
                  <span className="text-xs sm:text-sm font-mono font-bold text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                    {service.priceLabel}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-metallic leading-relaxed max-w-2xl mb-8">
                {service.fullDesc || service.shortDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/calculator?service=${encodeURIComponent(service.title)}`}
                  className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-extrabold uppercase tracking-widest shadow-gold transition-all"
                >
                  ЗАКАЗАТЬ УСЛУГУ
                </Link>
                <a
                  href={defaultSettings.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Консультация в Telegram
                </a>
              </div>
            </div>

            {/* Multi-Image Interactive 3D Showcase (10 photos, smooth left transition) */}
            <div className="w-full lg:w-[460px] shrink-0">
              <ServiceImageSlider
                images={galleryImages}
                title={service.title}
                speed={26}
                aspectRatio="video"
                showMarquee={true}
              />
            </div>
          </div>
        </div>

        {/* Features & What is included */}
        {featuresList.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
              <Zap className="w-5 h-5 text-gold" /> Что входит в услугу
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuresList.map((feat, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-4 flex items-center gap-3 border border-white/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-xs sm:text-sm text-metallic/90">{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Workflow Steps */}
        {workflowList.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-6">
              Как проходит работа
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowList.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-5 border-t-2 border-t-gold"
                >
                  <span className="text-xs font-mono font-bold text-gold opacity-80">
                    ШАГ 0{idx + 1}
                  </span>
                  <p className="text-sm font-semibold mt-2 text-white">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ if available */}
        {faqList.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gold" /> Вопросы и ответы
            </h2>
            <div className="space-y-4">
              {faqList.map((f, idx) => (
                <details
                  key={idx}
                  className="glass-card rounded-xl p-5 border border-white/5"
                >
                  <summary className="font-semibold text-sm cursor-pointer list-none flex justify-between items-center text-white hover:text-gold">
                    <span>{f.q}</span>
                    <span className="text-gold font-mono">+</span>
                  </summary>
                  <p className="text-xs text-metallic leading-relaxed mt-3 pt-3 border-t border-white/5">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA Box */}
        <div className="glass-panel rounded-2xl p-8 text-center border border-gold/30">
          <h3 className="text-2xl font-bold uppercase mb-2">
            Нужен точный расчет по услуге «{service.title}»?
          </h3>
          <p className="text-xs text-metallic mb-6 max-w-md mx-auto">
            Оставьте заявку или перейдите в калькулятор проекта для мгновенного подбора всех необходимых опций.
          </p>
          <Link
            href={`/brief?service=${encodeURIComponent(service.title)}`}
            className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold transition-all"
          >
            ОСТАВИТЬ ЗАЯВКУ
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
