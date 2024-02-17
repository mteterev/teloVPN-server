import { CallbackQueryContext, CommandContext, Context, InlineKeyboard } from 'grammy';

export const editMessage = async ({
  ctx,
  text,
  keyboard,
}: {
  ctx: CallbackQueryContext<Context> | CommandContext<Context>;
  keyboard?: InlineKeyboard;
  text?: string;
}) => {
  try {
    if (text && keyboard) {
      await ctx.editMessageText(text, {
        reply_markup: keyboard,
        parse_mode: 'HTML',
      });
    } else if (text) {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
      });
    } else if (keyboard) {
      await ctx.editMessageReplyMarkup({
        reply_markup: keyboard,
      });
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
