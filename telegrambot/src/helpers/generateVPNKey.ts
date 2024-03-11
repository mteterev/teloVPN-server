import { getUserServer } from "../api/user";
import { getInbound } from "../api/vpn/getInbound";
import { getKey } from "../functions/getKey";
import { IUserRequest } from "../interfaces/requests/user";
import { paymentSuccessMenu } from "../keyboards/paymentSuccess.menu";
import { messages } from "../messages/common";

export const generateVPNKeyHandler = async ({ctx, user}: {ctx: any, user: IUserRequest}) => {
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
};
