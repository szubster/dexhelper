---
id: epic-037-058-unown-tracker-engine
type: EPIC
title: Unown Form Tracker Engine Updates
status: READY
owner_persona: story_owner
created_at: '2026-06-04'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-068-037-unown-tracker
tags:
  - feature
  - gen2
  - tracking
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: Unown Form Tracker Engine Updates

## Objective
Enhance the Gen 2 save parser to correctly identify and expose Unown forms.

## Logic
For Unown (`speciesId` 201) in Gen 2, determine the form by extracting the middle 2 bits of the Attack, Defense, Speed, and Special DVs. Combine them into an 8-bit integer and calculate modulo 28. (0-25 correspond to forms A-Z).

## Output
The parser must append an `unownForm` property (e.g., `'A'`, `'B'`) to the parsed Pokemon instance structure so it can be consumed by the UI.

## Testing
Requires unit tests verifying the exact bitwise calculation against known DV combinations for Unown forms.

## Acceptance Criteria
- [x] Story for parser logic created.
- [x] Story for parser unit tests created.
- [ ] .foundry/stories/story-058-095-unown-parser-logic.md
- [ ] .foundry/stories/story-058-096-unown-parser-tests.md
