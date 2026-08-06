---
id: epic-030-039-cloudflare-r2-save-sync
type: EPIC
title: Cloudflare R2 Offline-First Save Syncing
status: ACTIVE
owner_persona: auditor
created_at: '2026-05-21'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: '6871811641807749271'
pr_number: null
parent: prd-055-030-cloudflare-auth-sync
tags:
  - backend
  - sync
  - cloudflare
  - r2
  - phase1
research_references:
  - research-030-004-cloudflare-storage-evaluation
rejection_count: 2
rejection_reason: ''
notes: >-
  Derived from PRD 055-030 and Research 030-004. Uses Cloudflare R2 for strong
  consistency and file blob storage.
---
# Epic: Cloudflare R2 Offline-First Save Syncing

## Context
Following the establishment of a secure authentication layer, the application needs a mechanism to synchronize user save data across devices while maintaining its core offline-first browser architecture. Based on research (Research 030-004), Cloudflare R2 is the chosen backend storage solution due to its strong read-after-write consistency and high free tier limits for write operations.

## Requirements
- Establish backend infrastructure using Cloudflare R2 to store user save files.
- Implement cross-device synchronization: Pull save data from R2 upon successful login on a new device.
- Push local save file changes to R2 periodically or on explicit save actions.
- Implement offline-first synchronization logic, including handling potential conflicts between offline browser changes and the remote R2 state.
- Ensure graceful degradation so save files continue to use local browser storage without errors when Cloudflare is unavailable (e.g., hosted on GitHub pages).

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into Stories.
- [x] story-039-262-r2-client-infrastructure
- [x] story-039-263-r2-pull-sync-logic
- [x] story-039-264-r2-push-sync-logic
- [x] story-039-265-r2-offline-conflict-resolution
- [x] story-039-266-r2-graceful-degradation
- [x] story-039-356-r2-sync-e2e
