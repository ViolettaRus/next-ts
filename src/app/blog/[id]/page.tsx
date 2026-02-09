import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type BlogPostPageProps = {
  params: { id: string };
};

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const post: Post = await res.json();
  return post;
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const post = await getPost(params.id);

  if (!post) {
    return {
      title: "Статья не найдена | Blog",
      description: "Запрошенная статья блога не найдена.",
    };
  }

  const title = `${post.title} | Blog`;
  const description = post.body.slice(0, 120);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <header>
        <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
        <p className="text-sm text-gray-500">
          Пост #{post.id} пользователя #{post.userId}
        </p>
      </header>
      <p className="whitespace-pre-line text-gray-800">{post.body}</p>
    </article>
  );
}

