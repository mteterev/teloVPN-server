interface IGetExpirationTime {
  tariff: string;
  startDate?: string;
  isRefer?: boolean;
}

export const getExpirationTime = ({
  startDate,
  tariff,
  isRefer,
}: IGetExpirationTime) => {
  let month = Number(tariff.split('month')[0]);

  if (isRefer) {
    month += 1;
  }
  
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
