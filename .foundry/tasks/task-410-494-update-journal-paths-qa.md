---
id: task-410-494-update-journal-paths-qa
type: TASK
title: 'QA: Verify Updated Scripts Referencing Journal Paths'
status: ACTIVE
owner_persona: qa
created_at: '2026-08-08'
updated_at: '2026-08-31'
depends_on:
  - task-410-493-update-journal-paths-impl
jules_session_id: '8969279549183669736'
pr_number: null
parent: story-401-410-update-downstream-journal-scripts
tags:
  - foundry
  - scripts
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA: Verify Updated Scripts Referencing Journal Paths

## Description
Verify that the scripts and references updated in `task-410-493-update-journal-paths-impl` correctly handle the new persona-specific subdirectory structure.

## Acceptance Criteria
- [x] Verify that there are no remaining broken references to the old journal paths in the codebase.
- [x] Run scripts (e.g., `validate-foundry-schema.ts`) to ensure they do not error due to path mismatches.
