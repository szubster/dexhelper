---
id: task-341-355-define-indexeddb-schema-retry-v2-impl
type: TASK
title: Define SaveHistoryDB Schema Implementation V2
status: ACTIVE
owner_persona: coder
created_at: '2026-07-28'
updated_at: '2026-07-28'
depends_on:
  - research-341-354-investigate-indexeddb-schema-failure
jules_session_id: '8239222687700882622'
pr_number: null
parent: story-130-341-define-indexeddb-schema-retry
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Define SaveHistoryDB Schema Implementation V2

## Overview
Implement the database configuration and schema initialization logic for `SaveHistoryDB` in `src/db/schema.ts` and `src/db/SaveHistoryDB.ts`. You must **strictly adhere** to the schema defined in Section 14 of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Read the findings from `research-341-354-investigate-indexeddb-schema-failure`.
- [ ] In `src/db/schema.ts`, update `SAVE_HISTORY_DB_CONFIG` to exactly `VERSION: 1`.
- [ ] In `src/db/schema.ts`, remove the `TRAINERS` object store from both `SAVE_HISTORY_DB_CONFIG` and `SaveHistoryDBSchema`.
- [ ] In `src/db/SaveHistoryDB.ts`, update the `getDB` function to ensure it does not create the `TRAINERS` object store and does not create the `trainerId` index.
- [ ] In `src/db/__tests__/SaveHistoryDB.test.ts`, ensure tests related to the `TRAINERS` object store or `trainerId` index are removed or fixed.
- [ ] Ensure only the `saves`, `metadata`, and `indexes` object stores are defined and created.
