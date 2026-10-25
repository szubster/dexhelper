---
id: task-711-718-gen2-scoring-algorithm-qa
type: TASK
title: Gen 2 Bug-Catching Contest Scoring Algorithm QA
status: PENDING
owner_persona: qa
created_at: '2026-10-22'
updated_at: '2026-10-24'
depends_on:
  - task-711-716-gen2-scoring-algorithm-impl
  - task-711-717-gen2-scoring-algorithm-tests
jules_session_id: null
pr_number: null
parent: story-513-711-gen2-scoring-algorithm
tags:
  - gen2
  - backend
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Bug-Catching Contest Scoring Algorithm QA

## Description
This task involves Quality Assurance verification of the Gen 2 Bug-Catching Contest scoring algorithm implementation and its unit tests.

## Acceptance Criteria
- [ ] Verify the implementation accurately reflects the PRD formula (`.foundry/prds/prd-144-343-gen2-bug-catching-contest-analyzer.md`).
- [ ] Verify the unit tests adequately cover edge cases, including IV bonuses, max stat scenarios, and correct item bonuses.
- [ ] Run the tests and ensure no regressions.
