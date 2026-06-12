---
id: task-089-164-gen2-exclusive-moves-qa
type: TASK
title: QA Gen 2 exclusive moves check
status: READY
owner_persona: qa
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on:
  - task-089-163-gen2-exclusive-moves-impl
jules_session_id: null
pr_number: null
parent: story-051-089-gen2-exclusive-moves
tags:
  - feature
  - gen2
  - trade
  - tool
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 exclusive moves check

## Objective
Verify the implementation of the Gen 2 exclusive moves check utility.

## Contract
- Verify that a utility function exists to check if any moves in an array are Generation 2 exclusive.
- Confirm the logic correctly identifies Generation 1 moves (IDs 1-165) as NOT Gen 2 exclusive.
- Confirm the logic correctly identifies Generation 2 moves (IDs > 165) as Gen 2 exclusive.
- Confirm move ID `0` is ignored.
- Review the unit tests for comprehensiveness (edge cases, boundaries).
- Ensure `pnpm lint` and `pnpm test` pass.

## Notes for QA
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Utility function verified.
- [x] Logic correctly distinguishes Gen 1 and Gen 2 moves based on ID threshold (165).
- [x] Tests comprehensively cover functionality.
