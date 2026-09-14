---
id: task-563-579-migration-script-qa
type: TASK
title: QA Verification for Task Reminder Migration Script
status: PENDING
owner_persona: qa
created_at: '2026-09-11'
updated_at: '2026-09-11'
depends_on:
  - task-563-578-migration-script-impl
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

# Task: QA Verification for Task Reminder Migration Script

## 1. Context & Objectives
Verify the implementation of the migration script developed in `task-563-578-migration-script-impl`. The script must correctly locate active/pending/ready TASK nodes in `.foundry/tasks/` and strip out `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections without corrupting the frontmatter or other content.

## 2. Requirements
- Ensure the script correctly targets only nodes with `ACTIVE`, `PENDING`, or `READY` status.
- Ensure the script successfully removes the reminder sections and their contents.
- Ensure the script preserves YAML frontmatter and other markdown sections (especially `## Acceptance Criteria`).
- Run the unit tests provided by the coder and verify they pass and have sufficient coverage.

## 3. Acceptance Criteria
- [ ] Migration script functionality is verified against test nodes.
- [ ] Script successfully removes target sections without data loss.
- [ ] Unit tests pass and provide adequate coverage.
