---
id: story-332-473-gen3-fame-checker-parsing-logic
type: STORY
title: Gen 3 Fame Checker Parsing Logic
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-115-332-gen3-fame-checker-save-parsing
tags:
  - gen3
  - firered
  - leafgreen
  - fame-checker
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Fame Checker Parsing Logic

## Context
Following the research into Fame Checker event flags (`epic-115-331-gen3-fame-checker-research`), we need to implement the save parser to extract this data from FireRed and LeafGreen save files.

## Description
This story entails integrating the event flag offsets discovered during the research phase into the Gen 3 save parser, implementing robust parsing logic, and exposing the parsed Fame Checker data in the normalized application state.

## Acceptance Criteria
- [x] Implement the `parseGen3FameChecker` function to extract `pickState` and `flavorTextFlags` from the save file.
- [x] Ensure explicit handling for FireRed/LeafGreen specific structures compared to Ruby/Sapphire/Emerald where applicable.
- [x] Integrate `parseGen3FameChecker` into the Gen 3 save parser.
- [x] Write unit tests for the parsing logic.
- [x] task-473-493-gen3-fame-checker-impl
- [x] task-473-494-gen3-fame-checker-qa
