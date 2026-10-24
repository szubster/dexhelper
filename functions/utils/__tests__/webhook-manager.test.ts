import { describe, it, expect, vi } from 'vitest';
import { getActiveChannels, saveActiveChannels, getStartPageToken, type WebhookChannel } from '../webhook-manager';
import type { Env } from '../../types/env';
import type { R2Bucket } from '@cloudflare/workers-types';

describe('webhook-manager', () => {
  it('returns empty array when no channels exist', async () => {
    const mockEnv = {
      SAVES_BUCKET: {
        get: vi.fn<any>().mockResolvedValue(null)
      } as unknown as R2Bucket
    } as unknown as Env;

    const channels = await getActiveChannels(mockEnv);
    expect(channels).toEqual([]);
  });

  it('returns parsed channels when they exist', async () => {
    const mockChannels: WebhookChannel[] = [{
      channelId: 'test-1',
      resourceId: 'res-1',
      expiration: 12345
    }];

    const mockEnv = {
      SAVES_BUCKET: {
        get: vi.fn<any>().mockResolvedValue({
          text: vi.fn<any>().mockResolvedValue(JSON.stringify(mockChannels))
        })
      } as unknown as R2Bucket
    } as unknown as Env;

    const channels = await getActiveChannels(mockEnv);
    expect(channels).toEqual(mockChannels);
  });

  it('saves channels', async () => {
    const mockPut = vi.fn<any>().mockResolvedValue(undefined);
    const mockEnv = {
      SAVES_BUCKET: {
        put: mockPut
      } as unknown as R2Bucket
    } as unknown as Env;

    const mockChannels: WebhookChannel[] = [{
      channelId: 'test-1',
      resourceId: 'res-1',
      expiration: 12345
    }];

    await saveActiveChannels(mockEnv, mockChannels);
    expect(mockPut).toHaveBeenCalledWith(
      'webhook_channels.json',
      JSON.stringify(mockChannels)
    );
  });

  it('gets start page token from storage', async () => {
     const mockEnv = {
      SAVES_BUCKET: {
        get: vi.fn<any>().mockResolvedValue({
          text: vi.fn<any>().mockResolvedValue(JSON.stringify({ pageToken: 'token123' }))
        })
      } as unknown as R2Bucket
    } as unknown as Env;

    const token = await getStartPageToken(mockEnv, 'access');
    expect(token).toBe('token123');
  });

  it('fetches new start page token if not in storage', async () => {
     const mockEnv = {
      SAVES_BUCKET: {
        get: vi.fn<any>().mockResolvedValue(null)
      } as unknown as R2Bucket
    } as unknown as Env;

    const origFetch = global.fetch;
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ startPageToken: 'new_token_456' })
    } as unknown as Response) as unknown as typeof fetch;

    const token = await getStartPageToken(mockEnv, 'access');
    expect(token).toBe('new_token_456');

    global.fetch = origFetch;
  });
});
