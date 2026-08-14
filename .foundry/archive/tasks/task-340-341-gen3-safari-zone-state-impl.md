---
id: task-340-341-gen3-safari-zone-state-impl
type: TASK
title: Gen 3 Safari Zone State Parsing Implementation
status: FAILED
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-340-gen3-safari-zone-save-state
tags:
  - backend
  - safari-zone
  - gen3
research_references: []
rejection_count: 1
rejection_reason: 'Architectural violations: usage of inline magic numbers for lengths and offsets in parseGen3PCBuffer and parseGen3PCBoxes, and ignoring RangeError exceptions in PC data parsing.'
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
- [x] Implement Pokédex data extraction.
- [x] Implement PC Box data extraction.
- [x] Implement Safari Zone missing encounters calculation.
- [x] All memory offsets are defined as module-level constants.
- [x] Relative offsets are used with resolved section offsets.
- [x] RangeError is caught and re-thrown with the correct message.
