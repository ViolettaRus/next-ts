export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">About</h1>
      <p className="text-base text-gray-900 leading-relaxed">
        Это пример страницы About, созданной в папке <code>app/about/page.tsx</code>.
      </p>
      <p className="text-base text-gray-900 leading-relaxed">
        Приложение демонстрирует работу App Router, общих и вложенных layout&apos;ов,
        абсолютных импортов и загрузки данных на сервере.
      </p>
    </div>
  );
}

