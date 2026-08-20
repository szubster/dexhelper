---
id: research-336-400-cloudflare-drive-webhooks
type: RESEARCH
title: 'Research: Google Drive Webhooks on Cloudflare Workers'
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-05'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-062-336-drive-cloudflare-sync
tags:
  - research
  - cloudflare
  - google-drive
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Google Drive Webhooks on Cloudflare Workers

## Context
As outlined in the PRD `prd-062-336-drive-cloudflare-sync`, we need to implement server-side sync for `.sav` files using Google Drive and a Cloudflare backend. Before determining the architectural path, we must understand the feasibility and limitations of receiving Google Drive Push Notifications (webhooks) directly inside Cloudflare Workers.

## Objective
Investigate if Cloudflare Workers can robustly handle Google Drive Webhooks.

## Key Questions
1. **Webhook Registration:** How does Google Drive register webhooks, and can a Cloudflare Worker fulfill the domain verification/registration requirements?
2. **Payload & Execution:** Does Cloudflare Worker's execution time limit pose a problem for handling potentially bursts of webhook notifications?
3. **Polling Fallback:** If webhooks are not viable, what are the rate limits and overhead of implementing a polling mechanism for Google Drive API within a Cloudflare Worker?

## Acceptance Criteria
 - [x] Document findings on the feasibility of Google Drive Webhooks on Cloudflare Workers.
 - [x] Document any limitations or workarounds discovered.
 - [x] Determine if a polling fallback is necessary and document its feasibility.

## Findings

### Webhook Registration
Google Drive Push Notifications (webhooks) require a verified domain. Cloudflare Workers can act as the webhook endpoint, provided the custom domain mapped to the Worker is verified in Google Search Console. Google Drive verifies ownership by requiring a specific `google-site-verification` HTML file or meta tag, or a DNS TXT record. Using a custom domain with a DNS TXT record on Cloudflare is the most robust way to achieve this for a Worker.

### Payload & Execution Limitations
Cloudflare Workers have strict CPU time limits (10ms-50ms depending on the plan, though Unbound allows more). A Google Drive webhook payload is a lightweight HTTP POST request containing resource IDs and state change information, not the file payload itself. The Worker must then use the Drive API to fetch the updated `.sav` file.
The primary risk is the execution time limit when downloading and processing the `.sav` file. If the file is large or processing takes too long, the Worker might timeout. To mitigate this, the Worker can use `ctx.waitUntil()` to perform the download and sync asynchronously, responding to Google's webhook immediately with a 200 OK to prevent retries and avoid blocking.

### Polling Fallback
If webhooks are deemed too complex to maintain (e.g., handling push channel expirations which happen frequently with Drive API), polling is a viable fallback. However, Cloudflare Workers do not have a built-in `setInterval`. A Scheduled Worker (Cron Trigger) can run every minute.
Polling introduces latency (up to 1 minute delay) and rapidly consumes Google Drive API quota if querying frequently for changes across many users. Given the "live tracker" requirement, a 1-minute polling interval might degrade the user experience compared to webhooks. Therefore, Webhooks are highly recommended, despite the added complexity of managing push channels.
