---
id: task-017-030-update-schema-rejection-reason
type: TASK
title: "Update Schema for rejection_reason"
status: "COMPLETED"
owner_persona: coder
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-011-017-impossible-loop.md
---

# Update Schema for rejection_reason

## Details
Update `.foundry/docs/schema.md` to document the new `rejection_reason` property. This property is used when a node is transitioned to `FAILED` because it is fundamentally impossible to complete.

## Acceptance Criteria
- [x] The `rejection_reason` property is added to the YAML Frontmatter Schema in `.foundry/docs/schema.md`.
- [x] The property is documented as an optional string.
