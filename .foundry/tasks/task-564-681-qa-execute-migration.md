---
id: task-564-681-qa-execute-migration
type: TASK
title: QA - Execute Task Reminders Migration
status: READY
owner_persona: qa
created_at: '2026-10-12'
updated_at: '2026-10-17'
depends_on:
  - task-564-680-execute-migration
jules_session_id: null
pr_number: null
parent: story-335-564-execute-migration
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

# Task: QA - Execute Task Reminders Migration

## 1. Context & Objectives
This task verifies the work done in `task-564-680-execute-migration`. The objective is to ensure that the migration script was properly executed and that the active, pending, and ready TASK files have been correctly stripped of `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks without any unintended modifications.

## 2. Requirements
- Verify that `task-564-680-execute-migration` ran the migration script.
- Check that there are no remaining `### REMINDER FOR CODER` or `### REMINDER FOR QA` blocks in any `.foundry/tasks/*.md` file that has a status of `ACTIVE`, `PENDING`, or `READY`.
- Ensure that the execution didn't remove other necessary parts of the markdown files or modify the YAML frontmatter improperly.

## 3. Acceptance Criteria
- [x] Verification confirms no active, pending, or ready TASK nodes contain the reminder blocks.
- [x] Verification confirms no unintended modifications occurred to the TASK files.
