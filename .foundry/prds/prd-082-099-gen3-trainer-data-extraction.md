---
id: prd-082-099-gen3-trainer-data-extraction
type: PRD
title: Gen 3 Trainer Data Extraction
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-01'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: '365735201569879069'
pr_number: null
parent: idea-082-gen3-secret-id-shiny-rng
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
Extract the Trainer ID (TID) and Secret ID (SID) from a Gen 3 save file and display it in the application.

## Requirements
- Identify memory offsets for Trainer ID, and Secret ID in a save file.
- Update the relevant interface to include Secret ID.
- Implement extraction logic in `src/engine/saveParser/parsers/gen3.ts`.

## Acceptance Criteria
- [x] Epic Planner: Convert this PRD into Epics.
- [ ] epic-099-130-gen3-trainer-data-extraction
