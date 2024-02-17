import { AuthServiceInstance } from './services/auth.services';
import { Bot, GrammyError, HttpError } from 'grammy';
import { TG_API_KEY } from './constants/telegramBotApi';
import handlers from './handlers';
import { ServerService } from './services/server.services';

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

    const bot = new Bot(TG_API_KEY as string);
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
  } catch (e) {
    console.log(e);
  }
};

init();
