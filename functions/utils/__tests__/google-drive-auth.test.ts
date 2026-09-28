import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGoogleDriveAccessToken } from '../google-drive-auth';
import type { Env } from '../../types/env';

describe('getGoogleDriveAccessToken', () => {
  let env: Env;
  let systemTime = 1000000000000; // start at some fixed large time

  beforeEach(() => {
    env = {
      GOOGLE_DRIVE_CLIENT_ID: 'test-client-id',
      GOOGLE_DRIVE_CLIENT_SECRET: 'test-client-secret',
      GOOGLE_DRIVE_REFRESH_TOKEN: 'test-refresh-token',
      SAVES_BUCKET: {} as any,
      GOOGLE_DRIVE_WEBHOOK_SECRET: 'test-secret',
    };

    global.fetch = vi.fn<typeof fetch>();

    vi.useFakeTimers();
    systemTime += 1000000000000; // advance time massively each test to invalidate cache from previous tests
    vi.setSystemTime(systemTime);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should throw an error if environment variables are missing', async () => {
    env.GOOGLE_DRIVE_CLIENT_ID = '';

    await expect(getGoogleDriveAccessToken(env)).rejects.toThrow('Google Drive credentials are not fully configured');
  });

  it('should fetch a new token if cache is empty or expired', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn<() => Promise<any>>().mockResolvedValue({ access_token: 'new-access-token', expires_in: 3600 })
    };
    (global.fetch as any).mockResolvedValue(mockResponse);

    const token = await getGoogleDriveAccessToken(env);

    expect(token).toBe('new-access-token');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://oauth2.googleapis.com/token', expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'client_id=test-client-id&client_secret=test-client-secret&refresh_token=test-refresh-token&grant_type=refresh_token'
    }));
  });

  it('should throw an error if the API request fails', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      text: vi.fn<() => Promise<string>>().mockResolvedValue('Bad Request')
    };
    (global.fetch as any).mockResolvedValue(mockResponse);

    await expect(getGoogleDriveAccessToken(env)).rejects.toThrow('Failed to refresh Google Drive access token: 400 Bad Request');
  });

  it('should return cached token if still valid', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn<() => Promise<any>>().mockResolvedValue({ access_token: 'cached-access-token', expires_in: 3600 })
    };
    (global.fetch as any).mockResolvedValue(mockResponse);

    await getGoogleDriveAccessToken(env);

    (global.fetch as any).mockClear();

    vi.advanceTimersByTime(1000 * 1800); // advance 30 minutes, token should still be valid

    const token = await getGoogleDriveAccessToken(env);

    expect(token).toBe('cached-access-token');
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
