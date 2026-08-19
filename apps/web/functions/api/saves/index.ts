import type { PagesFunction, R2Bucket } from '@cloudflare/workers-types';
import type { PluginData } from '@cloudflare/pages-plugin-cloudflare-access';

interface Env {
  SAVES_BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env, any, PluginData> = async ({ env, data }) => {
  const email = data.cloudflareAccess?.JWT?.payload?.email;
  if (!email) {
    return new globalThis.Response('Unauthorized', { status: 401 }) as any;
  }

  const prefix = `${email}/`;
  const list = await env.SAVES_BUCKET.list({ prefix, include: ['customMetadata'] });
  const files = list.objects.map((obj: any) => ({
    id: obj.key.substring(prefix.length),
    lastModified: obj.customMetadata?.['client-last-modified'] ? parseInt(obj.customMetadata['client-last-modified'], 10) : undefined,
  }));

  return new globalThis.Response(JSON.stringify(files), {
    headers: { 'Content-Type': 'application/json' },
  }) as any;
};
