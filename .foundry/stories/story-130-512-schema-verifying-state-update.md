---
id: story-130-512-schema-verifying-state-update
type: STORY
title: Update schema.md regarding VERIFYING state
status: READY
owner_persona: tech_lead
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-097-130-schema-verifying-state-update
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
This story implements the required changes from `epic-097-130-schema-verifying-state-update`. We need to update Invariant 7 in `schema.md` to reflect that `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas, as established by ADR 014.

## Acceptance Criteria
- [ ] Invariant 7 in `.foundry/docs/schema.md` is updated to clarify that `VERIFYING` and `COMPLETED` nodes are read-only for implementing personas.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
