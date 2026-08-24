---
id: task-418-423-implement-locks-zod
type: TASK
title: Implement Schema Resource Locking in Zod
status: COMPLETED
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-15'
depends_on:
  - task-418-422-document-locks-schema
jules_session_id: null
pr_number: null
parent: story-411-418-schema-resource-locking
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Schema Resource Locking in Zod

## Objective
Update `.github/scripts/schema.ts` to implement Zod validation for the new `locks` field.

## Details
- Update the `NodeFrontmatterSchema` in `.github/scripts/schema.ts`.
- Add `locks: z.array(z.string()).optional()` to the schema object.

## Acceptance Criteria
- [x] Coder updates `.github/scripts/schema.ts` to validate the `locks` field as an array of strings.
