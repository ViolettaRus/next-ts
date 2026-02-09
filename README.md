## Цель репозитория

Этот репозиторий — учебный пример проекта на [Next.js](https://nextjs.org) с **App Router**, TypeScript и Tailwind CSS.  
Цель — показать:

- **как устроен App Router** (общие и вложенные layout'ы);
- **как выносить UI в переиспользуемые компоненты**;
- **как настраивать абсолютные импорты через `tsconfig`**;
- **как делать серверный рендеринг данных с использованием переменных окружения**.

## Задача и функциональные требования

- **Навигация по страницам**: `Home`, `About`, `Dashboard` через общий `Header`.
- **Nested layouts**: у `Dashboard` есть свой вложенный `layout` с `Sidebar`, который отображается только на `/dashboard/*`.
- **Серверный рендеринг данных**:
  - страница `Dashboard` (`/dashboard`) — серверный компонент;
  - данные загружаются с `JSONPlaceholder` через `fetch` на сервере;
  - используется переменная окружения `NEXT_PUBLIC_API_URL`.
- **Абсолютные импорты**:
  - `@/components/*` — для общих компонентов;
  - `@/lib/*` — для утилит (зарезервировано для будущего кода).

## Структура проекта

Ключевые папки и файлы:

- `src/app/`
  - `layout.tsx` — корневой layout приложения, подключает общий `Header` и оборачивает страницы в `<main>`.
  - `page.tsx` — главная страница `Home` с описанием функционала.
  - `about/page.tsx` — статическая страница `About`.
  - `dashboard/layout.tsx` — вложенный layout для раздела `Dashboard` с `Sidebar`.
  - `dashboard/page.tsx` — основная страница `Dashboard`, серверный рендеринг списка постов.
  - `dashboard/posts/page.tsx` — дополнительная страница для примера ссылки из сайдбара.
- `components/`
  - `Header.tsx` — общий хедер с навигацией по разделам.
  - `Sidebar.tsx` — сайдбар, отображается только в `dashboard`‑разделе.
  - `Card.tsx` — универсальная карточка для вывода контента.
- `tsconfig.json`
  - настройка `baseUrl` и `paths`:
    - `@/*` → `./src/*`
    - `@/components/*` → `components/*`
    - `@/lib/*` → `lib/*`
- `.env.local`
  - хранит `NEXT_PUBLIC_API_URL` для конфигурации источника данных.

## Запуск и использование

1. Установить зависимости:

   ```bash
   npm install
   ```

2. Запустить dev‑сервер:

   ```bash
   npm run dev
   ```

3. Открыть в браузере:

   - `http://localhost:3000` — главная страница (`Home`);
   - `http://localhost:3000/about` — страница `About`;
   - `http://localhost:3000/dashboard` — `Dashboard` с сайдбаром и серверным списком постов;
   - `http://localhost:3000/dashboard/posts` — дополнительная страница раздела `Dashboard`.

## Переменные окружения

Файл `.env.local` (не коммитится в публичный репозиторий по умолчанию) должен содержать:

```bash
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

Значение используется на странице `Dashboard`:

- URL запроса: `${process.env.NEXT_PUBLIC_API_URL}/posts`
- опция `cache: "no-store"` для запроса на каждое обращение (без кэширования).

## Тестирование и проверка

Базовая проверка:

- Убедиться, что навигация в хедере (`Home`, `About`, `Dashboard`) работает и переключает страницы.
- Проверить, что при переходе на `/dashboard`:
  - виден сайдбар слева;
  - выводится список из 5 постов с заголовком и текстом.
- При изменении `NEXT_PUBLIC_API_URL` в `.env.local` и перезапуске `npm run dev`:
  - данные на `Dashboard` берутся с нового адреса (или появляется ошибка, если API недоступно).

Автоматических тестов пока нет — проект ориентирован на демонстрацию структуры и серверного рендеринга.

## Полезные ссылки

- [Документация Next.js](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Basic writing and formatting syntax (GitHub)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
