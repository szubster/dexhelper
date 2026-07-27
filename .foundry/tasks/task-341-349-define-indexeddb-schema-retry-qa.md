---
id: task-341-349-define-indexeddb-schema-retry-qa
type: TASK
title: QA Define SaveHistoryDB Schema
status: FAILED
owner_persona: qa
created_at: '2026-07-26'
updated_at: '2026-07-27'
depends_on:
  - task-341-348-define-indexeddb-schema-retry-impl
jules_session_id: null
pr_number: null
parent: story-130-341-define-indexeddb-schema-retry
tags:
  - storage
  - indexeddb
  - qa
research_references: []
rejection_count: 1
rejection_reason: Merged with unfulfilled acceptance criteria
notes: ''
---

# QA Define SaveHistoryDB Schema

## Overview
Verify the implementation of the `SaveHistoryDB` schema configuration in `src/db/schema.ts` against the defined requirements.

## Acceptance Criteria
- [ ] Verify `SaveHistoryDB` configuration exists with the correct stores (`saves`, `metadata`, `indexes`).

## QA Notes
- Validation FAILED. The implementation in `src/db/schema.ts` sets `SAVE_HISTORY_DB_CONFIG.VERSION` to 2 instead of 1. It also incorrectly adds a `TRAINERS` store and a `trainerId` index, which are not part of the schema defined in `.foundry/docs/schema.md` (Section 14).
- Target task `task-341-348-define-indexeddb-schema-retry-impl` has been updated to `FAILED` with rejection feedback to prompt a retry.
