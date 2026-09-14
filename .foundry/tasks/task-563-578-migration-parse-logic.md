---
id: task-563-578-migration-parse-logic
type: TASK
title: Implement Markdown Parsing Logic for Migration
status: READY
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
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

# Task: Implement Markdown Parsing Logic for Migration

## 1. Context & Objectives
This task focuses strictly on writing the core markdown string manipulation and parsing functions needed to strip `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections from file contents.

## 2. Requirements
- Create a pure function (e.g., `removeReminderSections(markdownStr: string): string`).
- The function must locate and strip out any `### REMINDER FOR CODER` and `### REMINDER FOR QA` headers and all subsequent content until the next `##` or `###` header or EOF.
- It must preserve the YAML frontmatter intact.
- Avoid file I/O in this task; focus entirely on the string processing logic.

## 3. Acceptance Criteria
- [ ] The `removeReminderSections` function is implemented and exported.
- [ ] Logic correctly identifies the bounds of the reminder sections.
