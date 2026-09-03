---
id: task-477-506-update-schema-locks-impl
type: TASK
title: Update schema to default locks to an empty array
status: ACTIVE
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '9087517217697452926'
pr_number: null
parent: story-412-477-parse-locks-orchestrator
tags:
  - orchestrator
  - schema
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Update schema to default locks to an empty array

## Objective
Update the `NodeFrontmatterSchema` so that the `locks` field explicitly defaults to an empty array (`[]`) instead of being optional and implicitly `undefined`.

## Requirements
- In `.github/scripts/schema.ts`, locate the `NodeFrontmatterSchema` definition.
- Change the `locks` field from `locks: z.array(z.string()).optional()` to `locks: z.array(z.string()).default([])`.
- Update `.github/scripts/foundry-orchestrator.ts` in `parseNodeFile` to explicitly set `frontmatter.locks = []` if it's falsy, just to ensure backward compatibility and robustness when gray-matter strips fields.
- Run tests in `.github/scripts` using `pnpm install && npx vitest run` to verify that `schema.test.ts` and `foundry-orchestrator.test.ts` pass without errors.

## Acceptance Criteria
- [x] Schema `locks` field defaults to `[]`.
- [x] Orchestrator tests pass successfully.
