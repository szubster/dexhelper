---
id: idea-062-drive-cloudflare-sync
type: IDEA
title: Google Drive and Cloudflare Server-Side Sync
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-21'
updated_at: '2026-07-21'
depends_on: []
jules_session_id: '14567517025638071445'
pr_number: null
parent: null
tags:
  - feature
  - sync
  - backend
  - cloudflare
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Idea: Google Drive and Cloudflare Server-Side Sync

## Context
While the local File System Access API (IDEA-061) is great for desktop emulation, mobile emulator devices (like Android phones) rely heavily on background syncing to cloud providers like Google Drive. Unfortunately, the Web File System Access API has severe limitations on Android, particularly when trying to persistently access folders managed by third-party sync apps (like Google Drive) due to Android's Storage Access Framework (SAF) constraints.

## Proposal
To provide seamless auto-sync for Android emulator users, we need to bypass the local filesystem constraints and connect their cloud storage directly to our proposed Cloudflare backend (IDEA-055).

1. **Server-Side Integration:** Allow users to authenticate their Google Drive account via our Cloudflare worker.
2. **Webhooks / Polling:** The Cloudflare backend will monitor the user's connected Drive folder for `.sav` file updates.
3. **Automated Sync:** When a new save is detected on Drive, Cloudflare will automatically sync it to our backend storage, which in turn will update the user's DexHelper client via the standard sync mechanism.

**Alternative Approach (Companion App):**
Instead of server-side Drive integration, we could develop a minimal Android companion app. This app would run in the background on the emulator device, detect file changes natively, and push them to the Cloudflare backend. While potentially harder to maintain across different Android versions, it would bypass Drive entirely.

## Value Proposition
This ensures that users playing on dedicated Android emulators or their phones can enjoy a "live tracker" experience without being blocked by mobile browser API limitations, further solidifying the multi-device vision established in IDEA-055.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
