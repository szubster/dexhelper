---
id: task-563-578-migration-script-impl
type: TASK
title: Implement Task Reminder Migration Script
status: READY
owner_persona: coder
created_at: '2026-09-11'
updated_at: '2026-09-11'
depends_on: []
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

# Task: Implement Task Reminder Migration Script

## 1. Context & Objectives
This task implements the script defined in `story-335-563-develop-migration-script` to locate all active, pending, or ready TASK nodes in `.foundry/tasks/` and strip out `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections.

## 2. Requirements
- Create a Node.js script (e.g., `.github/scripts/migrate-task-reminders.ts`).
- Iterate through all markdown files in `.foundry/tasks/`.
- Use a markdown parser (e.g., `gray-matter` as `import matter from 'gray-matter'`) to parse the YAML frontmatter.
- Check if the `status` field in the frontmatter is `ACTIVE`, `PENDING`, or `READY`.
- If it matches, use regex or string manipulation to remove the `### REMINDER FOR CODER` and `### REMINDER FOR QA` headers and all their subsequent content until the next `##` or `###` header or EOF.
- Write the modified contents back to the file without altering the frontmatter schema or other content (like Acceptance Criteria).
- Write unit tests for the core regex/parsing logic to ensure sections are correctly removed while preserving the rest of the content.

## 3. Acceptance Criteria
- [ ] Migration script is implemented and executable.
- [ ] Script successfully processes only tasks with ACTIVE, PENDING, or READY status.
- [ ] Script accurately removes reminder sections without corrupting the file or other headers.
- [ ] Unit tests pass.
