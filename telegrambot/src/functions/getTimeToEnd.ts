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

// export const getTimeToEndNoAbs = (expiration_time: Date) => {
//   const currentTime = new Date();
//   const expTime = new Date(expiration_time);

//   if (expTime > currentTime) {
//     //@ts-ignore
//     const diffTime = Math.abs(expTime - currentTime);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     return diffDays;
//   }
//   //@ts-ignore
//   const diffTime = currentTime.getTime() - expTime.getTime();
//   const diffDays = diffTime / (1000 * 60 * 60 * 24);

//   return diffDays;
// };
