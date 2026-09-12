---
id: story-335-564-execute-migration
type: STORY
title: Execute Task Reminders Migration
status: READY
owner_persona: tech_lead
created_at: '2026-09-11'
updated_at: '2026-09-11'
depends_on:
  - story-335-563-develop-migration-script
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

# Story: Execute Task Reminders Migration

## 1. Context & Objectives
This story is part of `epic-117-335-migrate-task-reminders`. The objective is to execute the migration script developed in `story-335-563-develop-migration-script` to clean up the workspace.

## 2. Requirements
- Execute the migration script.
- Ensure the script correctly modifies the active, pending, and ready TASK files.
- Commit the cleaned files.

## 3. Acceptance Criteria
- [ ] Active, pending, and ready TASK nodes are cleaned up and no longer contain `### REMINDER FOR CODER` or `### REMINDER FOR QA` blocks.
