import { CronJob } from 'cron';
import { getUserEndSubscription, getUserNotPayed } from '../api/user';
import { Bot } from 'grammy';
import { messages } from '../messages/common';
import { notPayedUserMain } from '../keyboards/notPayedUser.menu';

const payDayHandler = (bot: Bot) => {
  const payDay = new CronJob('30 10 * * *', async () => {
    const usersExpiredSoon = await getUserEndSubscription();
    if (usersExpiredSoon?.length) {
      usersExpiredSoon.forEach((user: any) => {
        bot.api.sendMessage(
          user.user_id,
          messages.subscriptionWillExpiredSoon,
          {
            reply_markup: notPayedUserMain,
          }
        );
      });
    }
  });

  payDay.start();
};

const notPayHandler = (bot: Bot) => {
  const payDay = new CronJob('30 12 * * *', async () => {
    const usersNotPayed = await getUserNotPayed();
    if (usersNotPayed?.length) {
      usersNotPayed.forEach((user: any) => {
        bot.api.sendMessage(user.user_id, messages.notPayedUsers, {
          reply_markup: notPayedUserMain,
        });
      });
    }
  });

  payDay.start();
};

export const subscriptionsAdapter = (bot: Bot) => {
  payDayHandler(bot);
  notPayHandler(bot);
};
