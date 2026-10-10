"use client";

import React, { useState } from "react";
import { Sparkles, Save, Check, Sliders, Shield, Zap, RefreshCw, Eye } from "lucide-react";

export default function AdminAnimationsClient() {
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [settings, setSettings] = useState({
    introAnimation: true,
    introDuration: "normal", // short, normal
    digitalParticles: true,
    particlesDensity: "medium", // low, medium, high
    interactiveCursor: true,
    magneticButtons: true,
    magneticStrength: "medium",
    universeOrbit: true,
    orbitSpeed: "normal",
    glassMorphismGlow: true,
    horizontalProcessTimeline: true,
    digitalGlobe3D: true,
    prefersReducedMotionSupport: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    // Persist to local storage or API
    try {
      localStorage.setItem("targetpro_animations_config", JSON.stringify(settings));
    } catch {}

    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-gold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider text-white">
              ANIMATIONS & MOTION UX
            </h1>
            <p className="text-xs text-metallic/70">
              Управление кинематографичным интро, интерактивным курсором, 3D орбитами и эффектами
            </p>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark border border-gold/30 text-gold hover:bg-gold/10 transition text-xs font-bold uppercase tracking-wider"
        >
          <Eye className="w-4 h-4" />
          Смотреть на сайте
        </a>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500/40 rounded-xl flex items-center gap-3 text-green-400 text-sm">
          <Check className="w-5 h-5" />
          <span>Настройки анимаций и визуальных эффектов успешно сохранены!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Intro Experience */}
        <div className="p-6 rounded-2xl bg-dark/40 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold" />
            01. Кинематографичный интро-опыт (Cinematic Intro)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.introAnimation}
                onChange={(e) => setSettings({ ...settings, introAnimation: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Включить Cinematic Intro при первом входе</span>
            </label>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-white">Длительность интро:</span>
              <select
                value={settings.introDuration}
                onChange={(e) => setSettings({ ...settings, introDuration: e.target.value })}
                className="bg-dark border border-white/10 text-gold rounded-lg px-2.5 py-1 text-xs focus:outline-none"
              >
                <option value="short">Short (1.2 сек)</option>
                <option value="normal">Normal (2.1 сек)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Micro-Interactions: Cursor & Magnetic Buttons */}
        <div className="p-6 rounded-2xl bg-dark/40 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-gold" />
            02. Микровзаимодействия (Cursor & Magnetic Buttons)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.interactiveCursor}
                onChange={(e) => setSettings({ ...settings, interactiveCursor: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Кастомный интерактивный курсор (Desktop)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.magneticButtons}
                onChange={(e) => setSettings({ ...settings, magneticButtons: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Магнитный эффект кнопок (Magnetic Buttons)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.glassMorphismGlow}
                onChange={(e) => setSettings({ ...settings, glassMorphismGlow: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Динамические блики карточек (Glass Morphism)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.prefersReducedMotionSupport}
                onChange={(e) => setSettings({ ...settings, prefersReducedMotionSupport: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Поддержка режима Reduced Motion</span>
            </label>
          </div>
        </div>

        {/* 3D Visualizers */}
        <div className="p-6 rounded-2xl bg-dark/40 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" />
            03. 3D-модули и интерактивные сцены
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.universeOrbit}
                onChange={(e) => setSettings({ ...settings, universeOrbit: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">3D Digital Universe в Hero секции</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.digitalGlobe3D}
                onChange={(e) => setSettings({ ...settings, digitalGlobe3D: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Интерактивный 3D Digital Globe</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-gold/30">
              <input
                type="checkbox"
                checked={settings.horizontalProcessTimeline}
                onChange={(e) => setSettings({ ...settings, horizontalProcessTimeline: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Инженерный таймлайн процесса (6 этапов)</span>
            </label>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-white">Плотность цифровых частиц:</span>
              <select
                value={settings.particlesDensity}
                onChange={(e) => setSettings({ ...settings, particlesDensity: e.target.value })}
                className="bg-dark border border-white/10 text-gold rounded-lg px-2.5 py-1 text-xs focus:outline-none"
              >
                <option value="low">Low (Экономичный)</option>
                <option value="medium">Medium (Баланс)</option>
                <option value="high">High (Максимум)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-gold text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gold-light transition flex items-center gap-2 shadow-gold"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Сохранить настройки анимаций
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
