---
id: task-410-493-update-journal-paths-impl
type: TASK
title: Update Scripts Referencing Journal Paths
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: '6387206081646990546'
pr_number: null
parent: story-401-410-update-downstream-journal-scripts
tags:
  - foundry
  - scripts
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Scripts Referencing Journal Paths

## Description
The journal files are now stored inside persona-specific directories (e.g. `.foundry/journals/coder/YYYY-MM-DD.md`) instead of flat files like `.foundry/journals/coder.md`. We need to update any scripts and nodes referencing the old structure.

## Acceptance Criteria
- [x] Identify all scripts (such as GitHub Actions or internal node parsers) referencing old journal paths.
- [x] Update paths and logic to use the new subdirectory structure.
