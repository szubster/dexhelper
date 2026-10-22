import type { ExecutionContext, ScheduledEvent } from '@cloudflare/workers-types';
import type { Env } from './types/env';
import { renewWebhooks } from './utils/webhook-renewal';

export default {
  async fetch(request: Request, env: Env) {
    // Pass standard fetch requests to the Pages file-based router.
    // The ASSETS binding gives us access to the static assets and file-based API routes
    return (env as any).ASSETS.fetch(request);
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    // Cloudflare Cron Trigger entry point
    ctx.waitUntil(renewWebhooks(env));
  }
};
