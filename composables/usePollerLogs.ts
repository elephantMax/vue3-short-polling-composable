import type { Log } from '~/types';

export const usePollerLogs = () => {
  const logs = useState<Log<{
    success: boolean
  }>[]>('poller', () => []);

  const pushLog = (success: boolean) => {
    logs.value.push({
      timestamp : Date.now(),
      data      : {
        success,
      },
    });
  };

  const clearLogs = () => {
    logs.value.length = 0;
  };

  return {
    logs,
    pushLog,
    clearLogs,
  };
};
