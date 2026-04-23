---
id: "story-007-schema-invariant"
type: "STORY"
title: "Update Schema Invariants for Atomic Handoffs"
status: "PENDING"
owner_persona: "tech_lead"
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on:
  - ".foundry/epics/epic-007-atomic-handoff-schema.md"
jules_session_id: null
parent: ".foundry/epics/epic-007-atomic-handoff-schema.md"
---

# Update Schema Invariants for Atomic Handoffs

## Context
As part of the Atomic Handoffs transition, `schema.md` must be updated to strictly enforce the single-owner invariant per node.

## Acceptance Criteria
- `schema.md` states that `owner_persona` must be exactly one assigned persona.
- The single-owner invariant is added to the "System Invariants" section.