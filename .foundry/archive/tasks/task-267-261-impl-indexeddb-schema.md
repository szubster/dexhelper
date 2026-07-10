---
id: task-267-261-impl-indexeddb-schema
type: TASK
title: Implement SaveHistoryDB IndexedDB Schema
status: COMPLETED
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-130-267-define-indexeddb-schema
tags:
  - storage
  - indexeddb
  - schema
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement SaveHistoryDB IndexedDB Schema

## Context
We need to define a new IndexedDB schema (`SaveHistoryDB`) to store save files. This database will run alongside the existing `PokeDB` (which is used for read-only static game data). The new database will be used for persisting the user's sequential save states.

## Acceptance Criteria
- [x] In `src/db/schema.ts`, define a new constant `SAVE_HISTORY_DB_CONFIG` containing:
  - `NAME`: 'SaveHistoryDB'
  - `VERSION`: 1
  - `STORES`: `{ SAVES: 'saves', METADATA: 'metadata', INDEXES: 'indexes' }`
- [x] In `src/db/schema.ts`, define the TypeScript interface `SaveHistoryDBSchema` extending `DBSchema` from `idb`.
  - The `saves` store should store save files.
  - The `metadata` store should store metadata.
  - The `indexes` store should store indexes for efficient retrieval.
- [x] The coder is responsible for self-verifying these changes by running `pnpm test` and ensuring no regressions, as this is a low-risk structural typing task.

## Rules
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
