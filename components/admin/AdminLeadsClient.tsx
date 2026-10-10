"use client";

import React, { useState, useEffect } from "react";
import { Search, CheckCircle, Clock, Trash2, ExternalLink } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  telegram: string | null;
  email: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  source: string;
  status: string;
  details: string | null;
  createdAt: string;
}

export default function AdminLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    await fetchLeads();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить заявку?")) return;
    await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    await fetchLeads();
  };

  const filtered = leads.filter((l) => {
    if (statusFilter !== "ALL" && l.status !== statusFilter) return false;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      (l.telegram && l.telegram.toLowerCase().includes(q)) ||
      (l.company && l.company.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            CRM • Входящие заявки
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
            Лиды ({leads.length})
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "NEW", "IN_PROGRESS", "CONTACTED", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                statusFilter === st
                  ? "bg-gold text-black shadow-gold"
                  : "bg-white/5 text-metallic hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени, номеру телефона, компании..."
          className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
        />
        <Search className="w-4 h-4 text-metallic absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-mono uppercase tracking-wider text-metallic/70">
                <th className="p-4">Клиент</th>
                <th className="p-4">Телефон & Связь</th>
                <th className="p-4">Источник</th>
                <th className="p-4">Детали / Сообщение</th>
                <th className="p-4">Статус</th>
                <th className="p-4 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white block">{l.name}</span>
                    {l.company && (
                      <span className="text-metallic/70 text-[11px]">{l.company}</span>
                    )}
                  </td>
                  <td className="p-4 font-mono">
                    <a href={`tel:${l.phone}`} className="text-gold hover:underline block">
                      {l.phone}
                    </a>
                    {l.telegram && (
                      <span className="text-metallic text-[11px]">{l.telegram}</span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-metallic/80">
                    {l.source}
                  </td>
                  <td className="p-4 max-w-sm">
                    {l.message && <p className="text-white line-clamp-2">{l.message}</p>}
                    {l.details && (
                      <details className="text-[11px] text-gold/90 font-mono cursor-pointer mt-1">
                        <summary>Смотреть параметры расчета</summary>
                        <pre className="p-2 bg-black/60 rounded mt-1 text-[10px] whitespace-pre-wrap">
                          {l.details}
                        </pre>
                      </details>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={l.status}
                      onChange={(e) => handleStatusChange(l.id, e.target.value)}
                      className="bg-black/80 border border-white/20 rounded-lg px-2 py-1 text-[11px] font-mono text-white focus:outline-none focus:border-gold"
                    >
                      <option value="NEW">NEW</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
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
    </div>
  );
}
