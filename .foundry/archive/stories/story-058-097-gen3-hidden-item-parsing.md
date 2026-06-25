---
id: story-058-097-gen3-hidden-item-parsing
type: STORY
title: Gen 3 Hidden Item Event Flags Parsing
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-058-hidden-items-save-parsing
tags:
  - gen3
  - save-parsing
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Hidden Item Event Flags Parsing

## Context
This story focuses on the third part of the epic `epic-037-058-hidden-items-save-parsing`. The `SaveData` interface supports hidden items, and the Gen 3 save parser needs to be extended to read the hidden item event flags.

## Product Requirements
1. Update the `parseGen3` function in `src/engine/saveParser/parsers/gen3.ts` to extract the hidden item flags. In Gen 3, this data is extracted through parsing the section data properly. Note: The Gen 3 parser might still be a stub or in development, so the extraction logic should be placed appropriately based on the current parser's state.
2. Ensure adequate unit tests are added or updated.

## Acceptance Criteria
- [x] `parseGen3` correctly extracts hidden item event flags.
- [x] Unit tests for the Gen 3 save parser are updated and pass.
- [x] .foundry/archive/tasks/task-097-157-gen3-hidden-item-parsing-impl.md
- [x] .foundry/tasks/task-097-158-gen3-hidden-item-parsing-qa.md
