import { InlineKeyboard } from 'grammy';
import { helpUrl } from '../constants/common';

export const clientMenu = new InlineKeyboard()
  .text('Продлить доступ', 'getAccessCb')
  .row()
  .text('Заново получить ключ', 'getVPNKeyAgainCb')
  .row()
  .text('Инструкция', 'instructionCb')
  .row()
  .text('Пригласить друга', 'inviteFriend')
  .row()
  .url('Поддержка', helpUrl)
  .row();
