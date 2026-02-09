import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <section className="space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
        <p className="text-base text-slate-800 leading-relaxed">
          Серверный блог с динамическими маршрутам и metadata API.
        </p>
      </header>
      {children}
    </section>
  );
}

