## Цель репозитория

Этот репозиторий — учебный пример проекта на [Next.js](https://nextjs.org) с **App Router**, TypeScript и Tailwind CSS.  
Цель — показать:

- **как устроен App Router** (общие и вложенные layout'ы);
- **чем отличаются Server и Client Components**;
- **как делать SSR и загрузку данных на клиенте (CSR)**;
- **как выносить UI в переиспользуемые компоненты**;
- **как настраивать абсолютные импорты через `tsconfig`**.

## Задача и функциональные требования

- **Навигация по страницам** через общий `Header`:
  - `Home` (`/`)
  - `About` (`/about`)
  - `Dashboard` (`/dashboard`, `/dashboard/posts`)
  - `Blog` (`/blog`, `/blog/[id]`)
  - `Users` (`/users`)
  - `Profile` (`/profile`)
  - `Feedback` (`/feedback`)
  - `Posts` (`/posts`)
- **Nested layouts**:
  - у `Dashboard` есть свой вложенный `layout` с `Sidebar`, который отображается только на `/dashboard/*`;
  - у `Blog` есть собственный layout с заголовком и описанием раздела.
- **Серверный рендеринг (SSR)**:
  - `Dashboard` (`/dashboard`) и `Blog` (`/blog`, `/blog/[id]`) — **Server Components**;
  - данные загружаются с `JSONPlaceholder` через `fetch` на сервере;
  - используется переменная окружения `NEXT_PUBLIC_API_URL`.
- **Страница `Users` (`/users`)**:
  - это **Server Component**, который выполняет `fetch` пользователей на сервере;
  - внутрь передаётся список пользователей в клиентский компонент `UserSearch`.
- **Страница `Profile` (`/profile`)**:
  - это **Client Component** с директивой `'use client'`;
  - данные профиля загружаются на клиенте через `useEffect` и `fetch`;
  - показан индикатор загрузки и обработка ошибок.
- **Поиск по пользователям**:
  - реализован в `UserSearch` как Client Component;
  - поиск идёт по уже загруженному списку пользователей;
  - используется `useState` + `useMemo` для оптимизации фильтрации.

## Структура проекта

Ключевые папки и файлы:

- `src/app/`
  - `layout.tsx` — корневой layout приложения, подключает общий `Header` и оборачивает страницы в карточку-контейнер.
  - `page.tsx` — главная страница `Home` с описанием функционала.
  - `about/page.tsx` — статическая страница `About`.
  - `dashboard/layout.tsx` — вложенный layout для раздела `Dashboard` с `Sidebar`.
  - `dashboard/page.tsx` — основная страница `Dashboard`, серверный рендеринг списка постов.
  - `dashboard/posts/page.tsx` — дополнительная страница для примера ссылки из сайдбара.
  - `blog/layout.tsx` — layout раздела блога с заголовком и описанием.
  - `blog/page.tsx` — список статей блога (Server Component, SSR).
  - `blog/[id]/page.tsx` — страница конкретной статьи.
  - `users/page.tsx` — серверная страница `Users` с SSR и передачей данных в клиентский поиск.
  - `users/UserSearch.tsx` — Client Component с директивой `'use client'`, поиск по имени среди уже загруженных пользователей.
  - `profile/page.tsx` — Client Component с `'use client'`, загрузка данных пользователя на клиенте через `useEffect`.
  - `feedback/page.tsx` — серверная страница с формой обратной связи и server action `submitFeedback`.
  - `feedback/actions.ts` — server action, который принимает `FormData`, делает `POST`‑запрос на API и вызывает `revalidatePath('/feedback')` + редирект с сообщением «Спасибо за отзыв!».
  - `posts/page.tsx` — серверная страница с SSR‑загрузкой постов, `export const revalidate = 60` и примером использования `fetch` с `next: { revalidate, tags }`.
  - `posts/actions.ts` — server action `refreshPosts`, который вручную сбрасывает кеш страницы `/posts` с помощью `revalidatePath('/posts')`.
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

## SSR vs CSR и `use client`

- **Server Components (без `'use client'`)**:
  - пример: `Dashboard`, `Blog`, `Users`;
  - `fetch` выполняется на сервере, HTML возвращается уже с готовыми данными;
  - такие компоненты не используют клиентские хуки (`useState`, `useEffect` и т.д.).
- **Client Components (c `'use client'`)**:
  - пример: `UserSearch`, `ProfilePage`, `BlogError`;
  - код выполняется в браузере, можно использовать React‑хуки;
  - данные можно загружать после первого рендера через `useEffect`.
- **Вложенные клиентские компоненты**:
  - если в файле есть `'use client'`, то все его дочерние компоненты автоматически становятся клиентскими;
  - пример: в `profile/page.tsx` `ProfileDetails` не содержит `'use client'`, но рендерится внутри `ProfilePage` и поэтому тоже клиентский.
- **Примеры, где `use client` не нужен**:
  - серверные страницы с `fetch` и без клиентской интерактивности (`/dashboard`, `/blog`, `/users`).

## Server Actions, revalidatePath / revalidateTag и режимы кэша fetch

- **Server Actions**:
  - пример: `feedback/actions.ts` (`submitFeedback`) и `posts/actions.ts` (`refreshPosts`);
  - форма на `/feedback` отправляет `FormData` прямо в server action (без `use client` на странице);
  - после успешной отправки выполняется `redirect('/feedback?success=1')` и показывается сообщение «Спасибо за отзыв!».
- **Когда использовать `revalidatePath`**:
  - когда нужно пере‑валидировать кеш **конкретной страницы или route segment**;
  - пример: после `submitFeedback` вызывается `revalidatePath('/feedback')`, а после `refreshPosts` — `revalidatePath('/posts')`.
- **Когда использовать `revalidateTag`**:
  - когда один и тот же `fetch` с тегом используется на **нескольких страницах или в разных layout'ах**;
  - пример: если запрос постов пометить как `next: { tags: ['posts'] }`, то вызов `revalidateTag('posts')` обновит все места, где этот тег применён.
- **Режимы кэширования `fetch` в App Router**:
  - `cache: 'force-cache'` — максимально агрессивное кэширование; данные берутся из кеша до тех пор, пока не будет вызван `revalidatePath`/`revalidateTag`;
  - `cache: 'no-store'` — кеш отключён, данные всегда запрашиваются заново (подходит для очень динамических данных);
  - `next: { revalidate: 60 }` — ISR: данные кешируются и автоматически пере‑валидируются раз в N секунд;
  - `next: { tags: ['posts'] }` — добавляет тег(и) к запросу, чтобы потом можно было целенаправленно сбрасывать кеш через `revalidateTag`.

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
   - `http://localhost:3000/dashboard/posts` — дополнительная страница раздела `Dashboard`;
   - `http://localhost:3000/blog` — список статей блога;
   - `http://localhost:3000/users` — список пользователей с серверной загрузкой и клиентским поиском;
   - `http://localhost:3000/profile` — профиль пользователя с загрузкой данных на клиенте (CSR).

## Переменные окружения

Файл `.env.local` (не коммитится в публичный репозиторий по умолчанию) должен содержать:

```bash
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

Значение используется на страницах `Dashboard` и `Blog`:

- URL запроса: `${process.env.NEXT_PUBLIC_API_URL}/posts`
- опция `cache: "no-store"` для запроса на каждое обращение (без кэширования).

## Тестирование и проверка

Базовая проверка:

- Убедиться, что навигация в хедере (`Home`, `About`, `Dashboard`, `Blog`, `Users`, `Profile`) работает и переключает страницы.
- Проверить, что при переходе на `/dashboard`:
  - виден сайдбар слева;
  - выводится список из 5 постов с заголовком и текстом.
- Проверить, что:
  - на `/users` отображается список пользователей и работает поиск по имени;
  - на `/profile` сначала виден индикатор загрузки, затем данные пользователя.
- При изменении `NEXT_PUBLIC_API_URL` в `.env.local` и перезапуске `npm run dev`:
  - данные на `Dashboard` и `Blog` берутся с нового адреса (или появляется ошибка, если API недоступно).

Автоматических тестов пока нет — проект ориентирован на демонстрацию структуры, SSR/CSR и работы Server/Client Components.

## Глобальное состояние: Zustand store пользователя

Для демонстрации работы глобального состояния и **клиентского стейта с сохранением в `localStorage`** добавлен простой store пользователя на базе [Zustand](https://github.com/pmndrs/zustand).

- **Store**: `src/store/userStore.ts`
  - интерфейсы:
    - `User` — тип пользователя (`id`, `name`);
    - `UserState` — состояние стора.
  - состояние и экшены:
    - `user: User | null` — текущий пользователь;
    - `setUser(user)` — установить пользователя;
    - `clearUser()` — очистить пользователя;
    - `login(user)` — эмуляция логина (устанавливает пользователя);
    - `logout()` — разлогинивает пользователя и очищает `localStorage`;
    - `updateName(name)` — обновляет только имя текущего пользователя.
  - используется `persist` + `createJSONStorage(() => localStorage)`:
    - состояние сохраняется в `localStorage` под ключом `user-storage`;
    - при перезагрузке страницы состояние ре-гидратируется;
    - в консоль выводятся логи жизненного цикла (`login`, `logout`, `updateName`, `rehydrated`).

- **Кастомный хук**: `src/hooks/useUser.ts`
  - удобная обёртка над `useUserStore`;
  - возвращает:
    - `user`, `userName`;
    - экшены `setUser`, `clearUser`, `login`, `logout`, `updateName`.
  - **селектор `userName`**:
    - `const userName = useUserStore((state) => state.user?.name);`
    - в комментарии поясняется важный момент: компонент, который подписан только на `name`,
      **не будет перерендериваться при изменении других частей `user` или глобального состояния**, что улучшает производительность.

- **Компонент `UserPanel`**: `components/UserPanel.tsx`
  - Client Component c директивой `'use client'`;
  - использует `useUser` для доступа к состоянию пользователя;
  - поведение:
    - если пользователь не авторизован — показывает кнопку **Login**;
    - при нажатии вызывает `login({ id: 1, name: "John Doe" })` (эмуляция логина);
    - если авторизован — показывает приветствие `Welcome, {userName}` и кнопку **Logout**, которая вызывает `logout()`;
    - через `useEffect` пишет в консоль текущее состояние пользователя.

- **Встраивание в общий layout**:
  - `UserPanel` подключён в `components/Header.tsx` и тем самым отображается на всех страницах;
  - корневой `layout.tsx` подключает `Header`, поэтому состояние пользователя видно и доступно глобально.

**Как проверить сохранение состояния:**

1. Запустить проект: `npm run dev` и открыть `http://localhost:3000`.
2. Нажать кнопку **Login** в правой части хедера.
3. Обновить страницу:
   - пользователь останется авторизованным;
   - в DevTools → Application → Local Storage появится ключ `user-storage` с сохранённым пользователем;
   - в консоли будут логи `rehydrated`.
4. Нажать **Logout**:
   - пользователь станет `null`;
   - хранилище очистится (ключ будет содержать пустое состояние).

## Полезные ссылки

- [Документация Next.js](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Документация Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Basic writing and formatting syntax (GitHub)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
