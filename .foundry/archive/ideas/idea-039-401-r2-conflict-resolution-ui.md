---
id: idea-039-401-r2-conflict-resolution-ui
type: IDEA
title: Cloudflare R2 Conflict Resolution UI
status: COMPLETED
owner_persona: product_manager
created_at: '2026-08-06'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-030-039-cloudflare-r2-save-sync
tags:
  - ui
  - sync
  - ux
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---
# Idea: Cloudflare R2 Conflict Resolution UI

## Context
During the implementation of Cloudflare R2 offline-first save syncing (epic-030-039-cloudflare-r2-save-sync), a timestamp-based last-write-wins strategy was implemented. While functional, silently overwriting game saves can be too aggressive and result in data loss if a user has desynced progress on two devices.

## Proposal
Implement a UI prompt when a conflict is detected. The prompt should allow the user to select whether they want to keep their local save, pull the remote save, or merge/compare them if possible. This guarantees the user has final say over which progression state is canonical.

## Acceptance Criteria
- [x] prd-401-340-r2-conflict-resolution-ui
