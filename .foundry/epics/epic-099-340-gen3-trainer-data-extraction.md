---
id: epic-099-340-gen3-trainer-data-extraction
type: EPIC
title: Gen 3 Trainer Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-07-22'
updated_at: '2026-07-22'
depends_on:
  - research-099-339-gen3-trainer-data-e2e
jules_session_id: null
pr_number: null
parent: prd-082-099-gen3-trainer-data-extraction
tags:
  - feature
  - gen3
  - trainer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Trainer Data Extraction

## Objective
Extract the Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file.

## Requirements
- Identify memory offsets for Trainer ID, and Secret ID in a save file.
- Update the relevant interface to include Secret ID.
- Implement extraction logic in `src/engine/saveParser/parsers/gen3.ts`.
- E2E/integration story must be created and completed.

## Acceptance Criteria
- [x] Story Owner: Convert this Epic into Stories.
- [x] story-130-269-extract-gen3-trainer-id-secret-id