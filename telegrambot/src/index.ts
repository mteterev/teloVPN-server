import { AuthServiceInstance } from './services/auth.services';
import { Bot, Context, GrammyError, HttpError, session } from 'grammy';
import { TG_API_KEY } from './constants/telegramBotApi';
import handlers from './handlers';
import { ServerService } from './services/server.services';
import { MyContext } from './interfaces/common';
import { createConversations } from './handlers/conversations';
import { conversations } from '@grammyjs/conversations';
import { subscriptionsAdapter } from './handlers/subscriptions';

function getSessionKey(ctx: Context): string | undefined {
  const id = ctx.update?.pre_checkout_query?.id || ctx.from?.id;
  return id?.toString();
}

const init = async () => {
  try {
    await ServerService.init();
    const servers = ServerService.servers;

    const cookiesInitPromises = servers?.map((server) => {
      return AuthServiceInstance.init(server.url, {
        username: process.env.VPN_USERNAME ?? '',
        password: process.env.VPN_PASSWORD ?? '',
      });
    });

    if (cookiesInitPromises && cookiesInitPromises.length) {
      await Promise.all(cookiesInitPromises);
    }

    const bot = new Bot<MyContext>(TG_API_KEY as string);
    //@ts-ignore
    bot.use(session({ initial: () => ({}), getSessionKey }));
    bot.use(conversations());
    createConversations(bot);
    bot.use(handlers);

    bot.catch((err) => {
      const ctx = err.ctx;
      console.error(`Error while handling update ${ctx.update.update_id}:`);
      const e = err.error;
      if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
      } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
      } else {
        console.error('Unknown error:', e);
      }
    });

    bot.start().catch((e: any) => {
      console.log(e);
    });

    subscriptionsAdapter(bot);
  } catch (e) {
    console.log(e);
  }
};

init();
