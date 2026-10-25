import type { Env } from '../types/env';

export interface WebhookChannel {
  channelId: string;
  resourceId: string;
  expiration: number;
}

export async function getActiveChannels(env: Env): Promise<WebhookChannel[]> {
  const result = await env.SAVES_BUCKET.get('webhook_channels.json');
  if (!result) return [];
  const text = await result.text();
  return JSON.parse(text) as WebhookChannel[];
}

export async function saveActiveChannels(env: Env, channels: WebhookChannel[]): Promise<void> {
  await env.SAVES_BUCKET.put('webhook_channels.json', JSON.stringify(channels));
}

export async function getStartPageToken(env: Env, accessToken: string): Promise<string> {
  const result = await env.SAVES_BUCKET.get('drive_page_token.json');
  if (result) {
      const text = await result.text();
      try {
        const parsed = JSON.parse(text);
        if (parsed.pageToken) {
            return parsed.pageToken;
        }
      } catch {
          // ignore
      }
  }

  // Fetch new start page token from google
  const response = await fetch('https://www.googleapis.com/drive/v3/changes/startPageToken', {
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  });

  if (!response.ok) {
      throw new Error(`Failed to get start page token: ${response.status}`);
  }

  const data = await response.json() as any;
  return data.startPageToken;
}
