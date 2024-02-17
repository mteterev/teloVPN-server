import { InlineKeyboard } from 'grammy';

export const instructionsMenu = new InlineKeyboard()
  .text('Инструкция iOS/MacOS', 'instructionMacOsCb')
  .row()
  .text('Инструкция Android', 'instructionAndroidCb')
  .row()
  .text('Инструкция Windows', 'instructionWindowsCb')
  .row()
  .text('Меню', 'toHome')
  .row();
