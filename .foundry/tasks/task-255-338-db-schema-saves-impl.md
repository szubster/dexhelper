---
id: task-255-338-db-schema-saves-impl
type: TASK
title: Database Schema for Multiple Saves
status: READY
owner_persona: coder
created_at: '2026-07-21'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-036-255-progression-save-model
tags:
  - backend
  - progression
  - database
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Database Schema for Multiple Saves

## Context
To support progression tracking and multiple save files per playthrough, we need to update our offline-first database schema (using IndexedDB/Dexie or equivalent) to model the relationships between a Trainer/Playthrough and their multiple save states over time.

## Requirements
- Update the `SaveHistoryDB` schema in `src/db/schema.ts` to support version 2.
- Define a new `trainers` store (or `playthroughs` store) with a unique primary key to model Trainer profiles/playthroughs.
- Update the `saves` store (or related indexes) to include a foreign key or index (e.g., `trainerId` or `playthroughId`) to establish a one-to-many relationship with their respective save history.
- Ensure the schema structures are serializable and structured appropriately to support future syncing with the Cloudflare backend.

## Acceptance Criteria
- [ ] Update `SAVE_HISTORY_DB_CONFIG.VERSION` to 2 in `src/db/schema.ts`.
- [ ] Add the `trainers` object store to `SaveHistoryDBSchema`.
- [ ] Add the necessary indexes to the `saves` store to establish relationships to the `trainers` store.
