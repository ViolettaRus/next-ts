"use client";

type BlogErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BlogError({ error, reset }: BlogErrorProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-red-800">
        Ошибка при загрузке блога
      </h2>
      <p className="text-base text-red-800 leading-relaxed">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700"
      >
        Попробовать снова
      </button>
    </div>
  );
}

