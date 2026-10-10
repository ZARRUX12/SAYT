"use client";

import React, { useState, useEffect } from "react";
import { Search, Download, Trash2, FileText, CheckCircle2 } from "lucide-react";

interface Brief {
  id: string;
  name: string;
  company: string | null;
  phone: string;
  telegram: string | null;
  email: string | null;
  website: string | null;
  businessType: string | null;
  targetGoal: string | null;
  chosenServices: string | null;
  budget: string | null;
  timeline: string | null;
  description: string;
  fileUrl: string | null;
  status: string;
  createdAt: string;
}

export default function AdminBriefsClient() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBriefs = async () => {
    try {
      const res = await fetch("/api/admin/briefs");
      const data = await res.json();
      setBriefs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefs();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch("/api/admin/briefs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    await fetchBriefs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить бриф?")) return;
    await fetch(`/api/admin/briefs?id=${id}`, { method: "DELETE" });
    await fetchBriefs();
  };

  const filtered = briefs.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      (b.company && b.company.toLowerCase().includes(q)) ||
      b.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            CRM • Технические задания
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
            Брифы ({briefs.length})
          </h1>
        </div>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по клиенту, компании или ТЗ..."
          className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
        />
        <Search className="w-4 h-4 text-metallic absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      <div className="space-y-4">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-base font-bold text-white block">
                  {b.name} {b.company ? `(${b.company})` : ""}
                </span>
                <span className="text-xs font-mono text-metallic/70">
                  Тел: {b.phone} {b.telegram ? `• Telegram: ${b.telegram}` : ""}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={b.status}
                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                  className="bg-black/80 border border-white/20 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:border-gold"
                >
                  <option value="NEW">NEW</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-metallic/60 block text-[10px] uppercase">Сфера</span>
                <span className="text-white font-bold">{b.businessType || "Не указана"}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-metallic/60 block text-[10px] uppercase">Бюджет</span>
                <span className="text-gold font-bold">{b.budget || "По расчету"}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-metallic/60 block text-[10px] uppercase">Сроки</span>
                <span className="text-white font-bold">{b.timeline || "Не указаны"}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-metallic/60 block text-[10px] uppercase">Файл ТЗ</span>
                {b.fileUrl ? (
                  <a
                    href={b.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold underline flex items-center gap-1 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" /> Скачать
                  </a>
                ) : (
                  <span className="text-metallic/50">Отсутствует</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-metallic/60 font-mono block mb-1">
                Описание задачи
              </span>
              <p className="text-xs text-white leading-relaxed whitespace-pre-wrap">
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
