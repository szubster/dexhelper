import type { R2Bucket } from '@cloudflare/workers-types';

export interface Env {
  SAVES_BUCKET: R2Bucket;
  GOOGLE_DRIVE_CLIENT_ID: string;
  GOOGLE_DRIVE_CLIENT_SECRET: string;
  GOOGLE_DRIVE_REFRESH_TOKEN: string;
  GOOGLE_DRIVE_WEBHOOK_SECRET: string;
  CLOUDFLARE_ACCESS_DOMAIN?: string;
  CLOUDFLARE_ACCESS_AUD?: string;
}
