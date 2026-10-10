import prisma from "@/lib/db/prisma";
import { Clock, ShieldCheck, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLogsPage() {
  const logs = await prisma.auditLog.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
          Security & Tracking
        </span>
        <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
          Журнал аудита действий
        </h1>
        <p className="text-xs text-metallic mt-1">
          Фиксация всех событий входа, создания, обновления и удаления сущностей в панели администратора.
        </p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-mono uppercase tracking-wider text-metallic/70">
                <th className="p-4">Пользователь</th>
                <th className="p-4">Действие</th>
                <th className="p-4">Объект</th>
                <th className="p-4">Детали события</th>
                <th className="p-4">Время</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-metallic/60 font-mono">
                    Записей в журнале пока нет
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gold" />
                      <span>{log.userName}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-gold/10 text-gold border border-gold/30">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-metallic">
                      {log.entity}
                    </td>
                    <td className="p-4 text-metallic/90">
                      {log.details || "—"}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-metallic/70">
                      {new Date(log.createdAt).toLocaleString("ru-RU")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
