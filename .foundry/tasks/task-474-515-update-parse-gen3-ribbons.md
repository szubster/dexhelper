---
id: task-474-515-update-parse-gen3-ribbons
type: TASK
title: Update parseGen3Ribbons Function
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-05'
depends_on:
  - task-474-514-update-gen3-ribbons-interface
jules_session_id: '5256487735647380655'
pr_number: null
parent: story-133-474-gen3-ribbon-extraction-logic
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update parseGen3Ribbons Function

## Objective
Update the `parseGen3Ribbons` function in `src/engine/saveParser/parsers/gen3.ts` to extract the remaining ribbon flags and the obedience flag.

## Acceptance Criteria
- [x] Update `parseGen3Ribbons` to use the defined constants (e.g., `RIBBON_CHAMPION_BIT`, `OBEDIENCE_FLAG_BIT`) to extract boolean flags from the bitfield.
- [x] Update unit tests for `parseGen3Ribbons` in `src/engine/saveParser/parsers/gen3.test.ts` to cover the extraction of the new flags.
