---
id: task-475-550-gen3-ribbon-unit-tests-contest
type: TASK
title: Write Gen 3 Ribbon Unit Tests - Contest Ranks
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on:
  - task-475-549-gen3-ribbon-unit-tests-general
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

# Write Gen 3 Ribbon Unit Tests - Contest Ranks

## Objective
Write unit tests for the `parseGen3Ribbons` function to verify the correct extraction of contest ribbon ranks.

## Acceptance Criteria
- [ ] Add unit tests to `src/engine/saveParser/parsers/gen3.test.ts` to verify the extraction of the 5 contest ribbon ranks (Cool, Beauty, Cute, Smart, Tough) from the 'M' substructure bitfield.
- [ ] Ensure tests cover different rank values (0-4) for each contest category.
