import PricesModel from '../models/prices.model';
import { getUserService } from './user.service';

type getPriceServiceProps = {
  promocode: string;
};

type addPriceServiceProps = {
  promocode: string;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  month12: number;
  end_date: number;
  validity: number;
};

export const getPriceService = async ({ promocode }: getPriceServiceProps) => {
  const price = await PricesModel.findByPk(promocode);

  if (price) {
    return price;
  } else {
    throw new Error('Цены с текущим промокодом не существует');
  }
};

export const addPriceService = async (props: addPriceServiceProps) => {
  await PricesModel.create(props);

  const price = await getPriceService({ promocode: props.promocode });

  if (price) {
    return price;
  } else {
    throw new Error('Добавить цену не получилось');
  }
};

export const deletePriceService = async ({
  promocode,
}: getPriceServiceProps) => {
  try {
    const foundPrice = await getPriceService({ promocode });
    if (foundPrice) {
      await PricesModel.destroy({ where: { promocode } });
      return foundPrice;
    } else {
      throw new Error('Такой цены не существует');
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getPriceByIdService = async (user_id: number) => {
  try {
    const user = await getUserService(user_id);

    const promocode = user?.promocode;

    if (promocode) {
      const price = await getPriceService({ promocode });

      if (price) {
        return price;
      } else {
        throw new Error('Такой цены не существует');
      }
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
