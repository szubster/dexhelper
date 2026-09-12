---
id: story-335-565-migration-e2e-verification
type: STORY
title: Migration E2E Verification
status: READY
owner_persona: tech_lead
created_at: '2026-09-11'
updated_at: '2026-09-11'
depends_on:
  - story-335-564-execute-migration
jules_session_id: null
pr_number: null
parent: epic-117-335-migrate-task-reminders
tags:
  - e2e
  - foundry
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Migration E2E Verification

## 1. Context & Objectives
This story provides the E2E verification for the migration executed in `epic-117-335-migrate-task-reminders`.

## 2. Requirements
- Ensure that the migration did not break the schema of any `.foundry/tasks/` files.
- Verify that `pnpm lint` and `pnpm test` pass.

## 3. Acceptance Criteria
- [ ] The repository passes all linting and testing after the migration.
