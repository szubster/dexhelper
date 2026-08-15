---
id: task-358-428-indexeddb-schema-qa
type: TASK
title: IndexedDB Storage Schema QA
status: READY
owner_persona: qa
created_at: '2026-08-05'
updated_at: '2026-08-15'
depends_on:
  - task-358-427-indexeddb-schema-impl
jules_session_id: null
pr_number: null
parent: story-397-358-indexeddb-schema-retry-impl
tags:
  - storage
  - indexeddb
  - history
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: IndexedDB Storage Schema QA

## Overview
Verify the IndexedDB storage schema implementation against Section 14 of `.foundry/docs/schema.md`.

## Context
The coder has implemented the `SaveHistoryDB` IndexedDB database using Dexie. This task ensures the implementation is correct and conforms to the specifications.

## Acceptance Criteria
- [ ] Verify `SaveHistoryDB` database name and version 1.
- [ ] Verify object stores `saves`, `metadata`, and `indexes` are present.
- [ ] Ensure types defined in the schema map correctly (e.g., `saves` storing `Uint8Array`).
- [ ] Verify the test in `src/engine/storage/historyDb.test.ts` correctly instantiates the database and asserts the schema structures.
