import type { PagesFunction } from '@cloudflare/workers-types';
import cloudflareAccessPlugin from '@cloudflare/pages-plugin-cloudflare-access';
import type { Env } from './types/env';
import { onRequestGet as googleVerification } from './google-verification';

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // Intercept Google domain verification files BEFORE Access Plugin
  if (url.pathname.match(/\/google([a-z0-9]+)\.html$/)) {
    return googleVerification(context);
  }

  // Intercept webhook callbacks BEFORE Access Plugin (webhooks don't have access tokens)
  if (url.pathname === '/api/webhooks/drive') {
     return context.next();
  }

  const domain = (context.env.CLOUDFLARE_ACCESS_DOMAIN || 'https://szubster.cloudflareaccess.com') as `https://${string}.cloudflareaccess.com`;
  const aud = context.env.CLOUDFLARE_ACCESS_AUD || '65231c51724283c7eaebc07dff1e505cc3b067dcf7275005d5351aab2a1b7454';

  return cloudflareAccessPlugin({
    domain,
    aud,
  })(context);
};
