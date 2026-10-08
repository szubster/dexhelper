---
id: task-638-658-client-db-jsonl-loader-db-impl
type: TASK
title: Implement Bulk DB Fetching for JSONL Data
status: COMPLETED
owner_persona: coder
confidence_score: 100
created_at: '2026-10-03'
updated_at: '2026-10-07'
depends_on:
  - story-088-637-vite-jsonl-plugin-update
jules_session_id: null
pr_number: null
parent: story-088-638-client-db-jsonl-loader
tags:
  - db
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Bulk DB Fetching for JSONL Data

## Context
With the Vite plugin now capable of bundling \`.jsonl\` files, the application runtime needs to be updated to load this data efficiently.

## Acceptance Criteria
- [x] Add `getItemsBulk` and `getMovesBulk` methods to `src/db/PokeDB.ts` that utilize the `bulkGet` utility to fetch multiple records in a single database transaction.
- [x] Ensure the mapped results match the requested array lengths and positions, returning `Error` instances for not-found entries.
- [x] Add unit tests in `src/db/__tests__/PokeDB.test.ts` for `getItemsBulk` and `getMovesBulk`.
- [x] Verify that missing identifiers correctly return an Error object instead of blowing up the application.
