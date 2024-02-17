import { Composer } from 'grammy';
import { menuTariffs } from '../keyboards/tariffs.menu';
import { messages } from '../messages/common';
import { instructionsMenu } from '../keyboards/instructions.menu';
import { menuInformation } from '../keyboards/information.menu';
import { menuNewUserMain } from '../keyboards/newUserMain.menu';
import { editMessage } from '../helpers/editMessage';
import { getUser, getUserServer } from '../api/user';
import { EUserRole } from '../enums/user.enum';
import { clientMenu } from '../keyboards/lk.menu';
import { getTimeToEnd } from '../functions/getTimeToEnd';
import { createInvoice } from '../helpers/createInvoice';
import { getInvoiceAmount } from '../functions/getInvoiceAmount';
import { toHomeMenu } from '../keyboards/toHome.menu';
import { getKey } from '../functions/getKey';
import { getInbound } from '../api/vpn/getInbound';

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

export default composer;
