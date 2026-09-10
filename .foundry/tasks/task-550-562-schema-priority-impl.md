---
id: task-550-562-schema-priority-impl
type: TASK
title: Implement Priority Field in Schema
status: COMPLETED
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-550-implement-schema-priority
tags:
  - orchestrator
  - schema
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Priority Field in Schema

## Description
Update the Zod schema in `.github/scripts/schema.ts` to include an optional `priority` field. The `priority` field should be an integer (`z.number().int().optional()`). Update the `NodeFrontmatter` type and write tests in `.github/scripts/schema.test.ts` to ensure valid schemas with or without `priority` are accepted.

## Acceptance Criteria
- [x] Add `priority: z.number().int().optional()` to `NodeFrontmatterSchema` in `.github/scripts/schema.ts`.
- [x] Ensure tests pass and add a new test case validating the `priority` field in `.github/scripts/schema.test.ts`.
- [x] Self-verification: run `cd .github/scripts && pnpm install && npx vitest schema.test.ts` to verify tests pass.
