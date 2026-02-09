import Card from "@/components/Card";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function DashboardPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mb-4 text-gray-700">
          Данные загружаются на сервере из JSONPlaceholder
          с использованием переменной окружения.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <Card title={post.title}>{post.body}</Card>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Statistics">
          Здесь может быть статистика по пользователям, просмотрам или продажам.
        </Card>
        <Card title="Recent Activity">
          Здесь может отображаться последняя активность пользователей или
          системы.
        </Card>
      </div>
    </div>
  );
}

