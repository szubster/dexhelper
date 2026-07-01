---
id: task-123-240-gen3-parse-battle-points-impl
type: TASK
title: Gen 3 Parse Total Battle Points Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-078-123-gen3-parse-battle-points
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Parse Total Battle Points Implementation

## Description
Implement logic to extract the total accumulated Battle Points (BP) from `SaveBlock2` in Generation 3 save files. The BP value is a 16-bit little-endian integer (`u16`) located at offset `0x0EB8` within `SaveBlock2`.

## Requirements
- Use `DataView` to parse the 16-bit integer at the specified offset.
- Define memory offsets as reusable module-level constants; do not use inline magic numbers.
- Ensure proper error handling, specifically catching `RangeError` from `DataView` for out-of-bounds reads.
- If you encounter a transient error that requires retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If the task is impossible or max rejections are reached, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If submitting an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Parse total BP correctly from offset `0x0EB8`.
- [x] Module-level constants are used for offsets.
- [x] Error handling captures out-of-bounds reads (`RangeError`).
