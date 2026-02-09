"use client";

import { useMemo, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type UserSearchProps = {
  users: User[];
};

// Этот компонент является Client Component, потому что в начале файла есть 'use client'.
// Нам это нужно, чтобы использовать хуки useState и useMemo и выполнять фильтрацию уже
// загруженного списка пользователей прямо в браузере.
export default function UserSearch({ users }: UserSearchProps) {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(normalizedQuery)
    );
  }, [users, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <label className="text-base font-semibold text-gray-900">
          Поиск пользователя по имени
        </label>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Начните вводить имя..."
            className="w-full rounded-full border border-gray-300 bg-white/80 px-4 py-2 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="max-h-80 overflow-auto rounded-xl border border-gray-100 bg-gray-50/60 p-3">
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex flex-col rounded-lg bg-white px-3 py-2 text-base shadow-sm ring-1 ring-gray-100 hover:shadow-md transition"
            >
              <span className="font-medium text-gray-900">{user.name}</span>
              <span className="text-sm text-gray-600">
                {user.email} · {user.username}
              </span>
            </li>
          ))}
          {filteredUsers.length === 0 && (
            <li className="text-base text-gray-700">
              Пользователи не найдены по текущему запросу.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

