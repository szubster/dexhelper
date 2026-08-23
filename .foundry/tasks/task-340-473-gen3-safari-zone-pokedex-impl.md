---
id: task-340-473-gen3-safari-zone-pokedex-impl
type: TASK
title: Gen 3 Safari Zone Pokedex Data Extraction
status: READY
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
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

# Gen 3 Safari Zone Pokedex Data Extraction

## Overview
Implement parsing logic to extract Pokédex state from Gen 3 save files to determine Safari Zone encounters.

## Technical Scope
- Read and extract Pokédex state data from the Gen 3 save file.

## Architecture & Contract Directives
- **Offset Constants**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden (per ADR 028).
- **Relative Offsets**: Use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- **Corrupted Saves**: You MUST catch `RangeError` from out-of-bounds `DataView` reads and throw a new error with the exact message: "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement Pokédex data extraction.
- [ ] All memory offsets are defined as module-level constants.
- [ ] Relative offsets are used with resolved section offsets.
- [ ] RangeError is caught and re-thrown with the correct message.
