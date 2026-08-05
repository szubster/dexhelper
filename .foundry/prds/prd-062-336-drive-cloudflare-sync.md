---
id: prd-062-336-drive-cloudflare-sync
type: PRD
title: Google Drive and Cloudflare Server-Side Sync
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-21'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-062-drive-cloudflare-sync
tags:
  - feature
  - sync
  - backend
  - cloudflare
  - android
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Google Drive and Cloudflare Server-Side Sync

## Context
While the local File System Access API is ideal for desktop emulation, mobile emulator devices (such as Android phones) rely heavily on background syncing to cloud providers like Google Drive. The Web File System Access API has severe limitations on Android, particularly when trying to persistently access folders managed by third-party sync apps (like Google Drive) due to Android's Storage Access Framework (SAF) constraints.

## Objective
To provide seamless auto-sync for Android emulator users, bypassing the local filesystem constraints by connecting their cloud storage directly to our proposed Cloudflare backend (as outlined in IDEA-055).

## Proposed Solution: Server-Side Integration

This approach involves linking the user's Google Drive account directly with the Cloudflare backend to monitor and retrieve `.sav` files.

1. **Server-Side Authentication:**
   - Implement an OAuth 2.0 flow within the Cloudflare worker to allow users to securely authenticate their Google Drive account.
   - Store access and refresh tokens securely in the backend.

2. **File Monitoring (Webhooks / Polling):**
   - The Cloudflare backend will monitor the user's connected Google Drive folder for any updates to `.sav` files.
   - Preferably, use Google Drive Push Notifications (webhooks) to receive instant updates when a file changes. If webhooks are not viable due to Cloudflare Worker constraints, implement a polling mechanism.

3. **Automated Sync Mechanism:**
   - Upon detecting a new or modified `.sav` file, the Cloudflare worker will download the file from Google Drive and sync it to our backend storage (e.g., Cloudflare D1/R2).
   - The backend will then push or notify the user's active DexHelper client via the standard sync mechanism, updating the live tracker.

## Alternative Solution: Minimal Android Companion App

Instead of a server-side Google Drive integration, we could develop a minimal native Android companion application.

1. **Native File Access:**
   - The app would run in the background on the emulator device and use native Android APIs to monitor local folders where the emulator writes `.sav` files, bypassing SAF limitations of the web browser.
2. **Direct Push to Backend:**
   - Upon detecting file changes, the app will push the updated `.sav` files directly to the Cloudflare backend via API.
3. **Trade-offs:**
   - This approach bypasses Google Drive entirely and relies on local device storage.
   - However, it introduces the overhead of developing, distributing, and maintaining an Android application across various OS versions.

## Value Proposition
Implementing this feature ensures that users playing on dedicated Android emulators or their phones can enjoy a real-time "live tracker" experience. It removes the blocking limitations of mobile browser APIs and solidifies the multi-device, cloud-first vision for DexHelper.

## Acceptance Criteria
- [x] Research the feasibility and limitations of Google Drive Webhooks within Cloudflare Workers.
- [x] Determine the exact architectural path: Server-Side Integration vs. Android Companion App (requires Architect input/ADR).
- [x] epic-062-000-implement-cloudflare-drive-sync (Placeholder for downstream epic once path is decided)
- [ ] research-336-400-cloudflare-drive-webhooks
- [ ] task-336-401-architect-drive-sync-adr
- [ ] epic-336-402-implement-cloudflare-drive-sync
