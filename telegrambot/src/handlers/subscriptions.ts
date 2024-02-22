import { CronJob } from 'cron';
import { getUsers } from '../api/user';
import { getTimeToEnd } from '../functions/getTimeToEnd';
import { Bot } from 'grammy';
import { messages } from '../messages/common';

const payDayHandler = (bot: Bot) => {
  const payDay = new CronJob('30 10 * * *', async () => {
    const users = await getUsers();
    if (users?.length) {
      const usersExpiredSoon = users.filter((user: any) => {
        if (user.expiration_time) {
          const expiredDate = new Date(user.expiration_time);
          const timeToEnd = getTimeToEnd(expiredDate);

          if (timeToEnd < 6 && timeToEnd > 0) {
            return user;
          }
        }
      });

      if (usersExpiredSoon?.length) {
        usersExpiredSoon.forEach((user: any) => {
          bot.api.sendMessage(
            user.user_id,
            messages.subscriptionWillExpiredSoon
          );
        });
      }
    }
  });

  payDay.start();
};

export const subscriptionsAdapter = (bot: Bot) => {
  payDayHandler(bot);
};
