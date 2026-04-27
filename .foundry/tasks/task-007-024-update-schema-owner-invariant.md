---
id: "task-007-024-update-schema-owner-invariant"
type: "TASK"
title: "Update schema.md to enforce single owner invariant"
status: "COMPLETED"
owner_persona: "coder"
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-007-schema-invariant.md"
---

# Update schema.md to enforce single owner invariant

## Context
As part of the Atomic Handoffs transition, `schema.md` must strictly enforce that the `owner_persona` per node must be exactly one assigned persona, instead of an array or multiple personas. This allows for clear, atomic ownership per node at any given time.

## Requirements
1. **Update `owner_persona` definition**:
   - In `.foundry/docs/schema.md`, modify the description of `owner_persona` (likely in "YAML Frontmatter Schema" / "Field Reference" section) to explicitly state that it must be exactly one assigned persona (no arrays or multiple personas).

2. **Add System Invariant**:
   - In the "System Invariants" section of `.foundry/docs/schema.md`, add a new invariant stating the single-owner rule: `owner_persona` must be exactly one persona.

## Verification Protocol
Since this task involves documentation updates and is extremely low-risk logic-wise, you will self-verify.

- [x] I have updated the `owner_persona` field documentation to specify a single persona.
- [x] I have added the single-owner invariant to the "System Invariants" list.
- [x] Document your verification directly in the task journal at the bottom of this file.

## Journal
- Verified that `owner_persona` is updated to specify a single persona in `schema.md`.
- Verified that the single-owner invariant is added to the "System Invariants" list in `schema.md`.
