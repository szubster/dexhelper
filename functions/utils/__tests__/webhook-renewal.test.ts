import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renewWebhooks } from '../webhook-renewal';
import { getActiveChannels, saveActiveChannels, getStartPageToken } from '../webhook-manager';
import { getGoogleDriveAccessToken } from '../google-drive-auth';
import type { Env } from '../../types/env';

vi.mock('../webhook-manager', () => ({
  getActiveChannels: vi.fn<() => void>(),
  saveActiveChannels: vi.fn<() => void>(),
  getStartPageToken: vi.fn<() => void>(),
}));

vi.mock('../google-drive-auth', () => ({
  getGoogleDriveAccessToken: vi.fn<() => void>(),
}));

describe('webhook-renewal', () => {
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = {} as Env;
    vi.clearAllMocks();
    global.fetch = vi.fn<typeof fetch>() as unknown as typeof fetch;
  });

  it('does nothing if channels are not expiring soon', async () => {
    const futureExpiration = Date.now() + 50 * 24 * 60 * 60 * 1000;
    (getActiveChannels as any).mockResolvedValue([{
      channelId: 'test-id',
      resourceId: 'res-id',
      expiration: futureExpiration
    }]);

    const result = await renewWebhooks(mockEnv);
    expect(result).toEqual({ renewed: 0, failed: 0 });
    expect(getGoogleDriveAccessToken).not.toHaveBeenCalled();
    expect(saveActiveChannels).not.toHaveBeenCalled();
  });

  it('renews expiring channels', async () => {
    const pastExpiration = Date.now() - 1000;
    (getActiveChannels as any).mockResolvedValue([{
      channelId: 'test-id',
      resourceId: 'res-id',
      expiration: pastExpiration
    }]);

    (getGoogleDriveAccessToken as any).mockResolvedValue('fake-token');
    (getStartPageToken as any).mockResolvedValue('valid_token_123');

    (global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('/stop')) {
        return Promise.resolve({ ok: true });
      }
      if (url.includes('/watch')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 'new-id',
            resourceId: 'new-res-id',
            expiration: Date.now() + 100000000 + ''
          })
        });
      }
      return Promise.reject(new Error('Unknown url'));
    });

    const result = await renewWebhooks(mockEnv, 'https://test.com');
    expect(result).toEqual({ renewed: 1, failed: 0 });
    expect(saveActiveChannels).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
        'https://www.googleapis.com/drive/v3/changes/watch?pageToken=valid_token_123',
        expect.objectContaining({
            body: expect.stringContaining('https://test.com/api/webhooks/drive')
        })
    );
  });
});
