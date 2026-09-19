---
id: task-570-580-cva-refactor-qa
type: TASK
title: QA - CVA Refactor Tactical Button and Badge
status: ACTIVE
owner_persona: qa
created_at: '2026-09-15T11:22:21Z'
updated_at: '2026-09-19'
depends_on:
  - task-570-578-refactor-tactical-badge-cva
  - task-570-579-refactor-tactical-button-cva
jules_session_id: '1303275444957409517'
pr_number: null
parent: story-567-570-cva-refactor-tactical-button-badge
tags:
  - qa
  - testing
research_references: []
rejection_reason: ''
locks: []
priority: 60
---

# Task: QA - CVA Refactor Tactical Button and Badge

## Objective
Verify the CVA refactoring of `TacticalButton` and `TacticalBadge` correctly reproduces all styling and doesn't introduce typing regressions.

## Scope
- Ensure both components correctly use `class-variance-authority`.
- Ensure component stories/usages in the app render identical to their previous implementations.
- Verify typescript types accurately capture variant permutations.

## Acceptance Criteria
- [x] QA verification complete.
