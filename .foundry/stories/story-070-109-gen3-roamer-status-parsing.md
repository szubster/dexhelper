---
id: story-070-109-gen3-roamer-status-parsing
type: STORY
title: Gen 3 Roamer Status Condition Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-27'
depends_on:
  - story-070-108-gen3-roamer-dataview-extraction
jules_session_id: '7983098903312013267'
pr_number: null
parent: epic-044-070-gen3-roamer-core-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Status Condition Parsing

## Objective
Extract and parse the Status Condition from the 20-byte Gen 3 roamer data structure.

## Description
Building upon the base structure extracted in the previous story, implement the parsing logic necessary to identify and extract the Status Condition field from the Gen 3 roamer data.

## Acceptance Criteria
- [ ] Implement parsing logic for the Status Condition from the 20-byte roamer structure.
- [x] Tech Lead: Break down this Story into executable Tasks.

- [ ] .foundry/tasks/task-109-224-gen3-roamer-status-parsing-impl.md
- [ ] .foundry/tasks/task-109-225-gen3-roamer-status-parsing-qa.md
