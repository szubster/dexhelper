---
id: story-058-096-gen2-hidden-item-parsing
type: STORY
title: Gen 2 Hidden Item Event Flags Parsing
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-058-hidden-items-save-parsing
tags:
  - gen2
  - save-parsing
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 2 Hidden Item Event Flags Parsing

## Context
This story focuses on the second part of the epic `epic-037-058-hidden-items-save-parsing`. The `SaveData` interface has already been updated (or will be soon), and the Gen 2 save parser needs to be extended to read the hidden item event flags.

## Product Requirements
1. Update the `parseGen2` function in `src/engine/saveParser/parsers/gen2.ts` to extract the hidden item flags. In Gen 2, hidden item flags are stored in the event flags block, which needs to be correctly identified and extracted into `SaveData.hiddenItemFlags`.
2. Ensure adequate unit tests are added or updated.

## Acceptance Criteria
- [ ] `parseGen2` correctly extracts hidden item event flags.
- [ ] Unit tests for the Gen 2 save parser are updated and pass.

## Generated Tasks
- [ ] .foundry/tasks/task-096-157-gen2-hidden-item-parsing-impl.md
- [ ] .foundry/tasks/task-096-158-gen2-hidden-item-parsing-qa.md
