import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadFileFromGoogleDrive, MAX_FILE_SIZE_BYTES, MAX_EXECUTION_TIME_MS } from '../google-drive-download';
import { getGoogleDriveAccessToken } from '../google-drive-auth';
import type { Env } from '../../types/env';

vi.mock('../google-drive-auth', () => ({
  getGoogleDriveAccessToken: vi.fn<() => Promise<string>>(),
}));

describe('downloadFileFromGoogleDrive', () => {
  let mockEnv: Env;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockEnv = {
      ASSETS: {} as any,
      GOOGLE_DRIVE_CLIENT_ID: 'test-client-id',
      GOOGLE_DRIVE_CLIENT_SECRET: 'test-client-secret',
      GOOGLE_DRIVE_REFRESH_TOKEN: 'test-refresh-token',
      SAVES_BUCKET: {} as any, // Mock as needed
      GOOGLE_DRIVE_WEBHOOK_SECRET: 'test-secret',
    };

    global.fetch = vi.fn<typeof fetch>() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should download a file successfully if within size limits', async () => {
    const mockToken = 'mock-access-token';
    vi.mocked(getGoogleDriveAccessToken).mockResolvedValueOnce(mockToken);

    const mockArrayBuffer = new ArrayBuffer(8);
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ size: '1024' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: async () => mockArrayBuffer,
      });

    const fileId = 'test-file-id';
    const resultPromise = downloadFileFromGoogleDrive(mockEnv, fileId);
    vi.runAllTimers();
    const result = await resultPromise;

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result).toBe(mockArrayBuffer);
  });

  it('should reject file if size exceeds maximum allowed size', async () => {
    const mockToken = 'mock-access-token';
    vi.mocked(getGoogleDriveAccessToken).mockResolvedValueOnce(mockToken);

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ size: String(MAX_FILE_SIZE_BYTES + 1) }),
    });

    const fileId = 'test-file-id';
    await expect(downloadFileFromGoogleDrive(mockEnv, fileId)).rejects.toThrow(
      `File size (${MAX_FILE_SIZE_BYTES + 1} bytes) exceeds maximum allowed size (${MAX_FILE_SIZE_BYTES} bytes)`
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should timeout if download takes too long', async () => {
    const mockToken = 'mock-access-token';
    vi.mocked(getGoogleDriveAccessToken).mockResolvedValueOnce(mockToken);

    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ size: '1024' }),
      })
      .mockImplementationOnce(async (_url: any, { signal }: any) => {
        return new Promise((_resolve, reject) => {
          if (signal) {
            signal.addEventListener('abort', () => {
              const error = new Error('AbortError');
              error.name = 'AbortError';
              reject(error);
            });
          }
        });
      });

    const fileId = 'test-file-id';

    // Do not await it immediately so that we can advance timers
    const promise = downloadFileFromGoogleDrive(mockEnv, fileId);

    // Catch the error internally before expect so Vitest doesn't complain about unhandled rejection
    promise.catch(() => {});

    // Fast-forward to trigger the abort signal
    await vi.advanceTimersByTimeAsync(MAX_EXECUTION_TIME_MS + 100);

    // Now await the promise in expect to get the proper failure if it didn't throw
    await expect(promise).rejects.toThrow(
      `Download timed out after ${MAX_EXECUTION_TIME_MS}ms`
    );
  });
});
