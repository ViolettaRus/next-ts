import { refreshPosts } from './actions';

// Статическая генерация с пере‑валидацией раз в 60 секунд.
export const revalidate = 60;

export default async function PostsPage() {
  // Вариант 1: кэш по умолчанию c revalidate (рекомендуется в App Router)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    // Этот объект next указывает отдельное время revalidate для запроса.
    // Если опустить его, будет использоваться export const revalidate сверху.
    next: { revalidate: 60, tags: ['posts'] },
    // Альтернативы (для понимания, закомментированы):
    // cache: 'force-cache',           // жёсткий кеш до инвалидации
    // cache: 'no-store',              // всегда свежие данные, без кеша
  });

  const posts: { id: number; title: string }[] = await res.json();

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Посты (SSR + revalidate)
        </h1>
        <p className="text-sm text-slate-700">
          Данные приходят с сервера (fetch на стороне сервера) и кешируются с
          помощью revalidate. Кнопка ниже вручную сбрасывает кеш через
          server&nbsp;action.
        </p>
      </header>

      <form action={refreshPosts} className="space-y-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          Revalidate Posts
        </button>

        <ul className="space-y-2">
          {posts.slice(0, 5).map((p) => (
            <li
              key={p.id}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm"
            >
              {p.title}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

