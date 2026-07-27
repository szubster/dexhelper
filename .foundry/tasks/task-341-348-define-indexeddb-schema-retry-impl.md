---
id: task-341-348-define-indexeddb-schema-retry-impl
type: TASK
title: Define SaveHistoryDB Schema Implementation
status: CANCELLED
owner_persona: coder
created_at: '2026-07-26'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-130-341-define-indexeddb-schema-retry
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Define SaveHistoryDB Schema Implementation

## Overview
Implement the database configuration and schema initialization logic for `SaveHistoryDB` in `src/db/schema.ts`. You must **strictly adhere** to the schema defined in Section 14 of `.foundry/docs/schema.md`. Do not add any extraneous stores or indexes.

## Acceptance Criteria
- [ ] Implement `SaveHistoryDB` configuration strictly with `VERSION: 1`.
- [ ] Define the `saves` object store for raw binary save files.
- [ ] Define the `metadata` object store for save file metadata.
- [ ] Define the `indexes` object store for fast retrieval.
- [ ] Ensure the `TRAINERS` object store is removed.
- [ ] Ensure the `trainerId` index is removed from the `indexes` store.
