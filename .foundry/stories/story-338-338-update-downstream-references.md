---
id: story-338-338-update-downstream-references
type: STORY
title: Update Downstream References for Fragmented Journals
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-22'
updated_at: '2026-08-03'
depends_on:
  - story-338-337-update-tpm-aggregation
jules_session_id: '5253103258856818130'
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

# STORY: Update Downstream References for Fragmented Journals

## Context
Various nodes, scripts, and personas (like the Agile Coach or resurrected FAILED nodes) currently reference monolithic journal files (e.g., `.foundry/journals/coder.md`). With the transition to session-unique and TPM-aggregated journals, these references must be updated.

## Objectives
- Identify all scripts, documents, and agent prompts that reference old journal paths.
- Update them to either reference the new directory structure, the TPM's aggregated master logs, or instruct them to read fragmented files dynamically.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [ ] task-338-388-update-journal-references
