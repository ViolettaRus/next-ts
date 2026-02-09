import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  name: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  login: (user: User) => void;
  logout: () => void;
  updateName: (name: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => {
        console.log("[userStore] setUser", user);
        set({ user });
      },
      clearUser: () => {
        console.log("[userStore] clearUser");
        set({ user: null });
      },
      login: (user) => {
        console.log("[userStore] login", user);
        set({ user });
      },
      logout: () => {
        console.log("[userStore] logout");
        set({ user: null });
      },
      updateName: (name) => {
        const currentUser = get().user;

        if (!currentUser) {
          console.warn("[userStore] updateName called without user");
          return;
        }

        const updatedUser: User = { ...currentUser, name };
        console.log("[userStore] updateName", updatedUser);

        set({ user: updatedUser });
      },
    }),
    {
      name: "user-storage",
      // Явно указываем localStorage, чтобы состояние
      // сохранялось между перезагрузками страницы.
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        console.log("[userStore] rehydrated from storage", state);
      },
    }
  )
);

