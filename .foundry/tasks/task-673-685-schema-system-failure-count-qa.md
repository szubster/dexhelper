---
id: task-673-685-schema-system-failure-count-qa
type: TASK
title: QA Schema system_failure_count Implementation
status: COMPLETED
owner_persona: qa
created_at: '2026-10-13T19:46:42Z'
updated_at: '2026-10-23'
depends_on:
  - task-673-684-schema-system-failure-count-tests
jules_session_id: null
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

# QA Schema system_failure_count Implementation

## Context
As part of STORY `story-582-673-yaml-schema-validation-impl`, the new `system_failure_count` property was added to the schema. We need to verify the implementation.

## Objective
Verify that the `system_failure_count` property in the YAML frontmatter schema is correctly defined as an optional integer and that tests adequately cover it.

## Acceptance Criteria
- [x] Verify `system_failure_count` is correctly added to `NodeFrontmatterSchema` in `packages/foundry/schema.ts`.
- [x] Verify tests in `packages/foundry/schema.test.ts` properly validate `system_failure_count`.
