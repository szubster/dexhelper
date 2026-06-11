---
id: story-058-095-unown-parser-logic
type: STORY
title: Unown Form Parser Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '4001737636652127117'
pr_number: null
parent: epic-037-058-unown-tracker-engine
tags:
  - feature
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Unown Form Parser Logic

## Objective
Implement the logic to extract the Unown form from its DVs (Determinant Values).

## Context
As defined in the parent Epic, for Unown (`speciesId` 201) in Generation 2, we can determine its form by extracting the middle 2 bits of its Attack, Defense, Speed, and Special DVs. These 2 bits from each DV are concatenated into an 8-bit integer, and the form is determined by `modulo 28`. The result maps `0-25` to the letters `'A'-'Z'`.

## Requirements
- When parsing Gen 2 Pokemon instances, detect if `speciesId === 201`.
- If so, calculate the form using the DVs.
- Add an `unownForm` property (e.g., `'A'`, `'B'`) to the resulting parsed Pokemon instance structure.
- **Do not write tests in this story**. Unit tests will be handled in a separate story to encourage granular tasks.

## Acceptance Criteria
- [x] Task created for implementing the unown form parser logic.
- [ ] .foundry/tasks/task-095-151-unown-parser-logic-impl.md
