---
id: story-401-410-update-downstream-journal-scripts
type: STORY
title: Update Downstream Nodes and Scripts for Journals
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-29'
depends_on:
  - story-401-408-persona-specific-journal-directories
jules_session_id: null
pr_number: null
parent: epic-335-401-implement-conflictless-journals-retry
tags:
  - foundry
  - journals
  - scripts
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Downstream Nodes and Scripts for Journals

## Description
Update any downstream nodes and scripts that reference journals to account for the new conflict-less storage pattern and persona-specific subdirectories.

## Acceptance Criteria
- [x] Identify all scripts referencing old journal paths.
- [x] Update paths and logic to use the new subdirectory structure.

- [ ] task-410-493-update-journal-paths-impl
- [ ] task-410-494-update-journal-paths-qa
