export const getTrueWithPercent = (percent: number): boolean => {
  const randomNum = Math.ceil(Math.random() * 100);

  return randomNum <= percent;
};
