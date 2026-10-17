---
id: task-564-680-execute-migration
type: TASK
title: Execute Task Reminders Migration
status: ACTIVE
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: '2723808856200339494'
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
---

# Task: Execute Task Reminders Migration

## 1. Context & Objectives
This task implements `story-335-564-execute-migration`. The objective is to execute the migration script developed in `story-335-563-develop-migration-script` to clean up the workspace by removing any `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections from active, pending, or ready tasks.

## 2. Requirements
- Execute the migration script (`scripts/migrate-task-reminders.ts`) using an appropriate runner (e.g., `npx tsx` or `ts-node`).
- Commit any files that are modified by the script.
- Ensure no other files or file contents are accidentally modified.

## 3. Acceptance Criteria
- [ ] The migration script is executed successfully.
- [ ] Active, pending, and ready TASK nodes are cleaned up and no longer contain `### REMINDER FOR CODER` or `### REMINDER FOR QA` blocks.
