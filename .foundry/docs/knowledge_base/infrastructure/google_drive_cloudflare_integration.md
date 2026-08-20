# Google Drive & Cloudflare Workers Integration

This document outlines architectural constraints and facts when integrating Google Drive Push Notifications (webhooks) with Cloudflare Workers.

## Domain Verification
- Google Drive webhooks require a verified domain.
- Cloudflare Workers can serve as the webhook endpoint if a custom domain is mapped to the worker.
- The most robust verification method is using a DNS TXT record for the custom domain within Cloudflare.

## Execution Time Mitigation
- Cloudflare Workers have strict CPU limits (10ms-50ms).
- The webhook payload from Google Drive is lightweight and only contains metadata (resource IDs, state changes), not the file itself.
- Downloading and processing `.sav` files via the Drive API inside the worker risks hitting the execution time limit.
- **Rule:** The Worker MUST use `ctx.waitUntil()` to asynchronously download and process the `.sav` file. The Worker MUST immediately respond to the webhook with a 200 OK to prevent Google from retrying the request and to free up the main execution thread.

## Polling Constraints
- If webhooks are not used, Cloudflare Scheduled Workers (Cron Triggers) can be used for polling.
- The minimum interval for Cron Triggers is 1 minute.
- **Limitation:** A 1-minute polling interval introduces latency that degrades the "live tracker" experience and can rapidly consume Google Drive API quotas. Webhooks are the preferred architecture.
