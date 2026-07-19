---
id: task-269-263-gen3-trainer-id-secret-id-impl
type: TASK
title: Implement Gen 3 Trainer ID and Secret ID Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-07-05'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-130-269-extract-gen3-trainer-id-secret-id
tags:
  - feature
  - gen3
  - trainer
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Trainer ID and Secret ID Extraction

## Objective
Update the parser and interface to properly extract the Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file.

## Context
Based on Bulbapedia's "Save data structure (Generation III)" documentation, the Trainer ID is a 4-byte value located at offset `0x000A` within Section 0 (Trainer Info).
The 4-byte value actually contains both the TID and SID. It is typically split as the lower 2 bytes (16-bit integer) being the public Trainer ID and the upper 2 bytes being the Secret ID.
The extraction logic needs to be implemented in `src/engine/saveParser/parsers/gen3.ts`.

## Constraints & Memory Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When parsing save files, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level; inline magic numbers are forbidden.

## Acceptance Criteria
- [x] Implement extraction logic for Trainer ID and Secret ID from Gen 3 save files.
- [x] Verify functionality via appropriate tests.
