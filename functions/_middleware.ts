import type { PagesFunction } from '@cloudflare/workers-types';
import cloudflareAccessPlugin from '@cloudflare/pages-plugin-cloudflare-access';

export const onRequest: PagesFunction = cloudflareAccessPlugin({
  domain: 'https://szubster.cloudflareaccess.com',
  aud: '65231c51724283c7eaebc07dff1e505cc3b067dcf7275005d5351aab2a1b7454',
});
