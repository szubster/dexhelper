import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction<Env> = async (context) => {
  return cloudflareAccessPlugin({
    domain: context.env.CLOUDFLARE_ACCESS_DOMAIN as `https://${string}.cloudflareaccess.com`,
    aud: context.env.CLOUDFLARE_ACCESS_AUD,
  })(context);
};
