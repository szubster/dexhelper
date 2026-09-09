---
id: task-475-549-gen3-ribbon-unit-tests-general
type: TASK
title: Write Gen 3 Ribbon Unit Tests - General Flags
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-133-475-gen3-ribbon-unit-tests
tags:
  - gen3
  - save-engine
  - data-extraction
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Gen 3 Ribbon Unit Tests - General Flags

## Objective
Write unit tests for the `parseGen3Ribbons` function to verify the correct extraction of general ribbon flags and the obedience flag.

## Acceptance Criteria
- [ ] Add unit tests to `src/engine/saveParser/parsers/gen3.test.ts` to verify the extraction of the 12 general ribbon flags (Champion, Winning, Victory, Artist, Effort, Battle Champion, Regional Champion, National Champion, Country, National, Earth, World) from the 'M' substructure bitfield.
- [ ] Add unit tests to verify the correct extraction of the Obedience flag (bit 31).
