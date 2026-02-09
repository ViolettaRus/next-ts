"use client";

type BlogErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BlogError({ error, reset }: BlogErrorProps) {
  return (
    <div className="space-y-3 rounded border border-red-200 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-800">
        Ошибка при загрузке блога
      </h2>
      <p className="text-sm text-red-700">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
      >
        Попробовать снова
      </button>
    </div>
  );
}

