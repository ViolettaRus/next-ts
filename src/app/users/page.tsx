import UserSearch from "./UserSearch";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

// Эта страница является Server Component по умолчанию (нет директивы 'use client'),
// поэтому здесь можно выполнять серверный fetch и рендерить HTML на сервере (SSR)
// без необходимости делать запросы к API в браузере.
export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await res.json();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-base text-gray-900 leading-relaxed max-w-2xl">
          Список пользователей загружается на сервере (SSR), а поиск выполняется
          на клиенте по уже загруженным данным. Это пример комбинирования
          серверного рендеринга и интерактивного UI.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <UserSearch users={users} />
      </div>
      {/* Здесь не требуется 'use client', потому что:
          - компонент страницы рендерится на сервере;
          - мы не используем React-хуки (useState/useEffect и т.п.) на уровне страницы;
          - всё, что связано с интерактивностью (поиск), вынесено в дочерний Client Component. */}
    </div>
  );
}

