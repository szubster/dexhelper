---
id: task-563-579-migration-script-cli
type: TASK
title: Implement Migration Script File I/O and CLI
status: PENDING
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on:
  - task-563-578-migration-parse-logic
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

# Task: Implement Migration Script File I/O and CLI

## 1. Context & Objectives
This task integrates the pure parsing logic from `task-563-578` into an executable Node.js script that iterates over files and performs the I/O.

## 2. Requirements
- Create an executable Node.js script (e.g., `.github/scripts/migrate-task-reminders.ts`).
- Iterate through all markdown files in `.foundry/tasks/`.
- Use a markdown parser (e.g., `import matter from 'gray-matter'`) to check if the `status` field in the frontmatter is `ACTIVE`, `PENDING`, or `READY`.
- If the status matches, use the `removeReminderSections` function to process the file's raw content.
- Write the modified contents back to the file system.

## 3. Acceptance Criteria
- [ ] The executable script correctly loops through `.foundry/tasks/`.
- [ ] The script accurately filters files by status (ACTIVE, PENDING, READY).
- [ ] The script correctly applies the parsing logic and writes the files back.
