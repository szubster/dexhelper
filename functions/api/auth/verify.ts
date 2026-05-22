import { verifyJwt } from './_jwt';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const jwtSecret = env.JWT_SECRET;

  if (!jwtSecret) {
    return new Response(JSON.stringify({ authenticated: false, error: 'Server not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => {
      const [key, ...v] = c.split('=');
      return [key, v.join('=')];
    })
  );

  const token = cookies['session'];

  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = await verifyJwt(token, jwtSecret);

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return new Response(JSON.stringify({ authenticated: false, error: 'Token expired' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(
      JSON.stringify({
        authenticated: true,
        user: {
          id: payload.sub,
          email: payload.email,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(JSON.stringify({ authenticated: false, error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

interface Env {
  JWT_SECRET: string;
}
