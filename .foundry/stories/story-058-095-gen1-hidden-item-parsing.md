---
id: story-058-095-gen1-hidden-item-parsing
type: STORY
title: Gen 1 Hidden Item Event Flags Parsing
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-058-hidden-items-save-parsing
tags:
  - gen1
  - save-parsing
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 1 Hidden Item Event Flags Parsing

## Context
This story focuses on the first part of the epic `epic-037-058-hidden-items-save-parsing`. The `SaveData` interface needs to support hidden items, and the Gen 1 save parser needs to be extended to read the hidden item event flags.

## Product Requirements
1. Update `SaveData` interface in `src/engine/saveParser/parsers/common.ts` to include a new field, e.g., `hiddenItemFlags?: Uint8Array;`.
2. Update the `parseGen1` function in `src/engine/saveParser/parsers/gen1.ts` to extract the hidden item flags. In Gen 1, hidden item flags are typically part of the event flags or stored in a specific hidden item bit array, which needs to be correctly identified and extracted. (Hint: The hidden coin flags and hidden item flags are situated around the event flags block).
3. Ensure backwards compatibility, where older versions of the app might not have `hiddenItemFlags`.
4. Ensure adequate unit tests are added or updated.

## Acceptance Criteria
- [ ] `SaveData` interface includes `hiddenItemFlags`.
- [ ] `parseGen1` correctly extracts hidden item event flags.
- [ ] Unit tests for the Gen 1 save parser are updated and pass.

## Generated Tasks
- [ ] task-095-151-gen1-hidden-item-parsing-impl
- [ ] task-095-167-gen1-hidden-coin-parsing-impl
- [ ] task-095-152-gen1-hidden-item-parsing-qa
- [ ] task-095-168-gen1-hidden-coin-parsing-qa
