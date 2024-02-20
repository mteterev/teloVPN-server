import 'dotenv/config';
import { CallbackQueryContext, Context } from 'grammy';

interface ICreateInvoice {
  ctx: CallbackQueryContext<Context>;
  payload: string;
  amount: number;
}

export const createInvoice = ({ ctx, payload, amount }: ICreateInvoice) => {
  const providerData = {
    receipt: {
      items: [
        { 
          description: `VPN ${payload.split('month')[0]} месяц(ев)`,
          quantity: 1.0,
          amount: {
            value: amount / 100,
            currency: 'RUB',
          },
          vat_code: 1,
        },
      ],
    },
  };
  ctx.api.sendInvoice(
    ctx.from.id,
    'Оплата VPN сервера',
    `${payload.split('month')[0]} месяц(ев); 200 гб/мес`,
    payload,
    process.env.API_KEY_PROVIDER_BOT ?? '',
    'rub',
    [{ label: 'TeloVPN', amount }],
    {
      need_email: true,
      send_email_to_provider: true,
      provider_data: JSON.stringify(providerData),
    }
  );
};
