import { getTrueWithPercent } from '~/utils/getTrueWithPercent';

export default defineEventHandler(() => {
  const success = getTrueWithPercent(10);

  return {
    status : 'success',
    data   : {
      success,
    },
  };
});
