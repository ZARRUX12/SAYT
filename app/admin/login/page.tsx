"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(json.error || "Ошибка авторизации");
      }
    } catch {
      setError("Ошибка сети при попытке входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 max-w-md w-full border border-gold/30 shadow-gold relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/40 shadow-gold mb-3">
            <Image
              src="/logo.png"
              alt="TARGET PRO Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-center">
            TARGET <span className="text-gold">PRO</span>
          </h1>
          <span className="text-[10px] font-mono uppercase tracking-widest text-metallic/70 mt-1">
            Защищенная панель управления
          </span>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
              Email администратора
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@targetpro.uz"
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none"
              />
              <Mail className="w-4 h-4 text-metallic absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-metallic uppercase tracking-wider mb-1">
              Пароль
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/60 border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none"
              />
              <Lock className="w-4 h-4 text-metallic absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold transition-all duration-200 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <span>ПРОВЕРКА ДОСТУПА...</span>
            ) : (
              <>
                <span>ВОЙТИ В СИСТЕМУ</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-metallic/60 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>HTTP-Only Session • CSRF Protected</span>
        </div>
      </div>
    </main>
  );
}
