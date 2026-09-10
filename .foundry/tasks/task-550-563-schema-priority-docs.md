---
id: task-550-563-schema-priority-docs
type: TASK
title: Update Schema Documentation for Priority Field
status: COMPLETED
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-550-implement-schema-priority
tags:
  - documentation
  - schema
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Schema Documentation for Priority Field

## Description
Update `.foundry/docs/schema.md` to document the new optional `priority` field in the YAML frontmatter schema section. Add it to the 3.1 Field Reference table specifying that the type is `integer` and it's optional, representing the priority of the node. Also add it to the 8. New Node Template block.

## Acceptance Criteria
- [x] Add `priority: 0 # Optional. Integer representing priority.` to the YAML frontmatter block in `.foundry/docs/schema.md`.
- [x] Document `priority` in the 3.1 Field Reference table as type `integer`, optional, and describe its purpose.
- [x] Add the field to the 8. New Node Template block.
- [x] Self-verification: run `pnpm lint` to verify that markdown is correct.
