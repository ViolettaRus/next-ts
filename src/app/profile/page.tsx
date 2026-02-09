"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

// Директива 'use client' делает весь этот файл Client Component.
// Это значит, что код будет выполняться в браузере, и мы можем использовать
// useState/useEffect и выполнять запросы уже после первоначального рендера страницы.
export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        setError("Не удалось загрузить профиль пользователя");
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  // В этом подходе данные загружаются на клиенте (CSR):
  // - сначала в браузер приходит минимальный HTML с индикатором загрузки;
  // - затем useEffect выполняет fetch и обновляет состояние;
  // - пользователь может видеть спиннер/скелетон, пока данные не пришли.
  //
  // В отличие от SSR (как на странице /users), сервер не ждёт данных перед рендером:
  // HTML генерируется без данных пользователя, а запрос выполняется уже в браузере.

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-base text-gray-900 leading-relaxed">
            Загружаем данные профиля пользователя. Пожалуйста, подождите.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span className="text-sm text-gray-700">
              Идёт загрузка данных профиля...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-base text-gray-900 leading-relaxed">
            Произошла ошибка при загрузке профиля.
          </p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          {error ?? "Пользователь не найден"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-base text-gray-900 leading-relaxed max-w-2xl">
          Данные профиля загружаются на клиенте после рендера страницы.
          Это пример клиентского рендеринга (CSR) с индикатором загрузки.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <ProfileDetails user={user} />
      </div>
    </div>
  );
}

type ProfileDetailsProps = {
  user: User;
};

function ProfileDetails({ user }: ProfileDetailsProps) {
  // Этот компонент НЕ содержит директиву 'use client' в начале файла,
  // но он автоматически становится клиентским, потому что рендерится
  // внутри Client Component (`ProfilePage`). Все дочерние компоненты в таком
  // дереве тоже считаются клиентскими.
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-base text-gray-700">@{user.username}</p>
      </div>
      <div className="grid gap-3 text-base text-gray-800 md:grid-cols-2">
        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-xs font-medium uppercase text-gray-500">Email</p>
          <p>{user.email}</p>
        </div>
        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-xs font-medium uppercase text-gray-500">
            User ID
          </p>
          <p>{user.id}</p>
        </div>
      </div>
    </div>
  );
}

