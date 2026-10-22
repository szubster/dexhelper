---
id: task-673-684-schema-system-failure-count-tests
type: TASK
title: Update Schema Tests for system_failure_count
status: ACTIVE
owner_persona: coder
created_at: '2026-10-13T19:46:42Z'
updated_at: '2026-10-22'
depends_on:
  - task-673-683-schema-system-failure-count
jules_session_id: '15268317058892187372'
pr_number: null
parent: story-582-673-yaml-schema-validation-impl
tags:
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Update Schema Tests for system_failure_count

## Context
As part of STORY `story-582-673-yaml-schema-validation-impl`, we need to track infrastructure failures independently from QA domain rejections. The schema definition is updated, but tests must verify the behavior.

## Objective
Update the schema tests in `packages/foundry/schema.test.ts` to verify that `system_failure_count` is properly parsed and validated as an optional integer.

## Acceptance Criteria
- [x] Add tests ensuring `system_failure_count` is accepted when it's an integer.
- [x] Add tests ensuring `system_failure_count` is accepted when omitted (optional).
- [x] Add tests ensuring validation fails if `system_failure_count` is not an integer (e.g. string or float).
