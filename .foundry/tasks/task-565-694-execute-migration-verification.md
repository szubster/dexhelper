---
id: task-565-694-execute-migration-verification
type: TASK
title: Execute Migration Verification
status: ACTIVE
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-22'
depends_on: []
parent: story-335-565-migration-e2e-verification
tags:
  - e2e
  - foundry
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
jules_session_id: '13917092453454114038'
pr_number: null
---

# Task: Execute Migration Verification

## 1. Context & Objectives
This task provides the E2E verification for the task reminders migration executed in `epic-117-335-migrate-task-reminders`.

## 2. Requirements
- Ensure that the migration did not break the schema of any `.foundry/tasks/` files.
- Run and verify that `pnpm lint` and `pnpm test` pass successfully on the repository.

## 3. Acceptance Criteria
- [x] Schema of all `.foundry/tasks/` files is intact and validated.
- [x] `pnpm lint` and `pnpm test` pass without errors.
