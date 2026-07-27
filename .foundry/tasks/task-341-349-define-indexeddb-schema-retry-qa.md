---
id: task-341-349-define-indexeddb-schema-retry-qa
type: TASK
title: QA Define SaveHistoryDB Schema
status: ACTIVE
owner_persona: qa
created_at: '2026-07-26'
updated_at: '2026-07-27'
depends_on:
  - task-341-348-define-indexeddb-schema-retry-impl
jules_session_id: '7924455330129468910'
pr_number: null
parent: story-130-341-define-indexeddb-schema-retry
tags:
  - storage
  - indexeddb
  - qa
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# QA Define SaveHistoryDB Schema

## Overview
Verify the implementation of the `SaveHistoryDB` schema configuration in `src/db/schema.ts` strictly adheres to Section 14 of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Verify `SaveHistoryDB` configuration uses exactly `VERSION: 1`.
- [ ] Verify `SaveHistoryDB` configuration has exactly three stores: `saves`, `metadata`, and `indexes`.
- [ ] Verify there is NO `TRAINERS` store.
- [ ] Verify there is NO `trainerId` index defined on the `indexes` store.
