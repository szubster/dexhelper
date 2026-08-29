---
id: adr-336-033-server-side-drive-sync
type: ADR
title: 'ADR 033: Server-Side Integration vs. Android Companion App for Drive Sync'
status: COMPLETED
owner_persona: architect
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-062-336-drive-cloudflare-sync
tags:
  - adr
  - architecture
  - sync
research_references:
  - research-336-400-cloudflare-drive-webhooks
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 033: Server-Side Integration vs. Android Companion App for Drive Sync

## Status
Accepted

## Context
As defined in `prd-062-336-drive-cloudflare-sync`, we are exploring two potential architectural paths for supporting `.sav` file synchronization on mobile emulators: Server-Side Integration and Minimal Android Companion App.

Our research (`research-336-400-cloudflare-drive-webhooks`) determined that Cloudflare Workers can robustly handle Google Drive Push Notifications (webhooks). A verified custom domain on Cloudflare with a DNS TXT record satisfies Google's verification requirements.

## Decision
We will proceed with the **Server-Side Integration** path connecting Google Drive to Cloudflare Workers.

We reject the Minimal Android Companion App approach to avoid the maintenance overhead of developing, distributing, and maintaining an application across various Android OS versions.

For the Server-Side Integration, we will rely on Google Drive webhooks as the primary sync mechanism.

## Consequences
- Cloudflare workers must be configured with verified custom domains to register Google Drive push channels.
- Cloudflare Worker limits must be closely monitored when downloading larger .sav files.
