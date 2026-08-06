---
id: task-356-396-gen3-trainer-data-extraction-core-impl
type: TASK
title: Implement Core Gen 3 Trainer Data Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-08-04'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-346-356-gen3-trainer-data-extraction-core
tags:
  - feature
  - gen3
  - trainer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Core Gen 3 Trainer Data Extraction

## Objective
Implement extraction logic for Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file, and update the common interface, strictly adhering to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.

## Requirements
- Update `SaveData` in `src/engine/saveParser/parsers/common.ts` to include `secretId?: number;`. Ensure `trainerName: string;` exists. Note `trainerId` already exists.
- In `src/engine/saveParser/parsers/gen3.ts`, `parseGen3TrainerId` already extracts `secretId`. Make sure it returns `trainerId` and `secretId`. (This might already be happening).
- In `src/engine/saveParser/parsers/gen3.ts`, inside the main parser function `parseGen3Save`, the `secretId` is already extracted via `const { trainerId, secretId } = parseGen3TrainerId(view, section0Offset);`. Update the return object at the end of the `parseGen3Save` function to include `secretId`.
- Ensure `secretId` is added to the `SaveData` interface and returned by `parseGen3Save`.
- **CRITICAL**: You MUST strictly adhere to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [x] Coder: Update `SaveData` interface to include `secretId`.
- [x] Coder: Update `parseGen3Save` return object to include `secretId`.
- [x] Coder: Verify the implementation's exact alignment with the documentation schemas (e.g., Section 14 of `.foundry/docs/schema.md`).
