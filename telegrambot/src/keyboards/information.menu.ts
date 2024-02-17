import { InlineKeyboard } from 'grammy';

export const menuInformation = new InlineKeyboard()
  .text('Получить доступ', 'getAccessCb').row()
  .text('Инструкция', 'instructionCb').row()
  .text('Меню', 'toHome').row();
