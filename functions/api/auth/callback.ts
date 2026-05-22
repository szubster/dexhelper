import { signJwt } from './_jwt';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${url.origin}/api/auth/callback`;
  const approvedEmail = env.APPROVED_USER_EMAIL;
  const jwtSecret = env.JWT_SECRET;

  if (!clientId || !clientSecret || !approvedEmail || !jwtSecret) {
    return new Response('Authentication is not fully configured', { status: 500 });
  }

  try {
    // 1. Exchange code for token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      console.error('Token exchange failed:', err);
      return new Response('Failed to exchange authorization code', { status: 400 });
    }

    const tokenData = await tokenResponse.json<{ access_token: string }>();

    // 2. Fetch user profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      return new Response('Failed to fetch user profile', { status: 500 });
    }

    const profileData = await profileResponse.json<{ id: string; email: string }>();

    // 3. Verify email
    if (profileData.email !== approvedEmail) {
      return new Response('Unauthorized user', { status: 401 });
    }

    // 4. Create session (JWT)
    const token = await signJwt(
      {
        sub: profileData.id,
        email: profileData.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      },
      jwtSecret
    );

    // 5. Set cookie and redirect
    const headers = new Headers();
    headers.set('Set-Cookie', `session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`);
    headers.set('Location', '/');

    return new Response(null, {
      status: 302,
      headers,
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  APPROVED_USER_EMAIL: string;
  JWT_SECRET: string;
}
