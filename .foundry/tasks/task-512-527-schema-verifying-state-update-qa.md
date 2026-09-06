---
id: task-512-527-schema-verifying-state-update-qa
type: TASK
title: QA VERIFYING state schema update
status: READY
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-05'
depends_on:
  - task-512-526-schema-verifying-state-update
jules_session_id: null
pr_number: null
parent: story-130-512-schema-verifying-state-update
tags:
  - documentation
  - schema
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA VERIFYING state schema update

## Description
This task verifies that the documentation changes to `schema.md` correctly reflect the introduction of the `VERIFYING` state and `auditor` persona as established by ADR 014.

## Verification Instructions
1.  Review `.foundry/docs/schema.md`.
2.  Verify that Invariant 7 under "System Invariants" correctly states that `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas.

## Acceptance Criteria
- [x] Invariant 7 in `.foundry/docs/schema.md` is verified to be updated correctly.
