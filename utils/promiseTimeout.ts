export const promiseTimeout = async (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
