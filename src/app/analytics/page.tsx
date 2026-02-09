export default function AnalyticsPage() {
  return (
    <div className="space-y-2 text-sm text-slate-600">
      <p>
        Это экспериментальный раздел <span className="font-medium">/analytics</span> с
        параллельными маршрутами.
      </p>
      <p>
        Ниже находятся три блока: <span className="font-medium">Users</span> (ISR,
        revalidate 60s, cache force-cache), <span className="font-medium">Posts</span>{" "}
        (SSR, cache no-store) и <span className="font-medium">Comments</span> (SSG,
        cache force-cache).
      </p>
      <p>
        Каждый блок показывает свой timestamp рендеринга, чтобы визуально увидеть
        поведение кэша.
      </p>
    </div>
  );
}

