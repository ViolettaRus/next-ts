'use client';

import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

export default function UserPanel() {
  const { user, userName, login, logout } = useUser();

  useEffect(() => {
    console.log("[UserPanel] current user", user);
  }, [user]);

  const handleLogin = () => {
    // Эмуляция логина: в реальном приложении здесь был бы запрос к API.
    login({ id: 1, name: "John Doe" });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-3">
      {!user ? (
        <button
          onClick={handleLogin}
          className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          Login
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-800">Welcome, {userName}</p>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

