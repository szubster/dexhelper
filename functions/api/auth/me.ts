export const onRequestGet: PagesFunction<Env> = async (context) => {
  // @cloudflare/pages-plugin-cloudflare-access injects the verified payload into context.data.cloudflareAccess
  const accessData = context.data["cloudflareAccess"] as { JWT: { payload: unknown } } | undefined;

  if (!accessData || !accessData.JWT) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  // The payload typically includes identity information from Cloudflare Access.
  return new Response(JSON.stringify({ user: accessData.JWT.payload }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
