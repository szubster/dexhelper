---
id: "story-007-update-schema-atomic-handoff"
type: "STORY"
title: "Update Schema for Atomic Handoffs"
status: "PENDING"
owner_persona: "tech_lead"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - ".foundry/epics/epic-007-atomic-handoff-schema.md"
jules_session_id: null
parent: ".foundry/epics/epic-007-atomic-handoff-schema.md"
tags: ["schema", "atomic-handoffs"]
rejection_count: 0
notes: ""
---

# Update Schema for Atomic Handoffs

## Goal
Update `.foundry/docs/schema.md` and related documentation to formally support the "Atomic Handoffs" paradigm.

## Requirements
- `schema.md` must be updated to explicitly define the single-owner invariant per node.
- Examples in documentation must reflect the new atomic file structure.
- Any references to "composite nodes" must be removed or marked deprecated.

## Definition of Done
- `schema.md` is updated.
- `schema.md` examples reflect the atomic file structure.
- References to composite nodes are removed or marked deprecated.
