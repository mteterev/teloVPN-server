import { Composer, InputFile } from 'grammy';
import { menuTariffs } from '../keyboards/tariffs.menu';
import { messages } from '../messages/common';
import { instructionsMenu } from '../keyboards/instructions.menu';
import { menuInformation } from '../keyboards/information.menu';
import { menuNewUserMain } from '../keyboards/newUserMain.menu';
import { editMessage } from '../helpers/editMessage';
import { getUser, getUserServer, getUsers, removeUser } from '../api/user';
import { EUserRole } from '../enums/user.enum';
import { clientMenu } from '../keyboards/lk.menu';
import { getTimeToEnd } from '../functions/getTimeToEnd';
import { createInvoice } from '../helpers/createInvoice';
import { getInvoiceAmount } from '../functions/getInvoiceAmount';
import { toHomeMenu } from '../keyboards/toHome.menu';
import { getKey } from '../functions/getKey';
import { getInbound } from '../api/vpn/getInbound';
import { deleteClient } from '../api/vpn/user';
import { getServers } from '../api/server';
import { jsonToCSV } from '../helpers/jsonToCSV';
import { usersOutput } from '../constants/fileOutputNames';
import 'dotenv/config';

const composer = new Composer();

composer.callbackQuery('getAccessCb', async (ctx) => {
  await editMessage({
    ctx,
    text: messages.tariffs.description,
    keyboard: menuTariffs,
  });
});

composer.callbackQuery('informationCb', async (ctx) => {
  await editMessage({
    ctx,
    text: messages.information,
    keyboard: menuInformation,
  });
});

composer.callbackQuery('instructionCb', async (ctx) => {
  await editMessage({
    ctx,
    keyboard: instructionsMenu,
  });
});

composer.callbackQuery('getVPNKeyAgainCb', async (ctx) => {
  const user = await getUser(ctx.from.id);
  const userServer = await getUserServer(ctx.from.id);
  const inbound: any = await getInbound(user);
  const key = await getKey({ ctx, inbound, userServer: userServer.url });
  await editMessage({
    ctx,
    text: `<code>${key}</code>`,
    keyboard: toHomeMenu,
  });
});

composer.callbackQuery('toHome', async (ctx) => {
  const user = await getUser(ctx.from.id);

  if (user.role === EUserRole.CLIENT) {
    let message = messages.helloAgain;
    message = message.replace('{name}', ctx.from.username || 'дорогой клиент');
    message = message.replace(
      '{timeToEnd}',
      `${getTimeToEnd(user.expiration_time).toString()} дней.`
    );
    await editMessage({
      ctx,
      text: message,
      keyboard: clientMenu,
    });
  }

  if (user.role === EUserRole.USER) {
    await editMessage({
      ctx,
      text: messages.helloMessage,
      keyboard: menuNewUserMain,
    });
  }
});

composer.callbackQuery(/month/g, async (ctx) => {
  const tariff = ctx.update.callback_query.data;

  if (tariff && getInvoiceAmount(tariff)) {
    createInvoice({ ctx, payload: tariff, amount: getInvoiceAmount(tariff) });
  }

  await ctx.answerCallbackQuery();
});

composer.callbackQuery(/instruction/g, async (ctx) => {
  const instruction = ctx.update.callback_query.data;

  if (instruction === 'instructionAndroidCb') {
    editMessage({
      ctx,
      text: messages.instructionAndroid,
      keyboard: toHomeMenu,
    });
  }

  if (instruction === 'instructionMacOsCb') {
    editMessage({ ctx, text: messages.instructionMacOs, keyboard: toHomeMenu });
  }

  if (instruction === 'instructionWindowsCb') {
    editMessage({
      ctx,
      text: messages.instructionWindows,
      keyboard: toHomeMenu,
    });
  }

  await ctx.answerCallbackQuery();
});

composer.callbackQuery('createServer', async (ctx) => {
  //@ts-ignore
  await ctx.conversation.enter('createServer');
  await ctx.answerCallbackQuery();
});

composer.callbackQuery('removeUserFromServer', async (ctx) => {
  //@ts-ignore
  await ctx.conversation.enter('removeUserFromServer');
  await ctx.answerCallbackQuery();
});

composer.callbackQuery('removeMyselfFromServer', async (ctx) => {
  const user = await getUser(ctx.from.id);
  try {
    await removeUser({ user_id: ctx.from.id });
    await ctx.reply('Я успешно удален с сервера');

    if (user.server) {
      deleteClient(user)
        .then(async () => {
          await ctx.reply('Я успешно удален с VPN сервера');
        })
        .catch(async (e) => {
          await ctx.reply('Не смогли удалить с VPN сервера :(');
          await ctx.reply(e);
        });
    }
  } catch (e) {
    await ctx.reply('Ошибка удаления меня с сервера');
  } finally {
    await ctx.answerCallbackQuery();
  }
});

composer.callbackQuery('getServers', async (ctx) => {
  try {
    const servers = await getServers();
    await ctx.reply('Список серверов:');
    await ctx.reply(JSON.stringify(servers.data));
  } catch (e) {
    await ctx.reply('Не получилось получить список серверов :(');
  } finally {
    await ctx.answerCallbackQuery();
  }
});

composer.callbackQuery('getUsers', async (ctx) => {
  try {
    const users = await getUsers();
    jsonToCSV({
      data: users,
      headers: Object.keys(users?.[0]).map((key) => ({ id: key, title: key })),
    });
    await ctx.reply('Список пользователей:');
    await ctx.replyWithDocument(new InputFile(`${usersOutput}.csv`));
  } catch (e) {
    await ctx.reply('Не получилось получить список пользователей :(');
  } finally {
    await ctx.answerCallbackQuery();
  }
});

composer.callbackQuery('getUsersCount', async (ctx) => {
  try {
    const users = await getUsers();
    await ctx.reply(`Количество пользователей: ${users?.length}`);
  } catch (e) {
    await ctx.reply('Не получилось получить количество пользователей :(');
  } finally {
    await ctx.answerCallbackQuery();
  }
});

composer.callbackQuery('getReview', async (ctx) => {
  //@ts-ignore
  await ctx.conversation.enter('getReview');
  await ctx.answerCallbackQuery();
});

composer.callbackQuery('inviteFriend', async (ctx) => {
  let message = messages.inviteFriends;
  message = message.replace(
    '{inviteLink}',
    `${process.env.URL_TO_BOT}?start=${ctx.from.id}`
  );
  await ctx.reply(message, { parse_mode: 'HTML' });
  await ctx.answerCallbackQuery();
});

export default composer;
