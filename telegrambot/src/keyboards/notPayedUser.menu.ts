import { InlineKeyboard } from 'grammy';

export const notPayedUserMain = new InlineKeyboard()
  .text('Получить доступ', 'getAccessCb')
  .row()
  .text('Обратная связь', 'getReview')
  .row();
