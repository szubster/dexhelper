---
id: story-111-276-trick-house-parser-impl
type: STORY
title: Implement Gen 3 Trick House Parser
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '3306346041544894784'
pr_number: null
parent: epic-054-111-trick-house-save-parsing
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Implement Gen 3 Trick House Parser

## Objective
Implement a parser using `DataView` to extract Trick House progression states from Gen 3 save files, using the documented offsets.

## Scope
- Create technical blueprint tasks to parse the variables from `SaveBlock1` defined in `.foundry/docs/knowledge_base/gen3_trick_house_offsets.md`.
- Extract puzzle states, entrance state, and completion flags.

## Acceptance Criteria
- [x] Parse `VAR_TRICK_HOUSE_LEVEL_OFFSET` and other progression variables.
- [x] Parse `FLAG_LANDMARK_TRICK_HOUSE`.
- [x] task-276-304-gen3-trick-house-parser-impl
- [ ] task-276-305-gen3-trick-house-parser-qa
