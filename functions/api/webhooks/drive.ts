import type { PagesFunction } from '@cloudflare/workers-types';
import type { Env } from '../../types/env';
import { getActiveChannels, saveActiveChannels } from '../../utils/webhook-manager';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const resourceState = request.headers.get('x-goog-resource-state');

  if (resourceState === 'sync') {
    return new globalThis.Response('Sync successful', { status: 200 }) as any;
  }

  if (resourceState === 'update' || resourceState === 'add') {
    return new globalThis.Response('Webhook received', { status: 200 }) as any;
  }

  // Safe body parsing
  let body: any = null;
  try {
    const text = await request.text();
    if (text) {
      body = JSON.parse(text);
    }
  } catch {
    // ignore parse errors
  }

  // Handle registration request ONLY if it contains our secret and is properly formatted
  // Though this endpoint bypasses Access, we still need basic protection for the registration flow
  if (body?.register && body.fileId && body.token) {
    const fileId = encodeURIComponent(body.fileId);
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/watch`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${body.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          type: 'web_hook',
          address: `${new URL(request.url).origin}/api/webhooks/drive`
        })
      });
      if (!response.ok) {
        return new globalThis.Response('Failed to register', { status: response.status }) as any;
      }
      const result = await response.json() as any;
      const channels = await getActiveChannels(env);
      channels.push({ channelId: result.id, resourceId: result.resourceId, expiration: parseInt(result.expiration, 10) });
      await saveActiveChannels(env, channels);
      return new globalThis.Response(JSON.stringify(result), { status: response.status }) as any;
    } catch {
      return new globalThis.Response('Failed to register', { status: 500 }) as any;
    }
  }

  return new globalThis.Response('Unhandled state', { status: 200 }) as any;
};
