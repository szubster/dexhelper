---
id: epic-099-130-gen3-trainer-data-extraction
type: EPIC
title: Gen 3 Trainer Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: '7629362275415868252'
pr_number: null
parent: prd-082-099-gen3-trainer-data-extraction
tags:
  - feature
  - gen3
  - trainer
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Gen 3 Trainer Data Extraction

## Objective
Extract the Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file.

## Requirements
- [x] Identify memory offsets for Trainer ID, and Secret ID in a save file.
- [x] Update the relevant interface to include Secret ID.
- [x] Implement extraction logic in `src/engine/saveParser/parsers/gen3.ts`.

## Acceptance Criteria
- [x] Story Owner: Convert this Epic into Stories.
- [x] story-130-269-extract-gen3-trainer-id-secret-id
