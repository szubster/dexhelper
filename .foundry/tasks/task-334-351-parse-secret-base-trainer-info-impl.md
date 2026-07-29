---
id: task-334-351-parse-secret-base-trainer-info-impl
type: TASK
title: Implement Gen 3 Secret Base Trainer Info Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-334-extract-mixed-record-trainer-data
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# TASK: Implement Gen 3 Secret Base Trainer Info Extraction

## Objective
Implement extraction of NPC trainer details (name, ID) associated with Secret Bases from mixed record data in Gen 3 save files.

## Requirements
1.  Strictly adhere to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
2.  Define all offsets and lengths as module-level constants. No inline magic numbers.
3.  Use relative offsets based on the resolved section offset for Gen 3.
4.  Catch `RangeError` during DataView reads and throw a new error with the message "The save file is corrupted or incomplete."
5.  Extract `trainerName` (7 bytes) and `trainerId` (4 bytes).
6.  Write unit tests validating the extraction logic.

## Acceptance Criteria
- [x] Implement extraction logic for trainer name and ID for Gen 3 Secret Bases.
- [x] Conform to all rules in Section 13 of `schema.md`.
- [x] Unit tests added for the extraction logic.
