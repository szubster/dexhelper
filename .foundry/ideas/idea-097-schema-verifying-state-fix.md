---
id: idea-097-schema-verifying-state-fix
type: IDEA
title: Fix contradiction in schema.md regarding VERIFYING state
status: READY
owner_persona: product_manager
created_at: '2026-06-29'
updated_at: '2026-06-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - documentation
  - schema
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Fix contradiction in schema.md regarding VERIFYING state

## Concept
`schema.md` contains a contradiction in its System Invariants. Invariant 7 states: "COMPLETED nodes are read-only. Once a PR is merged, the node must not be edited." However, ADR 014 changed the lifecycle so that when a PR is merged, nodes transition to `VERIFYING`, not `COMPLETED`. The invariant needs to be updated to reflect the `VERIFYING` state accurately.
