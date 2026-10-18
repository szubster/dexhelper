import type { PagesFunction } from '@cloudflare/workers-types';
import type { Env } from '../../types/env';
import { renewWebhooks } from '../../utils/webhook-renewal';

export const onRequest: PagesFunction<Env> = async (context) => {
  // We use this as a secure HTTP endpoint to trigger renewal logic.
  // In Cloudflare Workers this could be a 'scheduled' handler, but for Pages file-based routing
  // an HTTP endpoint protected by a secret works nicely and can be triggered by external cron services.

  const authHeader = context.request.headers.get('Authorization');
  if (authHeader !== `Bearer ${context.env.GOOGLE_DRIVE_WEBHOOK_SECRET}`) {
      return new globalThis.Response('Unauthorized', { status: 401 }) as any;
  }

  try {
    const url = new URL(context.request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const result = await renewWebhooks(context.env, baseUrl);
    return new globalThis.Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }) as any;
  } catch (error: any) {
    return new globalThis.Response(error.message, { status: 500 }) as any;
  }
};
