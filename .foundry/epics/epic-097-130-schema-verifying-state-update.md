---
id: epic-097-130-schema-verifying-state-update
type: EPIC
title: Update schema.md regarding VERIFYING state
status: READY
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-097-096-schema-verifying-state-fix
tags:
  - documentation
  - schema
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update schema.md regarding VERIFYING state

## Description
This epic implements the required changes from `prd-097-096-schema-verifying-state-fix`. We need to update Invariant 7 in `schema.md` to reflect that `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas, as established by ADR 014.

## Acceptance Criteria
- [ ] Story created to update `schema.md` System Invariant 7.
