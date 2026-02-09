## Feedback Board на Next.js + Firebase

Этот репозиторий — учебный пример проекта на [Next.js](https://nextjs.org) с **App Router**, TypeScript и Tailwind CSS, в котором реализовано мини‑приложение **“Feedback Board”** на базе **Firebase SDK** и **Cloud Firestore**.

Цель — показать:

- **как подключать Firebase SDK на клиенте и на сервере**;
- **как работать с Firestore через Firebase Admin SDK в Server Actions**;
- **как настроить singleton‑инициализацию Firebase (паттерн Singleton)**;
- **как использовать ISR (`revalidate`) и `revalidatePath` для обновления страницы с отзывами**;
- **как описывать и применять правила безопасности Firestore**.

## Функционал Feedback Board

- **Страница `/feedback`**:
  - серверный компонент с ISR (`export const revalidate = 30`);
  - отображает список отзывов из коллекции `feedback` в Firestore, отсортированный по полю `createdAt` (последние сверху);
  - содержит форму отправки отзыва:

    ```tsx
    <form action={submitFeedback}>
      <input name="name" placeholder="Your name" required />
      <textarea name="message" placeholder="Your feedback" required />
      <button type="submit">Send</button>
    </form>
    ```

  - после отправки формы вызывается Server Action `submitFeedback`, который:
    - получает `FormData`;
    - записывает документ в Firestore с полями:
      - `name: string`
      - `message: string`
      - `createdAt: Date.now()` (тип `number / int` в Firestore);
    - вызывает `revalidatePath('/feedback')`, чтобы список отзывов на странице обновился.

- **Отображение списка отзывов**:
  - данные читаются на сервере через Firebase Admin SDK;
  - используется порядок `orderBy("createdAt", "desc")`;
  - страница работает в режиме **ISR** и автоматически пере‑валидируется раз в 30 секунд, поэтому новые отзывы появляются без ручного обновления кеша.

## Firebase и Firestore: структура и синглтоны

### Клиентская инициализация Firebase (`lib/firebase/client.ts`)

- Файл `lib/firebase/client.ts` содержит:
  - функцию `getFirebaseClientApp()` — синглтон‑обёртку над `initializeApp` из `firebase/app`:
    - проверяет, есть ли уже созданные приложения через `getApps()`;
    - если есть — переиспользует первое;
    - если нет — создаёт новое приложение с конфигом из `NEXT_PUBLIC_FIREBASE_*`;
  - экспорт `clientDb = getFirestore(getFirebaseClientApp())` для клиентской работы с Firestore (если понадобится).
- Конфиг берётся из переменных окружения:

  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

  При отсутствии переменных бросается понятная ошибка.

### Серверная инициализация Firebase Admin (`lib/firebase/admin.ts`)

- Файл `lib/firebase/admin.ts` содержит:
  - функцию `getFirebaseAdminApp()` — синглтон‑инициализацию Firebase Admin SDK:
    - использует `getApps()` для проверки уже созданных инстансов;
    - при отсутствии инициализирует приложение через `initializeApp({ credential: cert({...}) })`;
  - экспорт `adminDb = getFirestore(getFirebaseAdminApp())` — серверный экземпляр Firestore.
- Используемые переменные окружения:

  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`

- Важный момент: `FIREBASE_PRIVATE_KEY` обычно хранится в `.env.local` в виде одной строки с `\n`, поэтому в коде используется `replace(/\\n/g, "\n")`, чтобы корректно восстановить ключ.

## Server Action: `submitFeedback`

- Файл: `src/app/feedback/actions.ts`.
- Директива `'use server'` позволяет Next.js сгенерировать server action:
  - принимает `formData: FormData`;
  - достаёт и валидирует поля `name` и `message`;
  - добавляет документ в коллекцию `feedback`:

    ```ts
    await adminDb.collection('feedback').add({
      name,
      message,
      createdAt: Date.now(),
    });
    ```

  - вызывает `revalidatePath('/feedback')`, что сбрасывает кеш страницы `/feedback` и подготавливает новый HTML со свежим списком отзывов.

## Структура файлов, связанных с Feedback Board

- **Основное:**
  - `src/app/feedback/page.tsx` — серверная страница с формой и списком отзывов, ISR (`revalidate = 30`).
  - `src/app/feedback/actions.ts` — Server Action `submitFeedback`, пишет в Firestore и делает `revalidatePath('/feedback')`.
- **Firebase:**
  - `lib/firebase/client.ts` — клиентский синглтон Firebase App + Firestore (`clientDb`).
  - `lib/firebase/admin.ts` — серверный синглтон Firebase Admin App + Firestore (`adminDb`).
- **Правила Firestore:**
  - `firestore.rules` — файл с примером правил безопасности для коллекции `feedback`.

Остальная часть проекта (страницы `Home`, `About`, `Dashboard`, `Blog`, `Users`, `Profile`, глобальный `Header`, Zustand‑store и т.д.) остаётся в учебных целях и демонстрирует App Router, SSR/CSR, Server/Client Components и глобальное состояние.

## Правила безопасности Firestore

Файл `firestore.rules` содержит пример конфигурации безопасности для сервиса Cloud Firestore:

- Коллекция `feedback`:
  - `allow read: if true;` — чтение отзывов открыто для всех;
  - `allow create` — разрешено только если:
    - используются только поля `name`, `message`, `createdAt`;
    - `name` и `message` — непустые строки;
    - `createdAt` — целое число (`int`), совпадает с тем, что мы пишем через `Date.now()`;
  - `allow update, delete: if false;` — клиент не может изменять и удалять существующие отзывы.

Эти правила демонстрируют:

- как ограничивать набор допустимых полей;
- как типизировать данные на уровне правил;
- как разделять права на создание/чтение и запрет обновления/удаления.

## Переменные окружения

Создайте файл `.env.local` в корне проекта и добавьте:

```bash
# Firebase client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=ваш_ключ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ваш-домен.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ваш_project_id

# Firebase Admin SDK
FIREBASE_PROJECT_ID=ваш_project_id
FIREBASE_CLIENT_EMAIL=service-account@ваш_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> Не коммитьте `.env.local` в репозиторий. Секреты должны храниться только локально или в менеджере секретов.

## Запуск проекта

1. **Установить зависимости**:

   ```bash
   npm install
   ```

2. **Настроить окружение Firebase**:

   - создать проект в Firebase Console;
   - включить Cloud Firestore;
   - создать Web‑приложение и скопировать `apiKey`, `authDomain`, `projectId` в `.env.local`;
   - сгенерировать Service Account JSON и перенести `project_id`, `client_email`, `private_key` в `.env.local`;
   - применить правила из `firestore.rules` в разделе Firestore → Rules.

3. **Запустить dev‑сервер**:

   ```bash
   npm run dev
   ```

4. **Открыть приложение**:

   - `http://localhost:3000` — главная страница;
   - `http://localhost:3000/feedback` — раздел Feedback Board.

5. **Проверить Feedback Board**:

   - открыть `/feedback`;
   - отправить несколько отзывов через форму;
   - убедиться, что они появляются в списке (с учётом ISR: до 30 секунд или после `revalidatePath`);
   - проверить, что в Firebase Console → Firestore коллекция `feedback` содержит созданные документы.

## Полезные ссылки

- [Документация Next.js](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Документация Firebase](https://firebase.google.com/docs)
- [Cloud Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Паттерн Singleton (refactoring.guru)](https://refactoring.guru/ru/design-patterns/singleton)
