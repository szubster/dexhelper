import type { PagesFunction } from '@cloudflare/workers-types';
import cloudflareAccessPlugin from '@cloudflare/pages-plugin-cloudflare-access';

interface Env {
  CLOUDFLARE_ACCESS_DOMAIN?: string;
  CLOUDFLARE_ACCESS_AUD?: string;
}

export const onRequest: PagesFunction<Env> = (context) => {
  const domain = (context.env.CLOUDFLARE_ACCESS_DOMAIN || 'https://szubster.cloudflareaccess.com') as `https://${string}.cloudflareaccess.com`;
  const aud = context.env.CLOUDFLARE_ACCESS_AUD || '65231c51724283c7eaebc07dff1e505cc3b067dcf7275005d5351aab2a1b7454';

  return cloudflareAccessPlugin({
    domain,
    aud,
  })(context);
};
