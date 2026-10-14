import { describe, expect, it, vi } from 'vitest';
import { createThrottle } from './throttle';

describe('createThrottle', () => {
  it('allows calls up to limit immediately', async () => {
    const throttle = createThrottle({ limit: 3, interval: 1000 });
    const calls: number[] = [];

    await Promise.all([
      throttle.schedule(async () => calls.push(1)),
      throttle.schedule(async () => calls.push(2)),
      throttle.schedule(async () => calls.push(3)),
    ]);

    expect(calls).toEqual([1, 2, 3]);
    throttle.clear();
  });

  it('queues calls that exceed limit and executes them after interval', async () => {
    vi.useFakeTimers();
    try {
      const throttle = createThrottle({ limit: 2, interval: 500 });
      const completed: number[] = [];

      void throttle.schedule(async () => completed.push(1));
      void throttle.schedule(async () => completed.push(2));
      void throttle.schedule(async () => completed.push(3));

      // First 2 execute immediately
      await vi.advanceTimersByTimeAsync(0);
      expect(completed).toEqual([1, 2]);

      // 3rd executes after interval (500ms)
      await vi.advanceTimersByTimeAsync(500);
      expect(completed).toEqual([1, 2, 3]);

      throttle.clear();
    } finally {
      vi.useRealTimers();
    }
  });

  it('propagates errors without breaking subsequent queued calls', async () => {
    const throttle = createThrottle({ limit: 2, interval: 500 });

    const failed = throttle.schedule(async () => {
      throw new Error('boom');
    });
    const succeeded = throttle.schedule(async () => 'ok');

    await expect(failed).rejects.toThrow('boom');
    await expect(succeeded).resolves.toBe('ok');

    throttle.clear();
  });

  it('handles synchronously thrown errors gracefully', async () => {
    const throttle = createThrottle({ limit: 2, interval: 500 });

    const syncFailed = throttle.schedule(() => {
      throw new Error('sync boom');
    });
    const succeeded = throttle.schedule(() => 'sync ok');

    await expect(syncFailed).rejects.toThrow('sync boom');
    await expect(succeeded).resolves.toBe('sync ok');

    throttle.clear();
  });

  it('supports wrap helper function', async () => {
    const throttle = createThrottle({ limit: 2, interval: 500 });
    const add = async (a: number, b: number) => a + b;
    const throttledAdd = throttle.wrap(add);

    const res = await throttledAdd(2, 3);
    expect(res).toBe(5);

    throttle.clear();
  });
});
