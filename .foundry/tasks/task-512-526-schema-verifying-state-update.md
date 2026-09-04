---
id: task-512-526-schema-verifying-state-update
type: TASK
title: Implement VERIFYING state schema update
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '3653602194144836961'
pr_number: null
parent: story-130-512-schema-verifying-state-update
tags:
  - documentation
  - schema
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement VERIFYING state schema update

## Description
This task implements the required documentation changes to `schema.md` to reflect the introduction of the `VERIFYING` state and `auditor` persona as established by ADR 014. Specifically, we need to update Invariant 7 to indicate that both `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas.

## Technical Contract
1.  Target File: `.foundry/docs/schema.md`
2.  Locate "7. System Invariants"
3.  Update the 7th invariant from:
    `7. **COMPLETED nodes are read-only.** Once a PR is merged...`
    to:
    `7. **VERIFYING and COMPLETED nodes are read-only for implementing personas.** Once a PR is merged...`

## Acceptance Criteria
- [ ] Invariant 7 in `.foundry/docs/schema.md` correctly states that `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas.
