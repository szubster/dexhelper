---
id: story-130-269-extract-gen3-trainer-id-secret-id
type: STORY
title: Extract Gen 3 Trainer ID and Secret ID
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-04'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-099-130-gen3-trainer-data-extraction
tags:
  - feature
  - gen3
  - trainer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract Gen 3 Trainer ID and Secret ID

## Objective
Update the parser and interface to properly extract the Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file.

## Context
Based on Bulbapedia's "Save data structure (Generation III)" documentation, the Trainer ID is a 4-byte value located at offset `0x000A` within Section 0 (Trainer Info).

## Acceptance Criteria
- [x] Create Tasks for the implementation.
- [x] task-269-263-gen3-trainer-id-secret-id-impl
- [x] task-269-264-gen3-trainer-id-secret-id-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
