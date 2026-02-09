export const dynamic = "force-dynamic";

async function getPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json() as Promise<Array<{ id: number; title: string }>>;
}

export default async function PostsSlot() {
  const posts = await getPosts();
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold">Posts (SSR)</h2>
        <span className="text-xs text-slate-500">Rendered at {timestamp}</span>
      </div>

      <p className="text-xs text-slate-500">
        Свежие данные на каждый запрос, кэш отключён через{" "}
        <code>cache: &quot;no-store&quot;</code>.
      </p>

      <ul className="space-y-1 text-sm">
        {posts.map((post) => (
          <li key={post.id} className="truncate">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

