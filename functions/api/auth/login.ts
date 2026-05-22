export const onRequest: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  const clientId = env.GOOGLE_CLIENT_ID;
  const redirectUri = `${new URL(request.url).origin}/api/auth/callback`;

  if (!clientId) {
    return new Response('Google OAuth is not configured', { status: 500 });
  }

  const state = crypto.randomUUID();

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'email profile');
  authUrl.searchParams.set('state', state);

  return Response.redirect(authUrl.toString(), 302);
};

interface Env {
  GOOGLE_CLIENT_ID: string;
}
