import type { Metadata } from "next";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const metadata: Metadata = {
  title: "Blog | Next App",
  description: "Список статей блога, загружаемых с сервера.",
  openGraph: {
    title: "Blog | Next App",
    description: "Серверный рендеринг списка статей блога.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Next App",
    description: "Список статей блога с динамическими маршрутами.",
  },
};

// Это Server Component: здесь не нужен 'use client', потому что:
// - мы выполняем fetch на сервере;
// - не используем React-хуки для клиентской интерактивности;
// - HTML со списком постов формируется на сервере и отправляется уже готовым.
export default async function BlogPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const posts: Post[] = await res.json();

  return (
    <div className="space-y-4">
      <p className="text-base text-gray-900 leading-relaxed">
        Статьи загружаются на сервере из JSONPlaceholder и отображаются как
        список ссылок.
      </p>
      <ul className="space-y-2">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              prefetch
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

