---
id: task-408-431-implement-persona-specific-journals-qa
type: TASK
title: 'QA: Implement Persona-Specific Journal Directories'
status: READY
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-24'
depends_on:
  - task-408-430-implement-persona-specific-journals-impl
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

# QA: Implement Persona-Specific Journal Directories

## Description
Verify that the `coder` implementation correctly transitions the journal system to use timestamped or session-unique markdown files within persona-specific directories (e.g., `.foundry/journals/coder/<session_id>.md`). Ensure existing scripts correctly ignore or process these journal files as before and there are no regressions.

## Acceptance Criteria
- [ ] Verify that new journals are generated as timestamped or session-unique files under `.foundry/journals/<persona>/`.
- [ ] Verify that `.github/scripts` correctly resolve or ignore journals under persona-specific directories.
- [ ] Ensure all unit tests introduced by the `coder` pass successfully.
- [ ] Perform a manual check to ensure journals are created according to the new specifications.
