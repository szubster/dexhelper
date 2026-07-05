---
id: epic-099-130-gen3-trainer-data-extraction
type: EPIC
title: Gen 3 Trainer Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '7855089928063975865'
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
- [ ] Identify memory offsets for Trainer ID, and Secret ID in a save file.
- [ ] Update the relevant interface to include Secret ID.
- [ ] Implement extraction logic in `src/engine/saveParser/parsers/gen3.ts`.

## Acceptance Criteria
- [ ] Story Owner: Convert this Epic into Stories.
