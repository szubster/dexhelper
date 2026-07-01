---
id: task-123-241-gen3-parse-battle-points-qa
type: TASK
title: Gen 3 Parse Total Battle Points QA
status: ACTIVE
owner_persona: qa
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on:
  - task-123-240-gen3-parse-battle-points-impl
jules_session_id: '14923612127588403753'
pr_number: null
parent: story-078-123-gen3-parse-battle-points
tags:
  - qa
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Parse Total Battle Points QA

## Description
Verify the implementation of the total Battle Points (BP) extraction logic for Gen 3 save files.

## Requirements
- Ensure the implementation reads a `u16` from offset `0x0EB8` in `SaveBlock2`.
- Verify that module-level constants are used for all memory offsets and there are no inline magic numbers.
- Confirm that `DataView` out-of-bounds reads are properly caught (`RangeError`).
- If you encounter a transient error that requires retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If the task is impossible or max rejections are reached, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If submitting an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] BP parsing logic correctly handles offset `0x0EB8`.
- [ ] Module-level constants are used.
- [ ] Error handling catches `RangeError`.
