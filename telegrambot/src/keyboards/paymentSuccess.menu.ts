import { toHomeMenu } from './toHome.menu';

import { InlineKeyboard } from 'grammy';

export const paymentSuccessMenu = new InlineKeyboard()
  .text('Инструкции', 'instructionCb')
  .row()
  .text('Меню', 'toHome')
  .row();
