import { useUserStore } from "@/store/userStore";

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const updateName = useUserStore((state) => state.updateName);

  // Селектор возвращает только имя пользователя.
  // Это нужно для оптимизации производительности:
  // компонент, который подписан только на name,
  // не будет перерендериваться при изменении других полей user
  // или частей глобального состояния.
  const userName = useUserStore((state) => state.user?.name);

  return {
    user,
    userName,
    setUser,
    clearUser,
    login,
    logout,
    updateName,
  };
};

