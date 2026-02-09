export default function LoginPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      <p className="text-sm text-slate-600">
        Доступ к разделу <span className="font-medium">/analytics</span> защищён.
        Для простоты примера установите cookie{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5">auth_token=demo</code> в
        браузере и обновите страницу.
      </p>
      <p className="text-xs text-slate-500">
        В реальном приложении здесь будет форма логина, которая устанавливает
        auth_token после успешной аутентификации.
      </p>
    </div>
  );
}

