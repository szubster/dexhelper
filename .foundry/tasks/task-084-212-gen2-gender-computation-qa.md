---
id: task-084-212-gen2-gender-computation-qa
type: TASK
title: QA Gen 2 Gender Computation Utility
status: PENDING
owner_persona: qa
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - task-084-211-gen2-gender-computation-impl
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Gender Computation Utility

## Objective
Verify the implementation of the Gen 2 gender computation utility.

## Technical Contract
- Write unit tests validating the utility correctly computes gender based on Gen 2 Attack DV and Gender Ratio.

## Acceptance Criteria
- [ ] Unit tests thoroughly verify gender computation logic.
- [ ] Tests pass successfully.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.