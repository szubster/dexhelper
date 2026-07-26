---
id: task-340-341-gen3-safari-zone-state-impl
type: TASK
title: Gen 3 Safari Zone State Parsing Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: '12080520713395039295'
pr_number: null
parent: story-324-340-gen3-safari-zone-save-state
tags:
  - backend
  - safari-zone
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Safari Zone State Parsing Implementation

## Overview
Implement parsing logic to extract Pokédex and PC Box state from Gen 3 save files to determine Safari Zone encounters.

## Technical Scope
- Read and extract Pokédex state data from the Gen 3 save file.
- Read and extract PC Box state data from the Gen 3 save file.
- Use extracted state to calculate missing Safari Zone encounters based on static encounter tables.

## Architecture & Contract Directives
- **Offset Constants**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden (per ADR 028).
- **Relative Offsets**: Use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- **Corrupted Saves**: You MUST catch `RangeError` from out-of-bounds `DataView` reads and throw a new error with the exact message: "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement Pokédex data extraction.
- [ ] Implement PC Box data extraction.
- [ ] Implement Safari Zone missing encounters calculation.
- [ ] All memory offsets are defined as module-level constants.
- [ ] Relative offsets are used with resolved section offsets.
- [ ] RangeError is caught and re-thrown with the correct message.
