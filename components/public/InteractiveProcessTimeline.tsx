"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Compass, Code, Rocket, TrendingUp, Cpu } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function InteractiveProcessTimeline() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  const content = {
    ru: {
      tag: "ЭТАПЫ ВНЕДРЕНИЯ",
      title: "Архитектура цифрового запуска",
      desc: "От комплексного аудита до масштабирования. Строгий инженерный подход к каждому этапу.",
      steps: [
        {
          num: "01",
          title: "АНАЛИЗ И АУДИТ",
          desc: "Глубокое исследование бизнес-процессов, конкурентного ландшафта, юнит-экономики и технических требований.",
          icon: Search,
        },
        {
          num: "02",
          title: "СТРАТЕГИЯ И АРХИТЕКТУРА",
          desc: "Проектирование пользовательских сценариев (CJM), прототипирование, выбор технологического стека и утверждение ТЗ.",
          icon: Compass,
        },
        {
          num: "03",
          title: "РАЗРАБОТКА И ДИЗАЙН",
          desc: "Чистый production-код, премиальная айдентика, обучение AI-моделей и интеграция CRM/ERP систем.",
          icon: Code,
        },
        {
          num: "04",
          title: "РЕЛИЗ И ТЕСТИРОВАНИЕ",
          desc: "Нагрузочное тестирование, проверка безопасности, деплой на защищенную облачную инфраструктуру.",
          icon: Rocket,
        },
        {
          num: "05",
          title: "ОПТИМИЗАЦИЯ И ТРАФИК",
          desc: "Запуск таргетированной рекламы, вывод в топ поисковых систем, непрерывная аналитика конверсий.",
          icon: TrendingUp,
        },
        {
          num: "06",
          title: "АВТОНОМНОСТЬ И МАСШТАБ",
          desc: "Перевод рутины на автономных AI-агентов, увеличение прибыли и поддержка развития 24/7.",
          icon: Cpu,
        },
      ],
    },
    uz: {
      tag: "BOSQICHLI YONDASHUV",
      title: "Raqamli ishga tushirish arxitekturasi",
      desc: "Keng qamrovli tahlildan biznesni kengaytirishgacha bo‘lgan professional muhandislik jarayoni.",
      steps: [
        {
          num: "01",
          title: "TAHLIL VA AUDIT",
          desc: "Biznes jarayonlarini o‘rganish, raqobatchilarni tahlil qilish va aniq texnik talablarni shakllantirish.",
          icon: Search,
        },
        {
          num: "02",
          title: "STRATEGIYA VA ARXITEKTURA",
          desc: "Foydalanuvchi yo‘llarini (CJM) loyihalash, prototip yaratish va optimal texnologik stekni tanlash.",
          icon: Compass,
        },
        {
          num: "03",
          title: "ISHLAB CHIQISH VA DIZAYN",
          desc: "Yuqori sifatli toza kod, brend aydentikasi, sun’iy intellekt modellarini o‘qitish va integratsiya.",
          icon: Code,
        },
        {
          num: "04",
          title: "TESTLASH VA RELIZ",
          desc: "Yuklama va xavfsizlik testlari, xavfsiz server infratuzilmasiga joylashtirish va rasmiy ishga tushirish.",
          icon: Rocket,
        },
        {
          num: "05",
          title: "OPTIMALLASHTIRISH VA TRAFIK",
          desc: "Targeting va kontekst reklama, qidiruv tizimlarida yuqori o‘rinlar va konversiya o‘sishi.",
          icon: TrendingUp,
        },
        {
          num: "06",
          title: "AVTONOM TIZIM VA KENGAYISH",
          desc: "Jarayonlarni AI agentlariga topshirish, barqaror daromad va 24/7 texnik qo‘llab-quvvatlash.",
          icon: Cpu,
        },
      ],
    },
    en: {
      tag: "DEPLOYMENT LIFECYCLE",
      title: "Digital Engineering Architecture",
      desc: "From initial enterprise scoping to global autonomous scaling. Uncompromising precision.",
      steps: [
        {
          num: "01",
          title: "ANALYSIS & AUDIT",
          desc: "In-depth discovery of business pipelines, competitive landscapes, unit economics, and data architecture.",
          icon: Search,
        },
        {
          num: "02",
          title: "STRATEGY & SCOPING",
          desc: "User journey mapping (CJM), high-fidelity prototypes, stack selection, and milestone roadmapping.",
          icon: Compass,
        },
        {
          num: "03",
          title: "ENGINEERING & UI/UX",
          desc: "Modular production-ready code, elite design systems, custom neural model fine-tuning, and CRM/ERP sync.",
          icon: Code,
        },
        {
          num: "04",
          title: "STAGING & LAUNCH",
          desc: "Stress testing, penetration testing, CI/CD pipeline deployment, and zero-downtime production rollout.",
          icon: Rocket,
        },
        {
          num: "05",
          title: "TUNING & TRAFFIC",
          desc: "Performance marketing activation, top search engine indexing, and real-time conversion rate optimization.",
          icon: TrendingUp,
        },
        {
          num: "06",
          title: "AUTONOMY & SCALE",
          desc: "Automating operational overhead via AI agents, rapid revenue acceleration, and 24/7 SLA governance.",
          icon: Cpu,
        },
      ],
    },
  }[language];

  return (
    <section ref={containerRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
          {content.tag}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
          {content.title}
        </h2>
        <p className="text-xs sm:text-sm text-metallic mt-3 leading-relaxed">
          {content.desc}
        </p>
      </div>

      {/* Grid of Steps with Gold Connecting Trail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {content.steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 flex flex-col justify-between group hover:border-gold/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Step Watermark */}
              <span className="absolute -right-2 -bottom-4 text-7xl font-black text-white/[0.03] select-none font-mono pointer-events-none group-hover:text-gold/[0.08] transition-colors">
                {step.num}
              </span>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-gold px-2.5 py-0.5 rounded-full border border-gold/20">
                    STEP {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase tracking-wide text-white group-hover:text-gold transition-colors mb-3">
                  {step.title}
                </h3>

                <p className="text-xs text-metallic/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-metallic/60">
                  Target Pro Standard
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
