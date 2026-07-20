---
id: epic-117-335-migrate-task-reminders
type: EPIC
title: Migrate and Clean Existing Task Reminders
status: PENDING
owner_persona: story_owner
created_at: '2026-07-19'
updated_at: '2026-07-19'
depends_on:
  - epic-117-334-centralize-prompt-rules
jules_session_id: null
pr_number: null
parent: prd-118-117-centralize-prompt-reminders
tags:
  - foundry
  - script
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Migrate and Clean Existing Task Reminders

## 1. Context & Objectives
This epic fulfills the optional cleanup objective of `prd-118-117-centralize-prompt-reminders`. Since the rules for Coder and QA are now centralized and the Tech Lead will no longer append reminders to new tasks, we must run a one-time migration to strip existing `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks from currently active, pending, or ready TASK nodes to clean up the workspace and reduce token usage.

## 2. Requirements
- Develop a script or use standard bash utilities to locate all active, pending, or ready TASK nodes in `.foundry/tasks/`.
- Strip out any `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections (including their content) from the markdown bodies of these tasks.
- Ensure the migration script does not accidentally alter the YAML frontmatter or other valid acceptance criteria.
- Execute the migration and commit the cleaned files.

## 3. High-Level Acceptance Criteria
- [ ] A migration script or command is written and executed to remove `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks from existing `.foundry/tasks/`.
- [ ] Active and pending TASK files are clean and no longer contain the redundant prompt rules.
