---
id: task-408-430-implement-persona-specific-journals-impl
type: TASK
title: Implement Persona-Specific Journal Directories
status: READY
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-401-408-persona-specific-journal-directories
tags:
  - foundry
  - journals
  - workflow
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Persona-Specific Journal Directories

## Description
Modify the prompt generation and orchestrator configuration to transition the system to use timestamped or session-unique markdown files for journals and ensure these files are stored in persona-specific subdirectories (e.g., `.foundry/journals/coder/<session_id>.md` or `.foundry/journals/coder/YYYY-MM-DD-HH-MM-SS.md`). Update any references to journals across the codebase to support reading/writing from these nested directory structures.

## Acceptance Criteria
- [ ] Implement logic to generate timestamped or session-unique markdown files for journals.
- [ ] Ensure files are saved in the correct persona-specific directory under `.foundry/journals/`.
- [ ] Update `.github/scripts` logic (e.g. `analyze-diff.js`, `foundry-orchestrator.ts`) to account for persona-specific subdirectories and timestamped files.
- [ ] Implement unit tests to verify proper path generation and resolution for journals.
