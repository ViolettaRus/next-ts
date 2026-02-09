'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

// revalidatePath — хорош, когда нужно пере‑валидировать
// целый путь/страницу (конкретный route segment),
// например после отправки формы или обновления списка.
//
// revalidateTag — используют, когда один и тот же закешированный
// запрос используется на нескольких страницах; при invalidate по тегу
// обновятся все места, где этот тег применён.

export async function refreshPosts() {
  // Пере‑валидируем кеш страницы /posts
  revalidatePath('/posts');

  // Пример (комментарий), как можно было бы использовать теги:
  // revalidateTag('posts');
}

