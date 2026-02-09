import type { Metadata } from "next";
import { adminDb } from "@/lib/firebase/admin";
import { submitFeedback } from "./actions";

export const metadata: Metadata = {
  title: "Feedback Board",
  description: "Mini Feedback Board on Next.js + Firebase",
};

// Revalidate ISR page every 30 seconds so new feedback appears automatically.
export const revalidate = 30;

type Feedback = {
  id: string;
  name: string;
  message: string;
  createdAt: number;
};

async function getFeedbackList(): Promise<Feedback[]> {
  const snapshot = await adminDb
    .collection("feedback")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Feedback, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });
}

export default async function FeedbackPage() {
  const feedback = await getFeedbackList();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Feedback Board
        </h1>
        <p className="text-sm text-slate-600">
          Оставьте отзыв о приложении. Данные сохраняются в Firestore через
          Server Actions, страница обновляется с ISR каждые 30 секунд.
        </p>
      </header>

      <form
        action={submitFeedback}
        className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
      >
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Your name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-slate-200 focus:border-slate-500 focus:ring-2"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700"
          >
            Your feedback
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your feedback"
            required
            rows={4}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-slate-200 focus:border-slate-500 focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Send
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Latest feedback
        </h2>

        {feedback.length === 0 ? (
          <p className="text-sm text-slate-500">
            Пока нет отзывов. Будьте первым!
          </p>
        ) : (
          <ul className="space-y-3">
            {feedback.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="mt-1 text-slate-700 whitespace-pre-line">
                  {item.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

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

