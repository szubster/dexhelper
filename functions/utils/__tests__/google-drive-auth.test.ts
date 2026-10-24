import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGoogleDriveAccessToken } from '../google-drive-auth';
import type { Env } from '../../types/env';

describe('getGoogleDriveAccessToken', () => {
  let mockEnv: Env;

  beforeEach(() => {
    vi.clearAllMocks();
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

  it('should throw an error if environment bindings are missing', async () => {
    mockEnv.GOOGLE_DRIVE_CLIENT_ID = '';
    await expect(getGoogleDriveAccessToken(mockEnv)).rejects.toThrow(
      'Google Drive credentials are not fully configured in environment bindings.'
    );
  });

  it('should fetch a new token and cache it', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'new-token', expires_in: 3600 }),
    });

    const token = await getGoogleDriveAccessToken(mockEnv);
    expect(token).toBe('new-token');

    // Check that it uses cached token next time
    const cachedToken = await getGoogleDriveAccessToken(mockEnv);
    expect(cachedToken).toBe('new-token');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
