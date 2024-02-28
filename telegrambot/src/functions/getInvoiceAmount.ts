import { getPricesById } from '../api/price';

export const getInvoiceAmount = async (tariff: string, id: number) => {
  const prices = await getPricesById({ id });
  return prices[tariff];
};
