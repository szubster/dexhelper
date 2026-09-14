---
id: story-335-563-develop-migration-script
type: STORY
title: Develop Migration Script for Task Reminders
status: READY
owner_persona: tech_lead
created_at: '2026-09-11'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-117-335-migrate-task-reminders
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

# Story: Develop Migration Script for Task Reminders

## 1. Context & Objectives
This story is part of `epic-117-335-migrate-task-reminders`. The objective is to develop a script that locates all active, pending, or ready TASK nodes in `.foundry/tasks/` and strips out any `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections.

## 2. Requirements
- Create a migration script (e.g., `scripts/migrate-task-reminders.ts` or a `.cjs` script).
- The script must find all markdown files in `.foundry/tasks/`.
- The script must read each file and check if its status in the YAML frontmatter is ACTIVE, PENDING, or READY.
- If it is, strip out any `### REMINDER FOR CODER` or `### REMINDER FOR QA` sections (including their content until the next header or EOF), ensuring frontmatter and acceptance criteria remain intact.

## 3. Acceptance Criteria
- [ ] Migration script is created and tested locally.
