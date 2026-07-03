---
id: prd-097-096-schema-verifying-state-fix
type: PRD
title: Fix contradiction in schema.md regarding VERIFYING state
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-30'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: '14002497237857172310'
pr_number: null
parent: idea-097-schema-verifying-state-fix
tags:
  - documentation
  - schema
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Fix contradiction in schema.md regarding VERIFYING state

## Background
`schema.md` contains a contradiction in its System Invariants regarding the node lifecycle. Invariant 7 stated: "COMPLETED nodes are read-only. Once a PR is merged, the node must not be edited."
However, ADR 014 changed the lifecycle so that when a PR is merged, nodes transition to `VERIFYING`, not `COMPLETED`.
This issue updates the invariant to reflect the `VERIFYING` state accurately.

## Requirements
- `schema.md` must accurately reflect the node lifecycle changes introduced by ADR 014.
- Invariant 7 must be updated.

## Acceptance Criteria
- [ ] Invariant 7 is updated to clarify that `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas.
