import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGoogleDriveAccessToken } from '../google-drive-auth';
import type { Env } from '../../types/env';

// Clear module cache to test stateful cache behavior, we mock fetch and use vi.resetModules()
beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal('fetch', vi.fn<any>());
  vi.useFakeTimers();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('getGoogleDriveAccessToken', () => {
  const mockEnv: Env = {
    GOOGLE_DRIVE_CLIENT_ID: 'test-client-id',
    GOOGLE_DRIVE_CLIENT_SECRET: 'test-client-secret',
    GOOGLE_DRIVE_REFRESH_TOKEN: 'test-refresh-token',
    GOOGLE_DRIVE_WEBHOOK_SECRET: 'test-webhook-secret',
    SAVES_BUCKET: {} as any, // Mock bucket
  };

  it('should throw an error if environment variables are missing', async () => {
    const { getGoogleDriveAccessToken: freshGetGoogleDriveAccessToken } = await import('../google-drive-auth');
    const invalidEnv = { ...mockEnv, GOOGLE_DRIVE_CLIENT_ID: '' };

    await expect(freshGetGoogleDriveAccessToken(invalidEnv)).rejects.toThrow(
      'Google Drive credentials are not fully configured in environment bindings.'
    );
  });

  it('should fetch a new token successfully when no cache exists', async () => {
    const { getGoogleDriveAccessToken: freshGetGoogleDriveAccessToken } = await import('../google-drive-auth');
    const mockResponse = {
      ok: true,
      json: vi.fn<any>().mockResolvedValue({
        access_token: 'new-access-token',
        expires_in: 3600, // 1 hour
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    const token = await freshGetGoogleDriveAccessToken(mockEnv);

    expect(token).toBe('new-access-token');

    // Verify fetch was called with correct parameters
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: mockEnv.GOOGLE_DRIVE_CLIENT_ID,
        client_secret: mockEnv.GOOGLE_DRIVE_CLIENT_SECRET,
        refresh_token: mockEnv.GOOGLE_DRIVE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }).toString(),
    });
  });

  it('should throw an error if the API request fails', async () => {
    const { getGoogleDriveAccessToken: freshGetGoogleDriveAccessToken } = await import('../google-drive-auth');
    const mockResponse = {
      ok: false,
      status: 401,
      text: vi.fn<any>().mockResolvedValue('Unauthorized request'),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    await expect(freshGetGoogleDriveAccessToken(mockEnv)).rejects.toThrow(
      'Failed to refresh Google Drive access token: 401 Unauthorized request'
    );
  });

  it('should return the cached token if it is still valid', async () => {
    const { getGoogleDriveAccessToken: freshGetGoogleDriveAccessToken } = await import('../google-drive-auth');
    // First call to set the cache
    const mockResponse1 = {
      ok: true,
      json: vi.fn<any>().mockResolvedValue({
        access_token: 'cached-access-token',
        expires_in: 3600,
      }),
    };
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse1 as unknown as Response);

    const firstToken = await freshGetGoogleDriveAccessToken(mockEnv);
    expect(firstToken).toBe('cached-access-token');
    expect(fetch).toHaveBeenCalledTimes(1);

    // Advance time by 10 minutes, still well within the 1-hour expiry (minus 10s buffer)
    vi.advanceTimersByTime(10 * 60 * 1000);

    // Second call should return cached token without fetching
    const secondToken = await freshGetGoogleDriveAccessToken(mockEnv);
    expect(secondToken).toBe('cached-access-token');
    expect(fetch).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should fetch a new token if the cached token is expired or within the buffer', async () => {
    const { getGoogleDriveAccessToken: freshGetGoogleDriveAccessToken } = await import('../google-drive-auth');
    // First call to set the cache
    const mockResponse1 = {
      ok: true,
      json: vi.fn<any>().mockResolvedValue({
        access_token: 'first-access-token',
        expires_in: 3600, // 1 hour
      }),
    };

    const mockResponse2 = {
      ok: true,
      json: vi.fn<any>().mockResolvedValue({
        access_token: 'second-access-token',
        expires_in: 3600,
      }),
    };

    vi.mocked(fetch)
      .mockResolvedValueOnce(mockResponse1 as unknown as Response)
      .mockResolvedValueOnce(mockResponse2 as unknown as Response);

    await freshGetGoogleDriveAccessToken(mockEnv);
    expect(fetch).toHaveBeenCalledTimes(1);

    // Advance time to just inside the 10-second buffer
    // 3600s = 3,600,000ms. Buffer is 10,000ms. Expired if > expiresAt - 10,000ms.
    vi.advanceTimersByTime(3600 * 1000 - 5000);

    const secondToken = await freshGetGoogleDriveAccessToken(mockEnv);
    expect(secondToken).toBe('second-access-token');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
