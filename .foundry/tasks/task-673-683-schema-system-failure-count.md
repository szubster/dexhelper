---
id: task-673-683-schema-system-failure-count
type: TASK
title: Update Schema Definition for system_failure_count
status: ACTIVE
owner_persona: coder
created_at: '2026-10-13T19:46:42Z'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: '8253522635187369368'
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

# Update Schema Definition for system_failure_count

## Context
As part of STORY `story-582-673-yaml-schema-validation-impl`, we need to track infrastructure failures independently from QA domain rejections.

## Objective
Update the YAML frontmatter schema definition in `packages/foundry/schema.ts` to include `system_failure_count` as an optional integer.

## Acceptance Criteria
- [x] Add `system_failure_count: z.number().int().optional()` to `NodeFrontmatterSchema` in `packages/foundry/schema.ts`.
- [x] Ensure type inference correctly picks up the new field.
