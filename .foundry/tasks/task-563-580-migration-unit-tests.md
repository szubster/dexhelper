---
id: task-563-580-migration-unit-tests
type: TASK
title: Write Unit Tests for Migration Logic
status: PENDING
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on:
  - task-563-578-migration-parse-logic
  - task-563-579-migration-script-cli
jules_session_id: null
pr_number: null
parent: story-335-563-develop-migration-script
tags:
  - foundry
  - script
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write Unit Tests for Migration Logic

## 1. Context & Objectives
This task requires writing robust unit tests to verify the core parsing logic and file filtering logic of the migration script.

## 2. Requirements
- Write unit tests using Vitest (or the project's standard test runner) targeting `removeReminderSections`.
- Test cases should include: missing headers, multiple headers, EOF bounds, and various spacing scenarios.
- Write tests for the frontmatter status filtering logic to ensure only the target statuses are processed.

## 3. Acceptance Criteria
- [ ] Unit tests are implemented with high coverage of edge cases.
- [ ] Tests successfully pass when running `pnpm test`.
