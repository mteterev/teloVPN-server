interface IGetExpirationTime {
  tariff: string;
  startDate?: string;
}

export const getExpirationTime = ({
  startDate,
  tariff,
}: IGetExpirationTime) => {
  const month = Number(tariff.split('month')[0]);
  const expiration_time = new Date(startDate || '');
  if (startDate && expiration_time > new Date()) {
    expiration_time.setMonth(expiration_time.getMonth() + month);
    return expiration_time.getTime();
  } else {
    const startedDate = new Date();
    startedDate.setMonth(startedDate.getMonth() + month);

    return startedDate.getTime();
  }
};
