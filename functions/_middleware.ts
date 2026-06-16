import cloudflareAccessPlugin from '@cloudflare/pages-plugin-cloudflare-access';

interface Env {
  CF_ACCESS_DOMAIN: string;
  CF_ACCESS_AUD: string;
}

export const onRequest: PagesFunction<Env>[] = [
  (context) => {
    if (!context.env.CF_ACCESS_DOMAIN || !context.env.CF_ACCESS_AUD) {
      return context.next();
    }

    // Type casting to appease TS as CF_ACCESS_DOMAIN could technically be any string
    const domain = context.env.CF_ACCESS_DOMAIN as `https://${string}.cloudflareaccess.com`;

    return cloudflareAccessPlugin({
      domain,
      aud: context.env.CF_ACCESS_AUD,
    })(context);
  }
];
