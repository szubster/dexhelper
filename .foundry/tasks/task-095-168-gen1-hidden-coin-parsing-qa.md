---
id: task-095-168-gen1-hidden-coin-parsing-qa
type: TASK
title: Gen 1 Hidden Coin Event Flags Parsing QA
status: COMPLETED
owner_persona: qa
created_at: '2026-06-12'
updated_at: '2026-06-13'
depends_on:
  - task-095-167-gen1-hidden-coin-parsing-impl
jules_session_id: null
pr_number: null
parent: story-058-095-gen1-hidden-item-parsing
tags:
  - gen1
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Hidden Coin Event Flags Parsing QA

## Context
This task verifies the implementation of the `task-095-167-gen1-hidden-coin-parsing-impl` task, ensuring the `SaveData` interface and Gen 1 save parser correctly handle hidden coin event flags.

## QA Verification Criteria
- [x] Verify that `hiddenCoinFlags?: Uint8Array` has been added to the `SaveData` interface in `src/engine/saveParser/parsers/common.ts`.
- [x] Verify that the `parseGen1` function correctly calculates the offset and extracts the hidden coin flags.
- [x] Verify that the implementation correctly uses the `offsetShift` when calculating the hidden coin flags offset to ensure Pokemon Yellow compatibility.
- [x] Verify that unit tests were added or updated in `src/engine/saveParser/parsers/gen1.test.ts` and that they cover the extraction logic, injecting mock data and verifying it is correctly extracted.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
