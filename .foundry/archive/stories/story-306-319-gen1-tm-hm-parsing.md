---
id: story-306-319-gen1-tm-hm-parsing
type: STORY
title: Gen 1 TM/HM Parse
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-110-306-tm-hm-save-parsing
tags:
  - feature
  - gen1
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 TM/HM Parsing

## Overview
Parse the Gen 1 save file Item Bag to extract the player's current TM and HM inventory.

## Requirements
- Map the parsed TM/HM items to their corresponding moves.
- Extract Event Flags to determine if one-time TMs have already been collected.
- Must adhere to ADR 015 regarding full `PokeData` property names.
- Must follow ADR 028 for dynamic save block extraction.

## Acceptance Criteria
- [x] Break down into TASK nodes for implementation.
- [x] task-319-322-gen1-tm-hm-parsing-impl
- [x] task-319-323-gen1-tm-hm-parsing-qa
