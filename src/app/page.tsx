import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Home</h1>
      <p className="text-gray-700">
        Это главная страница Next.js-приложения с App Router, общим
        layout и навигацией.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="About page">
          Статическая страница с простой информацией о приложении.
        </Card>
        <Card title="Dashboard">
          Серверный рендеринг списка постов с использованием переменной
          окружения и nested layout с сайдбаром.
        </Card>
      </div>
    </div>
  );
}
