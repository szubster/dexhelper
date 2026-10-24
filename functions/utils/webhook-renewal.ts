import type { Env } from '../types/env';
import { getGoogleDriveAccessToken } from './google-drive-auth';
import { getActiveChannels, saveActiveChannels, getStartPageToken, type WebhookChannel } from './webhook-manager';

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/changes/watch';
// Default Google Drive webhook expiration is typically a few days. We'll renew if expiring in < 24 hours.
const RENEWAL_THRESHOLD_MS = 24 * 60 * 60 * 1000;

export async function renewWebhooks(env: Env, baseUrl?: string): Promise<{ renewed: number; failed: number }> {
  const channels = await getActiveChannels(env);
  const now = Date.now();

  let token: string | null = null;
  const newChannels: WebhookChannel[] = [];

  let renewedCount = 0;
  let failedCount = 0;

  for (const channel of channels) {
    // If it's not expiring soon, keep it as is
    if (channel.expiration - now > RENEWAL_THRESHOLD_MS) {
      newChannels.push(channel);
      continue;
    }

    // Lazy load token
    if (!token) {
      try {
        token = await getGoogleDriveAccessToken(env);
      } catch {
        // If we can't get token, we can't renew anything. Keep old channels.
        return { renewed: 0, failed: channels.length };
      }
    }

    // Stop the old channel
    try {
      await fetch('https://www.googleapis.com/drive/v3/channels/stop', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: channel.channelId,
          resourceId: channel.resourceId
        })
      });
    } catch {
      // Ignore stop errors (e.g. already expired)
    }

    // Create a new channel
    try {
      const pageToken = await getStartPageToken(env, token);
      const newChannelId = `dexhelper-sync-${crypto.randomUUID()}`;
      const newExpiration = now + (3 * 24 * 60 * 60 * 1000); // 3 days from now

      const webhookAddress = baseUrl ? `${baseUrl}/api/webhooks/drive` : 'https://dexhelper.com/api/webhooks/drive';

      const response = await fetch(DRIVE_API_URL + '?pageToken=' + encodeURIComponent(pageToken), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: newChannelId,
          type: 'web_hook',
          address: webhookAddress,
          expiration: newExpiration
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create channel: ${response.status}`);
      }

      const data = await response.json() as any;

      newChannels.push({
        channelId: data.id,
        resourceId: data.resourceId,
        expiration: parseInt(data.expiration, 10)
      });
      renewedCount++;
    } catch {
      failedCount++;
      // If we failed to renew, we might lose it, but keep the old one just in case we can retry?
      // Actually, if it failed, we'll try again next cron run. Keep it.
      newChannels.push(channel);
    }
  }

  if (renewedCount > 0 || failedCount > 0) {
    await saveActiveChannels(env, newChannels);
  }

  return { renewed: renewedCount, failed: failedCount };
}
