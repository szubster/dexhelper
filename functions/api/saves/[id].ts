import type { PagesFunction, R2Bucket } from '@cloudflare/workers-types';
import type { PluginData } from '@cloudflare/pages-plugin-cloudflare-access';

interface Env {
  SAVES_BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env, 'id', PluginData> = async ({ env, params, data }) => {
  const email = data.cloudflareAccess?.JWT?.payload?.email;
  if (!email) return new globalThis.Response('Unauthorized', { status: 401 }) as any;
  const id = params.id as string;
  const object = await env.SAVES_BUCKET.get(`${email}/${id}`);
  if (!object) return new globalThis.Response('Not Found', { status: 404 }) as any;
  const headers = new Headers();
  object.writeHttpMetadata(headers as any);
  headers.set('etag', object.httpEtag);

  if (object.customMetadata?.['client-last-modified']) {
    headers.set('client-last-modified', object.customMetadata['client-last-modified']);
  }

  return new globalThis.Response(object.body as unknown as ReadableStream, { headers }) as any;
};

export const onRequestPut: PagesFunction<Env, 'id', PluginData> = async ({ request, env, params, data }) => {
  const email = data.cloudflareAccess?.JWT?.payload?.email;
  if (!email) return new globalThis.Response('Unauthorized', { status: 401 }) as any;
  const id = params.id as string;

  const clientLastModified = request.headers.get('client-last-modified');

  const customMetadata: Record<string, string> = {};
  if (clientLastModified) {
    customMetadata['client-last-modified'] = clientLastModified;
  }

  await env.SAVES_BUCKET.put(`${email}/${id}`, request.body as any, {
    customMetadata
  });
  return new globalThis.Response('Created', { status: 201 }) as any;
};
