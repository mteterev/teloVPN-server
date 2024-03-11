import { updateUser } from '../api/user';
import { updateClient } from '../api/vpn/user';
import { EUserRole } from '../enums/user.enum';
import { getExpirationTime } from '../functions/getExpirationTime';
import { clientMenu } from '../keyboards/lk.menu';
import { messages } from '../messages/common';

export const updateClientHandler = async ({
  ctx,
  currentUser,
  role,
}: {
  ctx: any;
  currentUser: any;
  role?: EUserRole;
}) => {
  const expiration_time = getExpirationTime({
    startDate: currentUser.expiration_time,
    tariff: ctx.update.message?.successful_payment.invoice_payload,
  });
  const user = await updateUser({
    user_id: ctx.update.message?.from.id,
    expiration_time,
    role
  });

  await updateClient(user);

  await ctx.api.sendMessage(
    ctx.update.message?.from.id,
    messages.paymentSuccessOld,
    {
      reply_markup: clientMenu,
    }
  );
};
