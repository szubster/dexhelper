---
id: task-315-322-implement-savehistorydb
type: TASK
title: Implement SaveHistoryDB Initialization
status: READY
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-130-315-define-indexeddb-schema
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement SaveHistoryDB Initialization

## Overview
Implement the initialization logic for the `SaveHistoryDB` IndexedDB instance, aligning with the schema definitions already present in `src/db/schema.ts`.

## Context
The application uses IndexedDB to store save file history. The configuration and schema types (`SAVE_HISTORY_DB_CONFIG` and `SaveHistoryDBSchema`) are defined in `src/db/schema.ts`. We need a database wrapper/initialization module (similar to `src/db/SaveDB.ts`) for `SaveHistoryDB`.

## Technical Blueprint

1. Create a new file `src/db/SaveHistoryDB.ts`.
2. Import the `openDB` function from the `idb` library.
3. Import `SAVE_HISTORY_DB_CONFIG` and `SaveHistoryDBSchema` from `src/db/schema.ts`.
4. Implement a `getDB()` or similar function to initialize the database.
   - Use `SAVE_HISTORY_DB_CONFIG.NAME` and `SAVE_HISTORY_DB_CONFIG.VERSION`.
   - In the `upgrade` function, create the three required object stores if they don't exist:
     - `SAVE_HISTORY_DB_CONFIG.STORES.SAVES`
     - `SAVE_HISTORY_DB_CONFIG.STORES.METADATA`
     - `SAVE_HISTORY_DB_CONFIG.STORES.INDEXES`
5. Implement fallback mechanisms (like in `src/db/SaveDB.ts`) using a Map if IndexedDB is unavailable.

## Acceptance Criteria
- [ ] The `SaveHistoryDB` database is correctly initialized using `openDB` from `idb`.
- [ ] The `saves` object store is created during the upgrade process.
- [ ] The `metadata` object store is created during the upgrade process.
- [ ] The `indexes` object store is created during the upgrade process.

## Instructions for Coder

- This is a low-risk task. The Coder is responsible for self-verification of their implementation. Ensure the code compiles, lints, and type-checks successfully. Please document your self-verification in your journal.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- When drafting blueprints for Gen 3 save file parsing, explicitly require that the Coder uses the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
