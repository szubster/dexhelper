import type { EventContext } from '@cloudflare/workers-types';
import { describe, expect, it, vi } from 'vitest';
import { onRequestPost } from '../../../functions/api/webhooks/drive';
import { onRequestGet } from '../../../functions/google-verification';
import type { Env } from '../../../functions/types/env';

describe('Drive Webhooks API', () => {
  it('handles sync state correctly', async () => {
    const request = new Request('http://localhost/api/webhooks/drive', {
      method: 'POST',
      headers: {
        'x-goog-resource-state': 'sync',
      },
    });

    const ctx = {
      request,
      env: {} as Env,
      waitUntil: vi.fn<() => void>(),
      next: vi.fn<() => void>(),
      data: {},
    } as unknown as EventContext<Env, string, Record<string, unknown>>;

    const response = await onRequestPost(ctx);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Sync successful');
  });

  it('handles update state correctly', async () => {
    const request = new Request('http://localhost/api/webhooks/drive', {
      method: 'POST',
      headers: {
        'x-goog-resource-state': 'update',
      },
    });

    const ctx = {
      request,
      env: {} as Env,
      waitUntil: vi.fn<() => void>(),
      next: vi.fn<() => void>(),
      data: {},
    } as unknown as EventContext<Env, string, Record<string, unknown>>;

    const response = await onRequestPost(ctx);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Webhook received');
  });

  it('handles verification get request via google-verification handler', async () => {
    const request = new Request('http://localhost/google123456789.html', {
      method: 'GET',
    });

    const ctx = {
      request,
      env: {} as Env,
      waitUntil: vi.fn<() => void>(),
      next: vi.fn<() => void>(),
      data: {},
    } as unknown as EventContext<Env, string, Record<string, unknown>>;

    const response = await onRequestGet(ctx);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('google-site-verification: google123456789.html');
  });

  it('handles webhook registration securely', async () => {
    // Mock global fetch
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ id: 'channel-id' }),
    } as unknown as Response) as unknown as typeof fetch;

    const request = new Request('http://localhost/api/webhooks/drive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        register: true,
        fileId: '../../../test-file-id',
        token: 'test-token',
      }),
    });

    const ctx = {
      request,
      env: {} as Env,
      waitUntil: vi.fn<() => void>(),
      next: vi.fn<() => void>(),
      data: {},
    } as unknown as EventContext<Env, string, Record<string, unknown>>;

    const response = await onRequestPost(ctx);
    expect(response.status).toBe(200);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.googleapis.com/drive/v3/files/..%2F..%2F..%2Ftest-file-id/watch',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });
});
