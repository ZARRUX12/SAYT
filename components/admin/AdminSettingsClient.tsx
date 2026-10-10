"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Upload, Image as ImageIcon } from "lucide-react";

export default function AdminSettingsClient() {
  const [settings, setSettings] = useState<any>({});
  const [owner, setOwner] = useState<any>({});
  const [location, setLocation] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings || {});
        setOwner(data.owner || {});
        setLocation(data.location || {});
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok) {
        if (targetField === "ownerPhoto") {
          setOwner({ ...owner, photoUrl: json.url });
        } else if (targetField === "logo") {
          setSettings({ ...settings, logoUrl: json.url });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings, owner, location }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-xs text-metallic font-mono">Загрузка параметров системы...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            System Configuration
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
            Настройки сайта и реквизиты
          </h1>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-gold"
        >
          {saving ? (
            <span>Сохранение...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Сохранить изменения</span>
            </>
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Изменения успешно сохранены в базе данных и применены на сайте!</span>
        </div>
      )}

      {/* Block 1: Site Brand & Contact Settings */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h2 className="text-base font-bold uppercase tracking-wide text-gold">
          Основные параметры бренда и связи
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Название компании
            </label>
            <input
              type="text"
              value={settings.siteName || ""}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Слоган бренда
            </label>
            <input
              type="text"
              value={settings.slogan || ""}
              onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Телефон
            </label>
            <input
              type="text"
              value={settings.phone || ""}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Telegram никнейм
            </label>
            <input
              type="text"
              value={settings.telegram || ""}
              onChange={(e) => setSettings({ ...settings, telegram: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Прямая ссылка Telegram (URL)
            </label>
            <input
              type="text"
              value={settings.telegramUrl || ""}
              onChange={(e) => setSettings({ ...settings, telegramUrl: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Email для связи
            </label>
            <input
              type="email"
              value={settings.email || ""}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Block 2: Owner Profile */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h2 className="text-base font-bold uppercase tracking-wide text-gold">
          Профиль основателя (Страница О компании)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Имя и фамилия
            </label>
            <input
              type="text"
              value={owner.name || ""}
              onChange={(e) => setOwner({ ...owner, name: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Должность
            </label>
            <input
              type="text"
              value={owner.position || ""}
              onChange={(e) => setOwner({ ...owner, position: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Фотография основателя
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={owner.photoUrl || ""}
                onChange={(e) => setOwner({ ...owner, photoUrl: e.target.value })}
                className="flex-1 bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none font-mono"
              />
              <label className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer shrink-0">
                Загрузить фото
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, "ownerPhoto")}
                />
              </label>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Краткая биография
            </label>
            <textarea
              rows={2}
              value={owner.shortBio || ""}
              onChange={(e) => setOwner({ ...owner, shortBio: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Block 3: Location and Map */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h2 className="text-base font-bold uppercase tracking-wide text-gold">
          Геолокация и интерактивная карта
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Страна и город
            </label>
            <input
              type="text"
              value={location.city || ""}
              onChange={(e) => setLocation({ ...location, city: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Фактический адрес
            </label>
            <input
              type="text"
              value={location.address || ""}
              onChange={(e) => setLocation({ ...location, address: e.target.value })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Широта (Latitude)
            </label>
            <input
              type="number"
              step="0.000001"
              value={location.latitude || ""}
              onChange={(e) => setLocation({ ...location, latitude: parseFloat(e.target.value) })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-metallic font-semibold uppercase tracking-wider mb-1">
              Долгота (Longitude)
            </label>
            <input
              type="number"
              step="0.000001"
              value={location.longitude || ""}
              onChange={(e) => setLocation({ ...location, longitude: parseFloat(e.target.value) })}
              className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
