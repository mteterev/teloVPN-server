export const getPricesDescription = ({ prices }: { prices: any[] }) => {
  let descriptionArr = [];

  for (let key in prices) {
    const month = key.split('month')[1];
    descriptionArr.push(`<b>${month} месяц(ев) - ${prices[key]} р.</b>`);
  }

  const description = descriptionArr.join('\n');

  return description;
};
