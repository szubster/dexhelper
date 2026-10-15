export interface ThrottleOptions {
  limit: number;
  interval: number;
}

export function createThrottle({ limit, interval }: ThrottleOptions) {
  let queue: Array<{
    fn: () => Promise<any>;
    resolve: (val: any) => void;
    reject: (err: any) => void;
  }> = [];
  const timestamps: number[] = [];
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function processQueue() {
    const now = Date.now();
    // Drop timestamps older than the sliding window interval
    while (timestamps.length > 0 && timestamps[0] <= now - interval) {
      timestamps.shift();
    }

    while (queue.length > 0 && timestamps.length < limit) {
      const item = queue.shift()!;
      timestamps.push(Date.now());
      try {
        Promise.resolve(item.fn()).then(item.resolve, item.reject);
      } catch (err) {
        item.reject(err);
      }
    }

    if (queue.length > 0 && !timeoutId) {
      const waitTime = Math.max(0, interval - (now - timestamps[0]));
      timeoutId = setTimeout(() => {
        timeoutId = null;
        processQueue();
      }, waitTime);
    }
  }

  function schedule<T>(fn: () => Promise<T> | T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      queue.push({ fn: async () => fn(), resolve, reject });
      processQueue();
    });
  }

  return {
    schedule,
    wrap: <T extends (...args: any[]) => Promise<any>>(fn: T): T => {
      return ((...args: Parameters<T>) => schedule(() => fn(...args))) as unknown as T;
    },
    getQueueLength: () => queue.length,
    clear: () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = null;
      queue = [];
      timestamps.length = 0;
    }
  };
}
