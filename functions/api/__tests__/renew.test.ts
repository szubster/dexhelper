import { describe, it, expect, vi } from 'vitest';
import { onRequest } from '../webhooks/renew';
import { renewWebhooks } from '../../utils/webhook-renewal';
import type { EventContext } from '@cloudflare/workers-types';
import type { Env } from '../../types/env';

vi.mock('../../utils/webhook-renewal', () => ({
  renewWebhooks: vi.fn<any>()
}));

describe('renew endpoint', () => {
  it('returns 401 if unauthorized', async () => {
    const context = {
      request: {
        headers: new Headers()
      },
      env: {
        GOOGLE_DRIVE_WEBHOOK_SECRET: 'my-secret'
      }
    } as unknown as EventContext<Env, string, Record<string, unknown>>;

    const response = await onRequest(context) as unknown as Response;
    expect(response.status).toBe(401);
  });

  it('returns 200 on success', async () => {
    const context = {
      request: {
        url: 'https://test.com/api/webhooks/renew',
        headers: new Headers({
          'Authorization': 'Bearer my-secret'
        })
      },
      env: {
        GOOGLE_DRIVE_WEBHOOK_SECRET: 'my-secret'
      }
    } as unknown as EventContext<Env, string, Record<string, unknown>>;

    (renewWebhooks as any).mockResolvedValue({ renewed: 1, failed: 0 });

    const response = await onRequest(context) as unknown as Response;
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toBe(JSON.stringify({ renewed: 1, failed: 0 }));

    expect(renewWebhooks).toHaveBeenCalledWith(context.env, 'https://test.com');
  });
});
