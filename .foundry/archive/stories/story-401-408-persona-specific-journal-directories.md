---
id: story-401-408-persona-specific-journal-directories
type: STORY
title: Implement Persona-Specific Journal Directories
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-335-401-implement-conflictless-journals-retry
tags:
  - foundry
  - journals
  - workflow
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Persona-Specific Journal Directories

## Description
Transition the system to use timestamped or session-unique markdown files for journals and ensure these files are stored in persona-specific subdirectories (e.g., `.foundry/journals/coder/`).

## Acceptance Criteria
- [x] Implement logic to generate timestamped or session-unique markdown files.
- [x] Ensure files are saved in the correct persona-specific directory.
- [x] task-408-430-implement-persona-specific-journals-impl
- [x] task-408-431-implement-persona-specific-journals-qa
