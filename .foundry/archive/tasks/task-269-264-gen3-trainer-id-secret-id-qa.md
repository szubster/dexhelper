---
id: task-269-264-gen3-trainer-id-secret-id-qa
type: TASK
title: QA Gen 3 Trainer ID and Secret ID Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-05'
updated_at: '2026-07-19'
depends_on:
  - task-269-263-gen3-trainer-id-secret-id-impl
jules_session_id: null
pr_number: null
parent: story-130-269-extract-gen3-trainer-id-secret-id
tags:
  - feature
  - gen3
  - trainer
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Trainer ID and Secret ID Extraction

## Objective
Verify the parser and interface correctly extract the Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file.

## Constraints & Memory Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When parsing save files, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level; inline magic numbers are forbidden.

## Acceptance Criteria
- [x] Verify the TID and SID extraction logic in `src/engine/saveParser/parsers/gen3.ts` works as intended.
- [x] Verify tests adequately cover the extraction scenarios.
