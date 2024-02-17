import { InlineKeyboard } from 'grammy';
import { ETariffs } from '../enums/tariffs.enum';

export const menuTariffs = new InlineKeyboard()
  .text('1 мес', ETariffs.MONTH1)
  .text('2 мес', ETariffs.MONTH2).row()
  .text('3 мес', ETariffs.MONTH3)
  .text('6 мес', ETariffs.MONTH6).row()
  .text('12 мес', ETariffs.MONTH12).row()
  .text('Меню', 'toHome').row();