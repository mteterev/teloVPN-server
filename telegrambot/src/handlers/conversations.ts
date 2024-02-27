import { Api, Bot, RawApi } from 'grammy';
import { MyContext, MyConversation } from '../interfaces/common';
import { createConversation } from '@grammyjs/conversations';
import { addServer } from '../api/server';
import { removeUser } from '../api/user';

export async function createServer(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply('Введи новый сервер в формате "name;url;max_user_count"');
  const { message } = await conversation.wait();
  const [server, url, max_users] = message.text?.split(';');

  try {
    const newServer = await addServer({ server, url, max_users });
    await ctx.reply(`Сервер успешно добавлен!`);
    await ctx.reply(JSON.stringify(newServer));
  } catch (e: any) {
    await ctx.reply(`Ошибка добавления сервера`);
    throw new Error(e);
  }

  return;
}

export async function removeUserFromServer(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply('Введи id пользователя в формате "userId: number"');
  const { message } = await conversation.wait();

  try {
    const user = await removeUser({user_id: Number(message.text)});
    await ctx.reply(`Пользователь успешно удален!`);
    await ctx.reply(JSON.stringify(user));
  } catch (e: any) {
    await ctx.reply(`Ошибка удаления пользователя`);
    throw new Error(e);
  }

  return;
}

export async function getReview(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply('Напишите, пожалуйста, сообщением ниже ваш отзыв или пожелания и мы постараемся решить это в индивидуальном порядке :)');
  const { message } = await conversation.wait();

  try {
    await ctx.reply(`Ваш отзыв успешно записан! Благодарим за уделенное время!`);
  } catch (e: any) {
    await ctx.reply(`Ошибка записи отзыва. Попробуйте, пожалуйста, позднее или напишите в поддержку.`);
    throw new Error(e);
  }

  return;
}

export const createConversations = (bot: Bot<any, Api<RawApi>>) => {
  bot.use(createConversation(createServer));
  bot.use(createConversation(removeUserFromServer));
  bot.use(createConversation(getReview));
};
