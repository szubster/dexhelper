---
id: epic-113-324-safari-zone-data-integration
type: EPIC
title: Gen 1 & Gen 3 Safari Zone Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '11917385802654546658'
pr_number: null
parent: prd-111-113-safari-zone-tracker
tags:
  - backend
  - safari-zone
  - gen1
  - gen3
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 1 & Gen 3 Safari Zone Data Extraction

## Overview
This Epic covers the backend and data extraction logic necessary to power the Safari Zone Tracking Dashboard. It involves parsing the user's save state to determine game version and Pokédex/PC box state, and mapping that against static encounter tables for the Safari Zone in Gen 1 and Gen 3.

## Technical Scope
- Extract current Pokédex and PC Box state from the save file.
- Implement static data mappings for Safari Zone areas and encounter rates per game version.
- Create utility functions to determine "missing" or "uncaught" Safari Zone encounters based on the current save state.

## Acceptance Criteria
- [x] Create STORY nodes for Gen 1 and Gen 3 save state integration for Safari Zone encounters.
- [x] Create STORY nodes for compiling the static encounter tables for Safari Zones.
- [x] story-324-322-safari-zone-static-tables
- [x] story-324-339-gen1-safari-zone-save-state
- [x] story-324-340-gen3-safari-zone-save-state
- [ ] story-324-489-e2e-verification
