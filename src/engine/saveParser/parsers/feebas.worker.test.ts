import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: mock
const mockPostMessage = vi.fn<(message: any) => void>();
const originalSelf = global.self;

beforeEach(() => {
  mockPostMessage.mockClear();
  Object.defineProperty(global, 'self', {
    value: {
      postMessage: mockPostMessage,
      onmessage: null,
    },
    configurable: true,
    writable: true,
  });
});

afterEach(() => {
  global.self = originalSelf;
  vi.restoreAllMocks();
  vi.resetModules();
});

describe('feebas.worker', () => {
  it('should post an error if seed is not a number', async () => {
    await import('./feebas.worker');
    const onmessage = global.self.onmessage;

    if (onmessage) {
      // @ts-expect-error Mocking MessageEvent
      onmessage({ data: 'invalid' });
    }
    expect(mockPostMessage).toHaveBeenCalledWith({ error: 'Invalid seed provided.' });
  });

  it('should post coordinates on valid seed', async () => {
    await import('./feebas.worker');
    const onmessage = global.self.onmessage;
    if (onmessage) {
      // @ts-expect-error Mocking MessageEvent
      onmessage({ data: 12345 });
    }

    const callArgs = mockPostMessage.mock.calls[0];
    if (!callArgs) {
      throw new Error('mockPostMessage was not called');
    }
    expect(mockPostMessage).toHaveBeenCalled();
    const arg = callArgs[0] as { coordinates: [number, number][] };
    expect(arg.coordinates).toBeDefined();
    expect(arg.coordinates.length).toBe(6);
  });

  it('should catch errors and post them', async () => {
    vi.doMock('../../gen3/feebas', () => ({
      calculateFeebasTiles: vi.fn<() => number[]>(() => {
        throw new Error('Test error');
      }),
      mapSpotIdsToCoordinates: vi.fn<(spotIds: number[]) => [number, number][]>(),
    }));

    await import('./feebas.worker');
    const onmessage = global.self.onmessage;
    if (onmessage) {
      // @ts-expect-error Mocking MessageEvent
      onmessage({ data: 12345 });
    }

    expect(mockPostMessage).toHaveBeenCalledWith({ error: 'Test error' });
  });

  it('should handle non-Error throws', async () => {
    vi.doMock('../../gen3/feebas', () => ({
      calculateFeebasTiles: vi.fn<() => number[]>(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'String error';
      }),
      mapSpotIdsToCoordinates: vi.fn<(spotIds: number[]) => [number, number][]>(),
    }));

    await import('./feebas.worker');
    const onmessage = global.self.onmessage;
    if (onmessage) {
      // @ts-expect-error Mocking MessageEvent
      onmessage({ data: 12345 });
    }

    expect(mockPostMessage).toHaveBeenCalledWith({ error: 'Unknown error occurred.' });
  });
});
