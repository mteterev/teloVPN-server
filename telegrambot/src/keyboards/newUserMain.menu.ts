import { InlineKeyboard } from 'grammy';
import { helpUrl } from '../constants/common';

export const menuNewUserMain = new InlineKeyboard()
  .text('Получить доступ', 'getAccessCb')
  .row()
  .text('Информация', 'informationCb')
  .row()
  .text('Ввести промокод', 'addPromocode')
  .row()
  .url('Поддержка', helpUrl)
  .row();