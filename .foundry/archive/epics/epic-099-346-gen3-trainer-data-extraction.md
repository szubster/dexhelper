---
id: epic-099-346-gen3-trainer-data-extraction
type: EPIC
title: Gen 3 Trainer Data Extraction
status: COMPLETED
owner_persona: story_owner
created_at: '2026-07-25'
updated_at: '2026-08-23'
depends_on: []
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
- Include E2E/integration testing to ensure reliability and correct rendering.

## Acceptance Criteria
- [x] Story Owner: Convert this Epic into Stories.
- [x] story-346-356-gen3-trainer-data-extraction-core
- [x] story-346-357-gen3-trainer-data-e2e

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
