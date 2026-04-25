---
id: "task-008-028-update-schema-examples"
type: "TASK"
title: "Update Documentation Examples for Atomic Files"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-24"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: "16916249611262202908"
parent: ".foundry/stories/story-008-schema-examples.md"
---

# Update Documentation Examples for Atomic Files

## Context
The examples throughout `.foundry/docs/schema.md` must accurately reflect the new atomic file structure and naming conventions, specifically showcasing single-persona ownership rather than multiple personas.

## Acceptance Criteria
- Update all examples in `schema.md` to showcase single-persona nodes.
- Remove any examples that imply multiple personas operating in the same file.

## Implementation Steps
1. Search for examples in `.foundry/docs/schema.md` that list multiple roles in `owner_persona` or imply shared ownership.
2. Update them to show exactly one role (e.g., `owner_persona: coder`).
