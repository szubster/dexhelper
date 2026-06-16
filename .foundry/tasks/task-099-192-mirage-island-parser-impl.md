---
id: task-099-192-mirage-island-parser-impl
type: TASK
title: Implement Mirage Island Parser Engine Logic
status: PENDING
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-099-implement-mirage-island-parser
tags:
  - feature
  - gen3
  - parser
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Mirage Island Parser Engine Logic

## Context
We need to implement the Gen 3 save parser logic for extracting the Mirage Island value. This is a technical blueprint for the coder to execute.

## Requirements
- Update the Gen 3 save parser engine to extract the Mirage Island value using the located offsets (0x0408 for RS, 0x0464 for Emerald).
- Strictly adhere to ADR 010: Use the `DataView` API exclusively. Do not use raw `Uint8Array` manipulations.
- Implement graceful error handling: Catch `RangeError` on out-of-bounds reads and propagate them as specific validation errors (e.g., "Corrupted Save File").
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement the Mirage Island parsing logic using `DataView`.
- [ ] Ensure out-of-bounds `RangeError`s are caught and handled gracefully.
- [ ] Update the parent story `.foundry/stories/story-061-099-implement-mirage-island-parser.md` by checking off this task's checkbox.
