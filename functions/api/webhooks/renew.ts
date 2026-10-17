import type { PagesFunction } from '@cloudflare/workers-types';
import type { Env } from '../../types/env';
import { renewWebhooks } from '../../utils/webhook-renewal';

export const onRequest: PagesFunction<Env> = async (context) => {
  // In a real app, this would be protected by a cron trigger or an internal auth header
  // Since Cloudflare Pages Functions don't support Cron Triggers directly yet,
  // we expose it as a webhook endpoint that a separate Cloudflare Worker (or GitHub Action) can ping.

  // Protect the endpoint (basic check against webhook secret to prevent abuse)
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
