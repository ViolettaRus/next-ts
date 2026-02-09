import { submitFeedback } from './actions';

type FeedbackPageProps = {
  searchParams?: {
    success?: string;
  };
};

export default function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const isSuccess = searchParams?.success === '1';

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Обратная связь</h1>

      <p className="text-slate-800">
        Эта форма отправляется и обрабатывается на сервере с помощью server
        actions (без <code>use client</code> на странице).
      </p>

      <form action={submitFeedback} className="space-y-4 max-w-md">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-900"
          >
            Имя
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-900"
          >
            Отзыв
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Ваш отзыв"
            required
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        >
          Отправить
        </button>
      </form>

      {isSuccess && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Спасибо за отзыв!
        </p>
      )}
    </div>
  );
}

