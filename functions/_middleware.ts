import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";

interface Env {
  CF_ACCESS_DOMAIN: `https://${string}.cloudflareaccess.com`;
  CF_ACCESS_AUDIENCE: string;
}

export const onRequest: PagesFunction<Env>[] = [
  (context) => {
    return cloudflareAccessPlugin({
      domain: context.env.CF_ACCESS_DOMAIN,
      aud: context.env.CF_ACCESS_AUDIENCE,
    })(context);
  }
];
