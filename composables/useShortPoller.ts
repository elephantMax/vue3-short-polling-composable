type ShortPollerOptions<T> = {
  cb: (res: Awaited<Promise<T>>) => boolean,

  interval?: MaybeRefOrGetter<number>,
  timeout?: number,
  delay?: number

  timeoutEnd?: () => void,
};

const useShortPoller = <T>(handler: () => Promise<T>, options: ShortPollerOptions<T>) => {
  const status = ref<'active' | 'finished'>('finished');
  const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null);
  const loopTimeoutRef = ref<ReturnType<typeof setTimeout> | null>(null);

  const stopLoopRequests = () => {
    if (loopTimeoutRef.value) {
      clearTimeout(loopTimeoutRef.value);
    }
  };

  const stop = () => {
    status.value = 'finished';

    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value);
      timeoutRef.value = null;
    }
    stopLoopRequests();
  };

  const setTimeoutHandler = () => {
    const timeoutMs = toValue(options.timeout ?? 10_000);

    timeoutRef.value = setTimeout(async () => {
      stop();
      if (options.timeoutEnd) {
        options.timeoutEnd();
      }
    }, timeoutMs);
  };

  const loopRequests = (ms: number) => {
    stopLoopRequests();
    loopTimeoutRef.value = setTimeout(async () => {
      if (status.value === 'active') {
        const response = await handler();
        const isReady = options.cb(response);
        if (isReady) {
          stop();
        }
        loopRequests(ms);
      } else {
        stopLoopRequests();
      }
    }, ms);
  };

  const resume = () => {
    status.value = 'active';
    const intervalMs = toValue(options.interval ?? 500);

    loopRequests(intervalMs);
  };

  const start = async () => {
    status.value = 'active';

    const delayMs = toValue(options.delay ?? 0);

    setTimeoutHandler();

    await promiseTimeout(delayMs);
    resume();
  };

  if (isRef(options.interval)) {
    const unwatch = watch(options.interval, () => {
      if (status.value === 'active') {
        stop();
        resume();
      }
    });

    onScopeDispose(unwatch);
  }

  onScopeDispose(stop);

  return {
    start,
    stop,
  };
};

export { useShortPoller };
