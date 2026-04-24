---
id: task-012-024-update-human-schema
type: TASK
title: "Update Foundry Schema for Human Persona"
status: PENDING
owner_persona: coder
created_at: "2026-04-24"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-012-schema-human-persona.md"
tags:
  - "human-in-the-loop"
  - "schema"
---

# Task: Update Foundry Schema for Human Persona

## Objective
Update `.foundry/docs/schema.md` to support human persona.

## Technical Contract
- Update `owner_persona` enum to include `human`.
- Define `pr_number` (`integer | null`) in YAML frontmatter schema.
- Add explicit note in system invariants that `human` bypasses Jules dispatch and heartbeat timeouts.
- Update the new node template to include `pr_number`.

## Verification
The `coder` can self-verify this change as it's a documentation schema update. No separate `qa` task needed.
