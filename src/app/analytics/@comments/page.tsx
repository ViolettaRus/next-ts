export const revalidate = false;

async function getComments() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=5",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json() as Promise<Array<{ id: number; name: string }>>;
}

export default async function CommentsSlot() {
  const comments = await getComments();
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold">Comments (SSG)</h2>
        <span className="text-xs text-slate-500">Rendered at {timestamp}</span>
      </div>

      <p className="text-xs text-slate-500">
        Редко меняющиеся данные, генерируются один раз на билде и кэшируются через{" "}
        <code>force-cache</code>.
      </p>

      <ul className="space-y-1 text-sm">
        {comments.map((comment) => (
          <li key={comment.id} className="truncate">
            {comment.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

