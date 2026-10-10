"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Send,
  Phone,
  Mail,
  X,
  FileText,
  MessageSquare,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FloatingCTAProps {
  phone?: string;
  telegramUrl?: string;
  phoneUrl?: string;
}

type WidgetStep = "MENU" | "QUESTION" | "ANSWER" | "LEAD_FORM" | "SUCCESS";

interface ChatMessage {
  id: string;
  sender: "user" | "operator";
  text: string;
  timestamp: number;
}

export default function FloatingCTA({
  phone = "+998932368910",
  telegramUrl = "https://t.me/Mr_Zarrux",
  phoneUrl = "tel:+998932368910",
}: FloatingCTAProps) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Email requirement explicitly: zarrux12@gmail.con
  const targetEmail = "zarrux12@gmail.con";

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [step, setStep] = useState<WidgetStep>("MENU");

  // Chat state
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAnswerKnown, setIsAnswerKnown] = useState(false);
  const [matchedServiceKey, setMatchedServiceKey] = useState<string>("");

  // Lead Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    question: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Map routes to initial service
  const getContextService = () => {
    if (!pathname) return "";
    if (pathname.includes("/services/landing-pages") || pathname.includes("landing")) return "landing";
    if (pathname.includes("/services/e-commerce") || pathname.includes("ecommerce")) return "ecommerce";
    if (pathname.includes("/services/telegram-bots") || pathname.includes("telegram")) return "botDev";
    if (pathname.includes("/services/full-smm") || pathname.includes("smm")) return "smm";
    if (pathname.includes("/services/targeted-advertising") || pathname.includes("target")) return "target";
    if (pathname.includes("/services/seo-promotion") || pathname.includes("seo")) return "seo";
    if (pathname.includes("/services/logo-branding") || pathname.includes("design") || pathname.includes("brand")) return "design";
    if (pathname.includes("/services/ai-development") || pathname.includes("ai")) return "aiAuto";
    if (pathname.includes("/services/website-development") || pathname.includes("/services")) return "website";
    return "";
  };

  // Restore chat history from sessionStorage on mount
  useEffect(() => {
    try {
      const savedHistory = sessionStorage.getItem("tp_operator_chat_history");
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    } catch {
      // Ignore storage read error
    }

    // Show operator button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      const dismissedTooltip = sessionStorage.getItem("tp_tooltip_dismissed");
      if (!dismissedTooltip) {
        setShowTooltip(true);
        const hideTooltipTimer = setTimeout(() => {
          setShowTooltip(false);
        }, 6000);
        return () => clearTimeout(hideTooltipTimer);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Save chat history
  const updateChatHistory = (newHistory: ChatMessage[]) => {
    setChatHistory(newHistory);
    try {
      sessionStorage.setItem("tp_operator_chat_history", JSON.stringify(newHistory));
    } catch {
      // Ignore storage write error
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (step === "QUESTION" || step === "ANSWER") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [step, chatHistory]);

  // Pre-fill context service
  useEffect(() => {
    const ctx = getContextService();
    if (ctx && !formData.service) {
      setFormData((prev) => ({ ...prev, service: ctx }));
    }
  }, [pathname]);

  // Keyboard accessibility: Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("tp_operator_closed_session", "true");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowTooltip(false);
    sessionStorage.setItem("tp_tooltip_dismissed", "true");
  };

  // Keywords analyzer
  const matchAnswer = (query: string): { known: boolean; text: string; matchedKey: string } => {
    const q = query.toLowerCase();

    // Mapping of keywords to translation FAQ keys and default service
    if (q.includes("лендинг") || q.includes("landing") || q.includes("одностраничн") || q.includes("lending")) {
      return { known: true, text: t.operatorWidget.faqAnswers.landing, matchedKey: "landing" };
    }
    if (q.includes("сайт") || q.includes("веб") || q.includes("sayt") || q.includes("web") || q.includes("портал")) {
      return { known: true, text: t.operatorWidget.faqAnswers.website, matchedKey: "website" };
    }
    if (q.includes("цен") || q.includes("стоимост") || q.includes("прайс") || q.includes("narx") || q.includes("qancha") || q.includes("price") || q.includes("cost")) {
      return { known: true, text: t.operatorWidget.faqAnswers.price, matchedKey: "website" };
    }
    if (q.includes("бот") || q.includes("bot")) {
      return { known: true, text: t.operatorWidget.faqAnswers.bot, matchedKey: "botDev" };
    }
    if (q.includes("telegram") || q.includes("телеграм") || q.includes("тг") || q.includes("tg")) {
      return { known: true, text: t.operatorWidget.faqAnswers.telegram, matchedKey: "telegram" };
    }
    if (q.includes("smm") || q.includes("смм") || q.includes("instagram") || q.includes("инстаграм") || q.includes("инста")) {
      return { known: true, text: t.operatorWidget.faqAnswers.smm, matchedKey: "smm" };
    }
    if (q.includes("таргет") || q.includes("target") || q.includes("реклам") || q.includes("reklama") || q.includes("ads")) {
      return { known: true, text: t.operatorWidget.faqAnswers.target, matchedKey: "target" };
    }
    if (q.includes("seo") || q.includes("сео") || q.includes("трафик") || q.includes("гугл") || q.includes("google")) {
      return { known: true, text: t.operatorWidget.faqAnswers.seo, matchedKey: "seo" };
    }
    if (q.includes("дизайн") || q.includes("лого") || q.includes("design") || q.includes("logo") || q.includes("dizayn") || q.includes("бренд")) {
      return { known: true, text: t.operatorWidget.faqAnswers.design, matchedKey: "design" };
    }
    if (q.includes("бриф") || q.includes("brief") || q.includes("brif") || q.includes("тз")) {
      return { known: true, text: t.operatorWidget.faqAnswers.brief, matchedKey: "website" };
    }
    if (q.includes("ai") || q.includes("ии") || q.includes("интеллект") || q.includes("intellekt") || q.includes("gpt")) {
      return { known: true, text: t.operatorWidget.faqAnswers.ai, matchedKey: "aiAuto" };
    }

    return {
      known: false,
      text: t.operatorWidget.unknownAnswer,
      matchedKey: "other",
    };
  };

  const handleSendQuestion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = currentQuestion.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: "u_" + Date.now(),
      sender: "user",
      text: trimmed,
      timestamp: Date.now(),
    };

    const answerResult = matchAnswer(trimmed);
    const opMsg: ChatMessage = {
      id: "o_" + (Date.now() + 1),
      sender: "operator",
      text: answerResult.text,
      timestamp: Date.now() + 1,
    };

    const newHist = [...chatHistory, userMsg, opMsg];
    updateChatHistory(newHist);

    setIsAnswerKnown(answerResult.known);
    setMatchedServiceKey(answerResult.matchedKey);

    // Pre-fill lead form with this question and matched service
    setFormData((prev) => ({
      ...prev,
      question: trimmed,
      service: prev.service || answerResult.matchedKey || "website",
    }));

    setStep("ANSWER");
  };

  const handleResetToNewQuestion = () => {
    setCurrentQuestion("");
    setStep("QUESTION");
  };

  const handleOpenLeadForm = () => {
    if (!formData.question && currentQuestion) {
      setFormData((prev) => ({ ...prev, question: currentQuestion }));
    }
    if (!formData.service && matchedServiceKey) {
      setFormData((prev) => ({ ...prev, service: matchedServiceKey }));
    }
    setStep("LEAD_FORM");
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = t.operatorWidget.errName;
    }
    const cleanPhone = formData.phone.replace(/[^\d+]/g, "");
    if (!cleanPhone || cleanPhone.length < 7) {
      errs.phone = t.operatorWidget.errPhone;
    }
    if (formData.email && formData.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = t.operatorWidget.errEmail;
      }
    }
    if (!formData.question || formData.question.trim().length < 5) {
      errs.question = t.operatorWidget.errQuestion;
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email ? formData.email.trim() : undefined,
        company: formData.company ? formData.company.trim() : undefined,
        service: formData.service || "Общий запрос",
        question: formData.question.trim(),
        source: "OPERATOR_WIDGET",
        page: pathname || "/",
        language: language,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit lead");
      }

      // Success
      setStep("SUCCESS");
    } catch (err: any) {
      setSubmitError(err.message || t.operatorWidget.errSendFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[9999] pointer-events-auto flex flex-col items-end"
      aria-live="polite"
    >
      {/* Tooltip in closed state */}
      {!isOpen && showTooltip && (
        <div
          role="tooltip"
          className="mb-2.5 mr-1 px-3.5 py-2 rounded-xl bg-[#111111]/95 border border-[#FFC200]/40 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(255,194,0,0.18)] backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>{t.operatorWidget.tooltip}</span>
        </div>
      )}

      {/* Expanded Operator Modal / Mini-Chat */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TARGET PRO AI Consultant"
          className="mb-3 w-[calc(100vw-32px)] sm:w-[350px] max-w-[360px] bg-[#0c0c0c]/98 border border-[#FFC200]/50 rounded-[20px] shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(255,194,0,0.18)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 flex flex-col overflow-hidden max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-white/10 bg-[#141414]/90">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="TARGET PRO"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC200] shadow-[0_0_12px_rgba(255,194,0,0.35)]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#111111] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                    {t.operatorWidget.online}
                  </span>
                </div>
                <div className="text-sm font-bold text-white leading-tight">
                  TARGET PRO
                </div>
                <div className="text-[10px] text-zinc-400">
                  {t.operatorWidget.responseSpeed}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {step !== "MENU" && step !== "SUCCESS" && (
                <button
                  onClick={() => setStep("MENU")}
                  aria-label="Back to menu"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  title={t.operatorWidget.backBtn}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC200]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Section by Step */}
          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar text-xs">
            {/* STEP 1: MAIN MENU */}
            {step === "MENU" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="font-bold text-sm text-white flex items-center gap-1.5 mb-1">
                    <span>{t.operatorWidget.helloTitle}</span>
                  </div>
                  <div className="text-zinc-300 text-xs leading-relaxed">
                    {t.operatorWidget.helloDesc}
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {/* Ask Question */}
                  <button
                    onClick={() => setStep("QUESTION")}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFC200]/20 to-[#FFC200]/10 hover:from-[#FFC200]/30 hover:to-[#FFC200]/20 text-white font-bold border border-[#FFC200]/40 transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-[#FFC200] group-hover:scale-110 transition-transform" />
                      <span>{t.operatorWidget.askQuestion}</span>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC200]" />
                  </button>

                  {/* Fill Brief */}
                  <Link
                    href="/brief"
                    onClick={handleClose}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FFC200]/20 text-white hover:text-[#FFC200] border border-white/10 hover:border-[#FFC200]/40 transition-all duration-200"
                  >
                    <FileText className="w-4 h-4 text-[#FFC200]" />
                    <span className="font-semibold">{t.operatorWidget.fillBrief}</span>
                  </Link>

                  {/* Telegram */}
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FFC200]/20 text-white hover:text-[#FFC200] border border-white/10 hover:border-[#FFC200]/40 transition-all duration-200"
                  >
                    <Send className="w-4 h-4 text-[#FFC200]" />
                    <span className="font-semibold">{t.operatorWidget.writeTelegram}</span>
                  </a>

                  {/* Phone */}
                  <a
                    href={phoneUrl}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FFC200]/20 text-white hover:text-[#FFC200] border border-white/10 hover:border-[#FFC200]/40 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 text-[#FFC200]" />
                    <span className="font-semibold">{t.operatorWidget.callPhone}</span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${targetEmail}`}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FFC200]/20 text-white hover:text-[#FFC200] border border-white/10 hover:border-[#FFC200]/40 transition-all duration-200"
                  >
                    <Mail className="w-4 h-4 text-[#FFC200]" />
                    <span className="font-semibold">{t.operatorWidget.writeEmail}: {targetEmail}</span>
                  </a>
                </div>
              </div>
            )}

            {/* STEP 2: QUESTION INPUT & CHAT HISTORY */}
            {step === "QUESTION" && (
              <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {t.operatorWidget.chatTitle}
                  </span>
                  <button
                    onClick={() => setStep("MENU")}
                    className="text-[11px] text-[#FFC200] hover:underline"
                  >
                    {t.operatorWidget.backBtn}
                  </button>
                </div>

                {/* History */}
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {chatHistory.length === 0 ? (
                    <div className="p-3 rounded-xl bg-white/[0.03] text-zinc-400 text-xs italic leading-relaxed text-center">
                      {t.operatorWidget.helloDesc}
                    </div>
                  ) : (
                    chatHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-[#FFC200] text-black font-semibold rounded-br-none"
                              : "bg-white/[0.08] text-white border border-white/10 rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Input form */}
                <form onSubmit={handleSendQuestion} className="space-y-2 pt-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      placeholder={t.operatorWidget.inputPlaceholder}
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-white/20 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#FFC200] focus:ring-1 focus:ring-[#FFC200]"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!currentQuestion.trim()}
                    className="w-full py-2.5 rounded-xl bg-[#FFC200] hover:bg-[#FFD84A] disabled:opacity-40 disabled:pointer-events-none text-black font-extrabold text-xs tracking-wider transition-all duration-200"
                  >
                    {t.operatorWidget.sendBtn}
                  </button>
                </form>
              </div>
            )}

            {/* STEP 3: ANSWER DISPLAY */}
            {step === "ANSWER" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Operator Response Box */}
                <div className="p-3.5 rounded-xl bg-[#FFC200]/10 border border-[#FFC200]/35 text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FFC200]" />
                    <span className="font-bold text-xs text-[#FFC200]">
                      {t.operatorWidget.chatTitle}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {chatHistory[chatHistory.length - 1]?.text || t.operatorWidget.unknownAnswer}
                  </p>
                </div>

                {/* Action Choices */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleOpenLeadForm}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FFC200] hover:bg-[#FFD84A] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,194,0,0.3)] transition-all hover:scale-[1.01]"
                  >
                    {isAnswerKnown
                      ? t.operatorWidget.yesLeaveLead
                      : t.operatorWidget.leaveLeadBtn}
                  </button>

                  <button
                    onClick={handleResetToNewQuestion}
                    className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.operatorWidget.askAnotherQuestion}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: LEAD FORM */}
            {step === "LEAD_FORM" && (
              <form onSubmit={handleSubmitLead} className="space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {t.operatorWidget.leadFormTitle}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep("ANSWER")}
                    className="text-[11px] text-zinc-400 hover:text-white"
                  >
                    {t.operatorWidget.backBtn}
                  </button>
                </div>

                {submitError && (
                  <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1">
                    {t.operatorWidget.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.operatorWidget.namePlaceholder}
                    className={`w-full px-3 py-2 rounded-lg bg-black border ${
                      formErrors.name ? "border-red-500" : "border-white/20 focus:border-[#FFC200]"
                    } text-white text-xs focus:outline-none`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.name}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1">
                    {t.operatorWidget.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.operatorWidget.phonePlaceholder}
                    className={`w-full px-3 py-2 rounded-lg bg-black border ${
                      formErrors.phone ? "border-red-500" : "border-white/20 focus:border-[#FFC200]"
                    } text-white text-xs focus:outline-none`}
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.phone}</span>
                  )}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t.operatorWidget.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.operatorWidget.emailPlaceholder}
                    className={`w-full px-3 py-2 rounded-lg bg-black border ${
                      formErrors.email ? "border-red-500" : "border-white/20 focus:border-[#FFC200]"
                    } text-white text-xs focus:outline-none`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.email}</span>
                  )}
                </div>

                {/* Company (Optional) */}
                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t.operatorWidget.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t.operatorWidget.companyPlaceholder}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/20 focus:border-[#FFC200] text-white text-xs focus:outline-none"
                  />
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1">
                    {t.operatorWidget.serviceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/20 focus:border-[#FFC200] text-white text-xs focus:outline-none"
                  >
                    <option value="" disabled>
                      {t.operatorWidget.selectServicePlaceholder}
                    </option>
                    <option value="website">{t.operatorWidget.serviceOptions.website}</option>
                    <option value="landing">{t.operatorWidget.serviceOptions.landing}</option>
                    <option value="ecommerce">{t.operatorWidget.serviceOptions.ecommerce}</option>
                    <option value="smm">{t.operatorWidget.serviceOptions.smm}</option>
                    <option value="target">{t.operatorWidget.serviceOptions.target}</option>
                    <option value="seo">{t.operatorWidget.serviceOptions.seo}</option>
                    <option value="telegram">{t.operatorWidget.serviceOptions.telegram}</option>
                    <option value="botDev">{t.operatorWidget.serviceOptions.botDev}</option>
                    <option value="design">{t.operatorWidget.serviceOptions.design}</option>
                    <option value="branding">{t.operatorWidget.serviceOptions.branding}</option>
                    <option value="aiAuto">{t.operatorWidget.serviceOptions.aiAuto}</option>
                    <option value="other">{t.operatorWidget.serviceOptions.other}</option>
                  </select>
                </div>

                {/* Question / Task */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1">
                    {t.operatorWidget.questionLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder={t.operatorWidget.questionPlaceholder}
                    className={`w-full px-3 py-2 rounded-lg bg-black border ${
                      formErrors.question ? "border-red-500" : "border-white/20 focus:border-[#FFC200]"
                    } text-white text-xs focus:outline-none resize-none`}
                  />
                  {formErrors.question && (
                    <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.question}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-[#FFC200] hover:bg-[#FFD84A] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,194,0,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.operatorWidget.submittingLeadBtn}</span>
                    </>
                  ) : (
                    <span>{t.operatorWidget.submitLeadBtn}</span>
                  )}
                </button>
              </form>
            )}

            {/* STEP 5: SUCCESS */}
            {step === "SUCCESS" && (
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    {t.operatorWidget.successTitle}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed px-2">
                    {t.operatorWidget.successDesc}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-xl bg-[#FFC200] hover:bg-[#FFD84A] text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    {t.operatorWidget.closeBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Operator Avatar Trigger */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Закрыть меню оператора" : "Открыть меню оператора TARGET PRO"}
        aria-expanded={isOpen}
        className="relative group p-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC200] focus:ring-offset-2 focus:ring-offset-black transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {/* Soft Golden Outer Pulse Halo */}
        <span className="absolute -inset-1.5 rounded-full bg-[#FFC200]/25 blur-md group-hover:bg-[#FFC200]/45 transition-all animate-pulse" />

        {/* Avatar Image Container */}
        <div className="relative w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full p-[2px] bg-gradient-to-tr from-[#FFC200] via-[#FFD84A] to-[#B8860B] shadow-[0_4px_25px_rgba(255,194,0,0.45)]">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
            alt="TARGET PRO Operator"
            className="w-full h-full rounded-full object-cover"
          />
          {/* Green Online Dot */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#111111] shadow-[0_0_6px_#10B981] animate-pulse" />
        </div>
      </button>
    </div>
  );
}

