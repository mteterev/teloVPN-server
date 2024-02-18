import { Composer } from 'grammy';
import { messages } from '../messages/common';
import { menuNewUserMain } from '../keyboards/newUserMain.menu';
import {
  createUser,
  getUser,
  getUserServer,
  updateUser,
  updateUserAfterFirstPay,
} from '../api/user';
import { EUserRole } from '../enums/user.enum';
import { getExpirationTime } from '../functions/getExpirationTime';
import { addNewClient, updateClient } from '../api/vpn/user';
import { getInbound } from '../api/vpn/getInbound';
import { clientMenu } from '../keyboards/lk.menu';
import { paymentSuccessMenu } from '../keyboards/paymentSuccess.menu';
import { getTimeToEnd } from '../functions/getTimeToEnd';
import { getKey } from '../functions/getKey';
import { adminBaseMain } from '../keyboards/adminBaseMain';
import { adminIds } from '../constants/common';

const composer = new Composer();

composer.command('start', async (ctx) => {
  const user = await getUser(ctx.msg.chat.id);
  if (!user) {
    await createUser({ user_id: ctx.msg.chat.id });
  }

  if (user.role === EUserRole.CLIENT) {
    let message = messages.helloAgain;
    message = message.replace('{name}', ctx.from?.username || 'дорогой клиент');
    message = message.replace(
      '{timeToEnd}',
      `${getTimeToEnd(user.expiration_time).toString()} дней.`
    );
    await ctx.reply(message, {
      reply_markup: clientMenu,
    });
  } else {
    await ctx.reply(messages.helloMessage, {
      reply_markup: menuNewUserMain,
    });
  }
});

composer.command('admin', async (ctx) => {
  if (adminIds.find((adminId) => Number(adminId) === ctx.from?.id)) {
    await ctx.reply(messages.helloAdmin, {
      reply_markup: adminBaseMain,
    });
  }
});

composer.on('pre_checkout_query', (ctx) => {
  ctx.api.answerPreCheckoutQuery(ctx.preCheckoutQuery.id, true);
});

composer.on(':successful_payment', async (ctx) => {
  if (ctx.update.message) {
    const currentUser = await getUser(ctx.update.message?.from.id);
    if (currentUser.role === EUserRole.CLIENT) {
      const expiration_time = getExpirationTime({
        startDate: currentUser.expiration_time,
        tariff: ctx.update.message?.successful_payment.invoice_payload,
      });
      const user = await updateUser({
        user_id: ctx.update.message?.from.id,
        expiration_time,
      });

      await updateClient(user);

      await ctx.api.sendMessage(
        ctx.update.message?.from.id,
        messages.paymentSuccessOld,
        {
          reply_markup: clientMenu,
        }
      );
    } else {
      const expiration_time = getExpirationTime({
        tariff: ctx.update.message?.successful_payment.invoice_payload,
      });
      const user = await updateUserAfterFirstPay({
        user_id: ctx.update.message?.from.id,
        expiration_time,
      });

      await addNewClient(user);

      const inbound: any = await getInbound(user);

      if (inbound) {
        const userServer = await getUserServer(ctx.update.message?.from.id);
        const key = await getKey({ ctx, inbound, userServer: userServer.url });
        let message = messages.paymentSuccess;
        message = message.replace('{vpnKey}', `<code>${key}</code>`);
        await ctx.api.sendMessage(ctx.update.message?.from.id, message, {
          reply_markup: paymentSuccessMenu,
          parse_mode: 'HTML',
        });
      }
    }
  }
});

export default composer;
