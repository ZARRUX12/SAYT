"use client";

import React, { useState } from "react";
import { Upload, Check, Send, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BriefClient({ defaultService }: { defaultService?: string }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    telegram: "",
    email: "",
    website: "",
    businessType: "",
    targetGoal: "",
    budget: "",
    timeline: "",
    description: "",
    chosenServices: defaultService ? [defaultService] : [] as string[],
  });

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (res.ok) {
        setFileUrl(json.url);
        setFileName(file.name);
      } else {
        setError(json.error || "File upload failed");
      }
    } catch {
      setError("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.description) {
      setError(
        t.brief.nameLabel.includes("Mas’ul")
          ? "Iltimos, barcha majburiy maydonlarni to‘ldiring: Ism, Telefon va Vazifa tavsifi"
          : t.brief.nameLabel.includes("Contact")
          ? "Please fill out required fields: Name, Phone, and Project Scope"
          : "Пожалуйста, заполните обязательные поля: Имя, Телефон и Описание задачи"
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fileUrl,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(json.error || "Failed to submit brief");
      }
    } catch {
      setError("Network error while submitting brief");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass-panel rounded-3xl p-10 max-w-2xl mx-auto text-center border border-gold/40 shadow-gold">
        <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-3">
          {t.brief.successTitle}
        </h2>
        <p className="text-xs sm:text-sm text-metallic mb-6 max-w-md mx-auto">
          {t.brief.successDesc}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-3 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider"
        >
          {t.brief.btnAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-gold font-mono">
          {t.brief.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2 mb-4">
          {t.brief.title}
        </h1>
        <p className="text-xs sm:text-sm text-metallic">
          {t.brief.desc}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold/20 shadow-glass max-w-3xl mx-auto space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.nameLabel}
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
            {t.brief.phoneLabel}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+998 90 123 45 67"
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 2: Company & Telegram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.companyLabel}
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.tgLabel}
          </label>
          <input
            type="text"
            value={formData.telegram}
            onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
            placeholder="@username"
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 3: Email & Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.emailLabel}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.webLabel}
          </label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://..."
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 4: Business Type & Target Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.businessTypeLabel}
          </label>
          <input
            type="text"
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.goalLabel}
          </label>
          <input
            type="text"
            value={formData.targetGoal}
            onChange={(e) => setFormData({ ...formData, targetGoal: e.target.value })}
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 5: Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.budgetLabel}
          </label>
          <input
            type="text"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
            {t.brief.timelineLabel}
          </label>
          <input
            type="text"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
          {t.brief.descLabel}
        </label>
        <textarea
          rows={5}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-4 text-xs text-white focus:outline-none leading-relaxed"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
          {t.brief.fileLabel}
        </label>
        <div className="border-2 border-dashed border-white/15 hover:border-gold/40 rounded-2xl p-6 text-center transition-all bg-black/40">
          <input
            type="file"
            id="briefFile"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="briefFile"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-6 h-6 text-gold" />
            <span className="text-xs text-metallic">
              {uploading ? (
                "Uploading..."
              ) : fileName ? (
                <span className="text-gold font-bold">{fileName}</span>
              ) : (
                t.brief.uploadHint
              )}
            </span>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-10 py-4 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold transition-all duration-200 flex items-center gap-2"
        >
          {submitting ? (
            <span>{t.brief.btnSubmitting}</span>
          ) : (
            <>
              <span>{t.brief.btnSubmit}</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
    </div>
  );
}
