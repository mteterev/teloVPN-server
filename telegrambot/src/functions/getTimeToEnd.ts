export const getTimeToEnd = (expiration_time: Date) => {
  const currentTime = new Date();
  const expTime = new Date(expiration_time);

  if (expTime > currentTime) {
    //@ts-ignore
    const diffTime = Math.abs(expTime - currentTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  return 0;
};

export function getMinutesBetweenDates(currentDate: Date) {
  const diff = currentDate.getTime() - new Date().getTime();

  return Math.abs(Math.ceil((diff / 60000)));
}

export function getHoursBetweenDates(currentDate: Date) {
  const diff = currentDate.getTime() - new Date().getTime();

  return Math.abs(Math.ceil((diff / (60000 * 60))));
}