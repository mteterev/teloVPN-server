import { axiosServerInstance } from '../plugins/axios';

interface IGetPricesProps {
  promocode: string;
}

interface IGetPricesByIdProps {
  id: number;
}

interface IAddPricesProps {
  promocode: string;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  month12: number;
  end_date: number;
}

export const getPrices = async ({ promocode }: IGetPricesProps) => {
  try {
    const prices = await axiosServerInstance.get(`/price/${promocode}`);
    return prices.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getPricesById = async ({ id }: IGetPricesByIdProps) => {
  try {
    const prices = await axiosServerInstance.get(`/price/id/${id}`);
    return prices.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const addPrices = async (props: IAddPricesProps) => {
  try {
    const user = await axiosServerInstance.post(`/price`, props);
    return user.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deletePrice = async ({ promocode }: IGetPricesProps) => {
  try {
    const res = await axiosServerInstance.delete(`/price/${promocode}`);
    return res;
  } catch (e: any) {
    throw new Error(e);
  }
};
