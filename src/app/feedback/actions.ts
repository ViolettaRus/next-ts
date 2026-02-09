'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitFeedback(formData: FormData) {
  const name = formData.get('name');
  const message = formData.get('message');

  // Здесь форма обрабатывается на сервере (server action),
  // без использования `use client` на странице.

  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ name, message }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Если бы страница /feedback была закеширована с revalidate или тегами,
  // мы могли бы сбросить кеш вот так:
  revalidatePath('/feedback');

  // После успешной отправки перенаправляем пользователя
  // и показываем сообщение "Спасибо за отзыв!".
  redirect('/feedback?success=1');
}

