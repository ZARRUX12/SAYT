"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X, Search, Sparkles } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category: Category;
  shortDesc: string;
  fullDesc: string;
  priceMode: string;
  priceLabel: string | null;
  features: string;
  tags: string | null;
  status: string;
  order: number;
  orbitRadius: number;
  animationSpeed: number;
}

export default function AdminServicesClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    try {
      const [resS, resC] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/categories"),
      ]);
      const dataS = await resS.json();
      const dataC = await resC.json();
      setServices(dataS);
      setCategories(dataC);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.categoryId) return;

    setSaving(true);
    const method = editingService.id ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (res.ok) {
        setShowModal(false);
        setEditingService(null);
        await fetchServices();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы действительно хотите удалить эту услугу?")) return;

    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    await fetchServices();
  };

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            CMS Услуг & 3D Окружения
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
            Управление услугами ({services.length})
          </h1>
        </div>

        <button
          onClick={() => {
            setEditingService({
              title: "",
              categoryId: categories[0]?.id || "",
              shortDesc: "",
              fullDesc: "",
              priceMode: "FROM",
              priceLabel: "От 1 000 000 UZS",
              status: "PUBLISHED",
              orbitRadius: 3.5,
              animationSpeed: 1.0,
            });
            setShowModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить услугу</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию или категории..."
          className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
        />
        <Search className="w-4 h-4 text-metallic absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Services Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-mono uppercase tracking-wider text-metallic/70">
                <th className="p-4">Название</th>
                <th className="p-4">Категория</th>
                <th className="p-4">Прайс</th>
                <th className="p-4">3D Орбита</th>
                <th className="p-4">Статус</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs truncate">
                    {s.title}
                  </td>
                  <td className="p-4 text-gold/90 font-medium">
                    {s.category?.name}
                  </td>
                  <td className="p-4 font-mono text-metallic">
                    {s.priceLabel || "Индивидуально"}
                  </td>
                  <td className="p-4 font-mono text-metallic/70">
                    R={s.orbitRadius} • v={s.animationSpeed}x
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-gold/10 text-gold border border-gold/30">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingService(s);
                        setShowModal(true);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                      title="Редактировать"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      title="Удалить"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gold/40 shadow-gold">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="text-lg font-bold uppercase text-white">
                {editingService?.id ? "Редактировать услугу" : "Новая услуга"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-metallic hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                  Название услуги *
                </label>
                <input
                  type="text"
                  required
                  value={editingService?.title || ""}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                    Категория *
                  </label>
                  <select
                    required
                    value={editingService?.categoryId || ""}
                    onChange={(e) => setEditingService({ ...editingService, categoryId: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id} className="bg-dark text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                    Статус
                  </label>
                  <select
                    value={editingService?.status || "PUBLISHED"}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                  >
                    <option value="PUBLISHED" className="bg-dark text-white">Опубликован (PUBLISHED)</option>
                    <option value="DRAFT" className="bg-dark text-white">Черновик (DRAFT)</option>
                    <option value="ARCHIVED" className="bg-dark text-white">В архиве (ARCHIVED)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                    Режим отображения цены
                  </label>
                  <select
                    value={editingService?.priceMode || "FROM"}
                    onChange={(e) => setEditingService({ ...editingService, priceMode: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                  >
                    <option value="FROM" className="bg-dark text-white">От суммы (FROM)</option>
                    <option value="FIXED" className="bg-dark text-white">Фиксированная (FIXED)</option>
                    <option value="CUSTOM" className="bg-dark text-white">Индивидуально (CUSTOM)</option>
                    <option value="HIDDEN" className="bg-dark text-white">Скрыта (HIDDEN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                    Текст ценника
                  </label>
                  <input
                    type="text"
                    value={editingService?.priceLabel || ""}
                    onChange={(e) => setEditingService({ ...editingService, priceLabel: e.target.value })}
                    placeholder="Например: От 2 500 000 UZS"
                    className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* 3D Settings */}
              <div className="p-4 rounded-xl bg-white/5 border border-gold/20 space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 3D Universe Параметры
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-metallic text-[11px] mb-1">Радиус орбиты</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingService?.orbitRadius || 3.5}
                      onChange={(e) => setEditingService({ ...editingService, orbitRadius: parseFloat(e.target.value) })}
                      className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metallic text-[11px] mb-1">Скорость анимации</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingService?.animationSpeed || 1.0}
                      onChange={(e) => setEditingService({ ...editingService, animationSpeed: parseFloat(e.target.value) })}
                      className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                  Краткое описание *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService?.shortDesc || ""}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-metallic uppercase tracking-wider mb-1 font-semibold">
                  Полное описание
                </label>
                <textarea
                  rows={4}
                  value={editingService?.fullDesc || ""}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl p-3 text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-metallic hover:text-white uppercase font-bold text-xs"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-400 text-black uppercase font-extrabold text-xs shadow-gold"
                >
                  {saving ? "Сохранение..." : "Сохранить в базу"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
