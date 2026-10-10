import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="glass-panel rounded-3xl p-10 sm:p-16 max-w-lg w-full text-center border border-gold/30 shadow-gold relative z-10">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <span className="text-4xl sm:text-6xl font-black font-mono text-gold block mb-2">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-3">
          Маршрут ещё не построен
        </h1>
        <p className="text-xs sm:text-sm text-metallic leading-relaxed mb-8">
          «Похоже, этот маршрут ещё не построен.» Страница, которую вы ищете, была перемещена или не существует.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-widest shadow-gold transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>НА ГЛАВНУЮ</span>
        </Link>
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    </main>
  );
}
