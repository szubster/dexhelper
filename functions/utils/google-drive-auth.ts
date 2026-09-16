import type { Env } from '../types/env';

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;

export async function getGoogleDriveAccessToken(env: Env): Promise<string> {
  const { GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN } = env;

  if (!GOOGLE_DRIVE_CLIENT_ID || !GOOGLE_DRIVE_CLIENT_SECRET || !GOOGLE_DRIVE_REFRESH_TOKEN) {
    throw new Error('Google Drive credentials are not fully configured in environment bindings.');
  }

  // Check if we have a valid cached token (with a 10s buffer)
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 10000) {
    return cachedToken.accessToken;
  }

  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const body = new URLSearchParams({
    client_id: GOOGLE_DRIVE_CLIENT_ID,
    client_secret: GOOGLE_DRIVE_CLIENT_SECRET,
    refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh Google Drive access token: ${response.status} ${errorText}`);
  }

  const data = await response.json() as { access_token: string; expires_in: number };

  cachedToken = {
    accessToken: data.access_token,
    // expires_in is in seconds, convert to ms
    expiresAt: now + (data.expires_in * 1000)
  };

  return data.access_token;
}
