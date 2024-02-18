import { InlineKeyboard } from 'grammy';

export const adminBaseMain = new InlineKeyboard()
  .text('Создать сервер', 'createServer')
  .row()
  .text('Удалить пользователя с сервера', 'removeUserFromServer')
  .row()
  .text('Получить серверы', 'getServers')
  .row()
  .text('Получить пользователей', 'getUsers')
  .row()
  .text('Удалить меня', 'removeMyselfFromServer')
  .row()