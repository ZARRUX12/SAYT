import prisma from "@/lib/db/prisma";
import Link from "next/link";
import { Users, FileText, Layers, FolderKanban, ArrowRight, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalServices,
    totalPortfolio,
    totalLeads,
    totalBriefs,
    recentLeads,
    recentBriefs,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.portfolioProject.count(),
    prisma.lead.count(),
    prisma.brief.count(),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.brief.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
          Панель управления
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight mt-1">
          DASHBOARD
        </h1>
        <p className="text-xs text-metallic mt-1">
          Сводка по заявкам, контенту и ключевым показателям цифровой платформы TARGET PRO.
        </p>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-gold/30 shadow-gold">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-metallic">
              Всего заявок (Лидов)
            </span>
            <Users className="w-5 h-5 text-gold" />
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {totalLeads}
          </div>
          <Link href="/admin/leads" className="text-[11px] text-gold hover:underline mt-2 inline-block font-semibold">
            Открыть лиды →
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-metallic">
              Брифы (ТЗ)
            </span>
            <FileText className="w-5 h-5 text-gold" />
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {totalBriefs}
          </div>
          <Link href="/admin/briefs" className="text-[11px] text-gold hover:underline mt-2 inline-block font-semibold">
            Открыть брифы →
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-metallic">
              Активных услуг
            </span>
            <Layers className="w-5 h-5 text-gold" />
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {totalServices}
          </div>
          <Link href="/admin/services" className="text-[11px] text-gold hover:underline mt-2 inline-block font-semibold">
            Управление услугами →
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-metallic">
              Кейсов в портфолио
            </span>
            <FolderKanban className="w-5 h-5 text-gold" />
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {totalPortfolio}
          </div>
          <Link href="/admin/portfolio" className="text-[11px] text-gold hover:underline mt-2 inline-block font-semibold">
            Управление кейсами →
          </Link>
        </div>
      </div>

      {/* Recent Leads & Briefs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gold">
              Последние заявки
            </h2>
            <Link href="/admin/leads" className="text-xs text-metallic hover:text-white flex items-center gap-1">
              Все <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-xs text-metallic/60 py-6 text-center">Заявок пока нет</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{lead.name}</span>
                    <span className="text-metallic/70 text-[11px]">{lead.phone} • {lead.source}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-gold/15 text-gold border border-gold/30">
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Briefs */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gold">
              Последние технические задания
            </h2>
            <Link href="/admin/briefs" className="text-xs text-metallic hover:text-white flex items-center gap-1">
              Все <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentBriefs.length === 0 ? (
            <p className="text-xs text-metallic/60 py-6 text-center">Брифов пока нет</p>
          ) : (
            <div className="space-y-3">
              {recentBriefs.map((brief) => (
                <div
                  key={brief.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{brief.name}</span>
                    <span className="text-metallic/70 text-[11px]">
                      {brief.company ? `${brief.company} • ` : ""}{brief.phone}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white">
                    {brief.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
