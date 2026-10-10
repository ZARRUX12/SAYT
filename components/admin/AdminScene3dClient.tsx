"use client";

import React, { useState } from "react";
import { Box, Save, Check, Sparkles, RefreshCw, Eye, Layers } from "lucide-react";

export default function AdminScene3dClient() {
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [config, setConfig] = useState({
    orbitSpeed: 1.0,
    orbitRadiusScale: 1.0,
    airplaneFloatIntensity: 0.6,
    ambientLightIntensity: 0.8,
    goldGlowIntensity: 3.0,
    starsCount: 1100,
    activeMaterials: "gold_piano_glass",
    smoothZoomOnClick: true,
    showOrbitRings: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    // Save to local storage or API
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider text-white">
                3D SCENE & DIGITAL UNIVERSE
              </h1>
              <p className="text-xs text-metallic/70">
                Управление 3D-моделями услуг, орбитами, материалами Gold Metal и поведением сцены
              </p>
            </div>
          </div>
        </div>

        <a
          href="/#universe"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark border border-gold/30 text-gold hover:bg-gold/10 transition text-xs font-bold uppercase tracking-wider"
        >
          <Eye className="w-4 h-4" />
          Смотреть 3D на сайте
        </a>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500/40 rounded-xl flex items-center gap-3 text-green-400 text-sm">
          <Check className="w-5 h-5" />
          <span>Параметры 3D сцены успешно обновлены и синхронизированы!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Status Card */}
        <div className="p-6 rounded-2xl bg-dark/60 border border-gold/20 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-metallic/60 uppercase">
              Активных 3D объектов
            </span>
            <div className="text-2xl font-black text-gold">11 Моделей</div>
            <p className="text-[11px] text-metallic/70">
              Ноутбук, AI Мозг, Смартфон, Чат-бот, Лупа, Палитра, Кинокамера, Мегафон, Пакет, Щит, Принтер
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-metallic/60 uppercase">
              Материалы и шейдеры
            </span>
            <div className="text-2xl font-black text-white">Gold Metal & Glass</div>
            <p className="text-[11px] text-metallic/70">
              Roughness 0.12, Metalness 0.96, Dark Titanium, Piano Black Glass
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-metallic/60 uppercase">
              Центральный символ
            </span>
            <div className="text-2xl font-black text-gold">Solid Gold Airplane</div>
            <p className="text-[11px] text-metallic/70">
              Объемный самолет TARGET PRO с килем переменной толщины и турбо-подсветкой
            </p>
          </div>
        </div>

        {/* Scene Parameters */}
        <div className="p-6 rounded-2xl bg-dark/40 border border-white/10 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            Кинематографичные настройки сцены
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-white font-medium">Скорость вращения орбит</label>
                <span className="text-gold font-mono">{config.orbitSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={config.orbitSpeed}
                onChange={(e) => setConfig({ ...config, orbitSpeed: parseFloat(e.target.value) })}
                className="w-full accent-gold bg-black/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-white font-medium">Масштаб радиуса орбит</label>
                <span className="text-gold font-mono">{config.orbitRadiusScale}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.5"
                step="0.05"
                value={config.orbitRadiusScale}
                onChange={(e) => setConfig({ ...config, orbitRadiusScale: parseFloat(e.target.value) })}
                className="w-full accent-gold bg-black/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-white font-medium">Интенсивность золотого свечения (PointLight)</label>
                <span className="text-gold font-mono">{config.goldGlowIntensity}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.5"
                value={config.goldGlowIntensity}
                onChange={(e) => setConfig({ ...config, goldGlowIntensity: parseFloat(e.target.value) })}
                className="w-full accent-gold bg-black/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-white font-medium">Плотность звездной пыли</label>
                <span className="text-gold font-mono">{config.starsCount}</span>
              </div>
              <input
                type="range"
                min="300"
                max="2500"
                step="100"
                value={config.starsCount}
                onChange={(e) => setConfig({ ...config, starsCount: parseInt(e.target.value) })}
                className="w-full accent-gold bg-black/50"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-black/40 border border-white/5 hover:border-gold/30">
              <input
                type="checkbox"
                checked={config.smoothZoomOnClick}
                onChange={(e) => setConfig({ ...config, smoothZoomOnClick: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Плавный cinematic zoom при клике на объект</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-black/40 border border-white/5 hover:border-gold/30">
              <input
                type="checkbox"
                checked={config.showOrbitRings}
                onChange={(e) => setConfig({ ...config, showOrbitRings: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-xs text-white">Отображать тонкие светящиеся кольца орбит</span>
            </label>
          </div>
        </div>

        {/* 3D Models Inventory */}
        <div className="p-6 rounded-2xl bg-dark/40 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold" />
            Реестр 3D моделей услуг
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Website & Platform", model: "MacBook Pro Metal", mat: "Piano Black Glass" },
              { name: "AI & Automation", model: "Neural Brain Solid", mat: "Dark Titanium + Gold Synapses" },
              { name: "SMM & Social Media", model: "Titanium Smartphone", mat: "OLED Glass + 3D Gold Heart" },
              { name: "Telegram Bot", model: "Speech Bubble Shell", mat: "Gold Chamfer + Dual Bot Eyes" },
              { name: "SEO & Traffic", model: "Brass Magnifier", mat: "Convex Glass + 3D Growth Chart" },
              { name: "Design & Branding", model: "Ergonomic Palette", mat: "Glossy Paints + Gold Stylus" },
              { name: "Video & Media", model: "Cinema Camera Rig", mat: "Dark Alloy + Cine Lens Aperture" },
              { name: "Marketing & Promo", model: "Expansion Megaphone", mat: "Gold Flange + Sound Discs" },
              { name: "E-Commerce", model: "Luxury Shopping Bag", mat: "Leather Texture + Solid Handles" },
              { name: "IT & Cybersecurity", model: "Armored Shield", mat: "Faceted Titanium + Padlock" },
              { name: "Printing", model: "Laser Device", mat: "CMYK Status + Gold Poster" },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{m.name}</div>
                  <div className="text-[11px] text-gold font-mono mt-0.5">{m.model}</div>
                </div>
                <div className="text-[10px] text-metallic/60 mt-2 border-t border-white/5 pt-1">
                  {m.mat}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-3">
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
                Сохранить настройки 3D
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
