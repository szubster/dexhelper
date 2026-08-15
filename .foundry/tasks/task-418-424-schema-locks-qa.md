---
id: task-418-424-schema-locks-qa
type: TASK
title: QA Schema Resource Locking
status: COMPLETED
owner_persona: qa
created_at: '2026-08-11'
updated_at: '2026-08-15'
depends_on:
  - task-418-423-implement-locks-zod
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

# QA Schema Resource Locking

## Objective
Verify the schema documentation and Zod implementation for the `locks` array field.

## Details
- Verify that `.foundry/docs/schema.md` properly documents the new `locks` field as an array of strings.
- Verify that `NodeFrontmatterSchema` in `.github/scripts/schema.ts` correctly validates the `locks` field as an array of strings (`z.array(z.string()).optional()`).

## Acceptance Criteria
- [x] QA verifies schema documentation.
- [x] QA verifies Zod implementation.
