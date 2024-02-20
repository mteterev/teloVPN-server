import 'dotenv/config';
import { CallbackQueryContext, Context } from 'grammy';

interface ICreateInvoice {
  ctx: CallbackQueryContext<Context>;
  payload: string;
  amount: number;
}

export const createInvoice = ({ ctx, payload, amount }: ICreateInvoice) => {
  ctx.api.sendInvoice(
    ctx.from.id,
    'Оплата VPN сервера',
    `${payload.split('month')[0]} месяц(ев); 200 гб/мес`,
    payload,
    process.env.API_KEY_PROVIDER_BOT ?? '',
    'rub',
    [{ label: 'TeloVPN', amount }],
    { need_email: true }
  );
};
