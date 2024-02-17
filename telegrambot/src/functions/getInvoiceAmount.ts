import { ETariffs } from '../enums/tariffs.enum';

export const getInvoiceAmount = (tariff: string) => {
  switch (tariff) {
    case ETariffs.MONTH1:
      return 20000;
    case ETariffs.MONTH2:
      return 40000;
    case ETariffs.MONTH3:
      return 55000;
    case ETariffs.MONTH6:
      return 90000;
    case ETariffs.MONTH12:
      return 180000;
    default:
      return 0;
  }
};
