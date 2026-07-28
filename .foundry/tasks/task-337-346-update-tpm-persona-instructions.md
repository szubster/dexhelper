---
id: task-337-346-update-tpm-persona-instructions
type: TASK
title: Update TPM Persona Instructions for Session Journals
status: ACTIVE
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: '11492831618979811396'
pr_number: null
parent: story-338-337-update-tpm-aggregation
tags:
  - foundry
  - journals
  - workflow
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Update TPM Persona Instructions for Session Journals

## Context
With the shift to session-unique journal files per agent (e.g. `.foundry/journals/coder/<session_id>.md`), the TPM persona must aggregate or handle archiving these individual files rather than monolithic ones.

## Objectives
- Update `.github/agents/tpm.md`.
- Modify the "Manage Journals" instruction to reflect that the TPM should now read and process all session-unique markdown files located inside persona-specific subdirectories (e.g., `.foundry/journals/*/*.md`).
- Define the process to aggregate these session-unique files into a master log (if still applicable) or archive them individually to prevent directory bloat while retaining valuable knowledge.

## Acceptance Criteria
- [x] `.github/agents/tpm.md` is updated to describe the new session-unique journal archiving and aggregation rules.
