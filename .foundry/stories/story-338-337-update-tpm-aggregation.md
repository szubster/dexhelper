---
id: story-338-337-update-tpm-aggregation
type: STORY
title: Update TPM Persona to Aggregate Session Journals
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-22'
updated_at: '2026-07-26'
depends_on:
  - story-338-336-implement-session-unique-journals
jules_session_id: null
pr_number: null
parent: epic-120-338-implement-conflictless-journals
tags:
  - foundry
  - journals
  - workflow
  - DX
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Update TPM Persona to Aggregate Session Journals

## Context
With agents writing to session-unique journal files, the TPM persona must be updated to aggregate or archive these files instead of managing monolithic files.

## Objectives
- Update the TPM persona's instructions and responsibilities to read all session-unique files in persona-specific subdirectories.
- Define a process for the TPM to aggregate these files into a master log or archive them to prevent directory bloat.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [ ] task-337-346-update-tpm-persona-instructions
