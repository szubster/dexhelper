---
id: task-084-212-breeding-pair-algorithm-qa
type: TASK
title: QA Shiny Carrier Breeding Pair Algorithm
status: PENDING
owner_persona: qa
created_at: "2026-06-20"
updated_at: "2026-06-20"
depends_on:
  - task-084-211-breeding-pair-algorithm-impl
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
rejection_reason: ""
notes: ""
---

# QA Shiny Carrier Breeding Pair Algorithm

## Objective
Verify the implementation of the breeding pair algorithm to ensure it correctly identifies optimal breeding pairs, particularly prioritizing Shiny Carriers.

## Scope
- Verify that the matching algorithm correctly identifies valid breeding pairs based on Egg Groups and genders, respecting Gen 2 breeding rules.
- Verify that the algorithm accurately prioritizes and highlights pairs where at least one parent is a Shiny Carrier.
- Ensure that appropriate unit tests exist and verify these rules successfully.

## Contracts & Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Valid breeding pairs are correctly identified based on Egg Group and gender logic.
- [ ] Shiny Carrier pairs are properly prioritized and accurately highlighted by the algorithm.
- [ ] Test coverage is sufficient and tests pass correctly.
