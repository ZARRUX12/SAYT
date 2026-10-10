"use client";

import React, { useState, useEffect } from "react";
import { Check, ArrowRight, ArrowLeft, Send, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useProjectBuilder } from "@/lib/context/ProjectBuilderContext";

interface StepOption {
  id: string;
  title: string;
  desc?: string;
  price?: number;
}

export default function CalculatorClient({ initialService }: { initialService?: string }) {
  const { t } = useLanguage();
  const { selectedItems } = useProjectBuilder();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({
    3: initialService ? [initialService] : [],
  });

  // Pre-fill step 3 services if items were added to project tray
  useEffect(() => {
    if (selectedItems.length > 0 && (!answers[3] || answers[3].length === 0)) {
      const mapped = selectedItems.map((item) => {
        const titleLower = item.title.toLowerCase();
        if (titleLower.includes("сайт") || titleLower.includes("web") || titleLower.includes("sayt")) return "site";
        if (titleLower.includes("bot") || titleLower.includes("бот")) return "bot";
        if (titleLower.includes("ai") || titleLower.includes("интеллект") || titleLower.includes("intellekt")) return "ai";
        if (titleLower.includes("smm") || titleLower.includes("соцсет")) return "smm";
        if (titleLower.includes("реклам") || titleLower.includes("target")) return "target";
        if (titleLower.includes("карт") || titleLower.includes("maps")) return "maps";
        if (titleLower.includes("seo")) return "seo";
        if (titleLower.includes("дизайн") || titleLower.includes("dizayn")) return "design";
        return "site";
      });
      setAnswers((prev) => ({ ...prev, 3: Array.from(new Set([...(prev[3] || []), ...mapped])) }));
    }
  }, [selectedItems]);

  const stepsData = [
    {
      step: 1,
      title: t.calculator.step1Title,
      subtitle: t.calculator.step1Sub,
      options: [
        { id: "retail", title: "Retail & E-commerce", desc: "Online stores, marketplaces" },
        { id: "services", title: "Services & HoReCa", desc: "Restaurants, beauty, medical" },
        { id: "b2b", title: "B2B & Manufacturing", desc: "Supply chain, wholesale, industry" },
        { id: "it_start", title: "IT, EdTech & Startups", desc: "EdTech, SaaS, online products" },
        { id: "other", title: "Custom Direction", desc: "Bespoke specifications" },
      ],
    },
    {
      step: 2,
      title: t.calculator.step2Title,
      subtitle: t.calculator.step2Sub,
      options: [
        { id: "sales", title: "Scale Revenue & Lead Generation" },
        { id: "web_bot", title: "Develop High-End Web Platform / Bot" },
        { id: "automation", title: "Integrate AI & Process Automation" },
        { id: "reputation", title: "SERM, Reviews & Brand Reputation" },
        { id: "complex", title: "Full Turnkey Ecosystem Launch" },
      ],
    },
    {
      step: 3,
      title: t.calculator.step3Title,
      subtitle: t.calculator.step3Sub,
      multi: true,
      options: [
        { id: "site", title: "Website Development / Portal", price: 3000000 },
        { id: "bot", title: "Telegram Bot / WebApp", price: 2000000 },
        { id: "ai", title: "AI Assistant & Autonomous Agents", price: 3500000 },
        { id: "smm", title: "Comprehensive SMM & Growth", price: 3000000 },
        { id: "target", title: "Performance Meta Ads", price: 1800000 },
        { id: "maps", title: "Google, 2GIS & Yandex Maps", price: 800000 },
        { id: "seo", title: "SEO Search Optimization", price: 3000000 },
        { id: "design", title: "Branding & Visual Identity", price: 1500000 },
        { id: "it_pc", title: "IT Engineering & Cybersecurity", price: 500000 },
      ],
    },
    {
      step: 4,
      title: t.calculator.step4Title,
      subtitle: t.calculator.step4Sub,
      multi: true,
      options: [
        { id: "tg", title: "Telegram" },
        { id: "inst", title: "Instagram" },
        { id: "web", title: "Google & Organic Search" },
        { id: "geo", title: "Navigation & Geolocation" },
        { id: "tiktok", title: "TikTok & Media Platforms" },
      ],
    },
    {
      step: 5,
      title: t.calculator.step5Title,
      subtitle: t.calculator.step5Sub,
      options: [
        { id: "urgent", title: "Express (up to 7 days)" },
        { id: "medium", title: "Standard (2 - 3 weeks)" },
        { id: "long", title: "Enterprise (1 - 2 months)" },
        { id: "consult", title: "Requires scoping audit" },
      ],
    },
    {
      step: 6,
      title: t.calculator.step6Title,
      subtitle: t.calculator.step6Sub,
      options: [
        { id: "b1", title: "Up to 3 000 000 UZS" },
        { id: "b2", title: "3 000 000 — 7 000 000 UZS" },
        { id: "b3", title: "7 000 000 — 15 000 000 UZS" },
        { id: "b4", title: "Over 15 000 000 UZS" },
        { id: "b5", title: "Custom enterprise scope" },
      ],
    },
  ];

  // Contact form step 7
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelect = (stepIndex: number, optionTitle: string, isMulti?: boolean) => {
    if (isMulti) {
      const current = answers[stepIndex] || [];
      const updated = current.includes(optionTitle)
        ? current.filter((x: string) => x !== optionTitle)
        : [...current, optionTitle];
      setAnswers({ ...answers, [stepIndex]: updated });
    } else {
      setAnswers({ ...answers, [stepIndex]: optionTitle });
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const calculateEstimate = () => {
    const selectedServices: string[] = answers[3] || [];
    let sum = 0;
    const sStep = stepsData[2];
    selectedServices.forEach((sTitle) => {
      const found = sStep.options.find((o) => o.title === sTitle) as StepOption | undefined;
      if (found && found.price) {
        sum += found.price;
      }
    });
    return sum;
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage(t.calculator.nameLabel + ", " + t.calculator.phoneLabel);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          telegram: formData.telegram,
          company: formData.company,
          source: "CALCULATOR",
          details: {
            step1_business: answers[1],
            step2_goal: answers[2],
            step3_services: answers[3],
            step4_platforms: answers[4],
            step5_timeline: answers[5],
            step6_budget: answers[6],
            calculatedEstimate: calculateEstimate(),
          },
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage(json.error || "Error submitting inquiry");
      }
    } catch {
      setErrorMessage("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedTotal = calculateEstimate();

  if (isSuccess) {
    return (
      <div className="glass-panel rounded-3xl p-10 max-w-2xl mx-auto text-center border border-gold/40 shadow-gold">
        <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-3">
          {t.calculator.successTitle}
        </h2>
        <p className="text-xs sm:text-sm text-metallic mb-6 max-w-md mx-auto">
          {t.calculator.successDesc}
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setCurrentStep(1);
            setAnswers({});
          }}
          className="px-6 py-3 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider"
        >
          {t.calculator.btnRecalculate}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
          {t.calculator.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2 mb-4">
          {t.calculator.title}
        </h1>
        <p className="text-xs sm:text-sm text-metallic">
          {t.calculator.desc}
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between gap-1 mb-8 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <button
            key={num}
            onClick={() => num <= currentStep && setCurrentStep(num)}
            className={`flex-1 min-w-[40px] text-center py-2 border-b-2 font-mono text-xs font-bold uppercase transition-all ${
              num === currentStep
                ? "border-gold text-gold"
                : num < currentStep
                ? "border-gold/40 text-metallic"
                : "border-white/10 text-white/20"
            }`}
          >
            {num === 7 ? t.calculator.step7Final.split("•")[1] : `${t.calculator.step} ${num}`}
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold/20 shadow-glass">
        {currentStep <= 6 && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                {t.calculator.step} {currentStep} {t.calculator.of} 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                {stepsData[currentStep - 1].title}
              </h2>
              <p className="text-xs text-metallic mt-1">
                {stepsData[currentStep - 1].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {stepsData[currentStep - 1].options.map((opt) => {
                const isMulti = stepsData[currentStep - 1].multi;
                const isSelected = isMulti
                  ? (answers[currentStep] || []).includes(opt.title)
                  : answers[currentStep] === opt.title;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(currentStep, opt.title, isMulti)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-gold/15 border-gold shadow-gold text-white"
                        : "bg-white/5 border-white/10 hover:border-white/30 text-metallic hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                        {opt.title}
                      </div>
                      {opt.desc && (
                        <div className="text-[11px] text-metallic/70 mt-1">
                          {opt.desc}
                        </div>
                      )}
                      {opt.price && (
                        <div className="text-[11px] font-mono text-gold font-bold mt-2">
                          {t.services.priceFrom} {opt.price.toLocaleString("ru-RU")} UZS
                        </div>
                      )}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-gold border-gold text-black"
                          : "border-white/30"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(currentStep - 1)}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                  currentStep === 1 ? "opacity-30 cursor-not-allowed" : "text-metallic hover:text-white"
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> {t.calculator.btnBack}
              </button>

              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-black text-xs font-extrabold uppercase tracking-wider shadow-gold"
              >
                {t.calculator.btnNext} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Final Step 7: Summary & Contact Form */}
        {currentStep === 7 && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                {t.calculator.step7Final}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                {t.calculator.projectFormed}
              </h2>
              <p className="text-xs text-metallic mt-1">
                {t.calculator.projectFormedDesc}
              </p>
            </div>

            {/* Selected Summary */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-6 mb-8 space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-metallic">{t.calculator.summaryDirection}</span>
                <span className="font-bold text-white">{answers[1] || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-metallic">{t.calculator.summaryGoal}</span>
                <span className="font-bold text-white">{answers[2] || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-metallic">{t.calculator.summaryServices}</span>
                <span className="font-bold text-gold text-right max-w-xs">
                  {answers[3] && answers[3].length > 0 ? answers[3].join(", ") : "Custom"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-metallic">{t.calculator.summaryTimeline}</span>
                <span className="font-bold text-white">{answers[5] || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-metallic">{t.calculator.summaryBudget}</span>
                <span className="font-bold text-white">{answers[6] || "—"}</span>
              </div>
              {estimatedTotal > 0 && (
                <div className="flex justify-between pt-2 text-sm font-mono font-bold">
                  <span className="text-metallic">{t.calculator.summaryEstimate}</span>
                  <span className="text-gold">{t.services.priceFrom} {estimatedTotal.toLocaleString("ru-RU")} UZS</span>
                </div>
              )}
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitLead} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
                    {t.calculator.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
                    {t.calculator.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
                    {t.calculator.tgLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="@username"
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
                    {t.calculator.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="text-xs font-bold uppercase tracking-wider text-metallic hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> {t.calculator.btnBack}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-extrabold uppercase tracking-widest shadow-gold transition-all duration-200 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{t.calculator.btnSubmitting}</span>
                  ) : (
                    <>
                      <span>{t.calculator.btnSubmit}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
