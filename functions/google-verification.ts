import type { PagesFunction } from '@cloudflare/workers-types';
import type { Env } from './types/env';

export const onRequestGet: PagesFunction<Env> = async ({ request }) => {
  const url = new URL(request.url);
  const match = url.pathname.match(/\/google([a-z0-9]+)\.html$/);

  if (match) {
    return new globalThis.Response(`google-site-verification: google${match[1]}.html`, {
      headers: {
        'Content-Type': 'text/html'
      },
      status: 200
    }) as any;
  }

  return new globalThis.Response('Not found', { status: 404 }) as any;
};
