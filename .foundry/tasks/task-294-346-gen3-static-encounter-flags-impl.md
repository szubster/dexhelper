---
id: task-294-346-gen3-static-encounter-flags-impl
type: TASK
title: Implement Gen 3 Static Encounter Flags Parsing
status: READY
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-106-138-gen3-static-encounters
tags:
  - gen3
  - feature
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Static Encounter Flags Parsing

Implement `extractGen3StaticEncounterFlags` function using DataView API to extract event flags starting at `0x1270` within `SaveBlock1`.

## Context

According to ADR 028 and the knowledge base, Gen 3 save extraction must use relative offsets using the parsed `section1Offset`. All offsets and bit masks must be explicitly defined as reusable constants at the module level. Inline magic numbers are forbidden.
Furthermore, the `RangeError` from the DataView API must be gracefully handled to throw exactly "The save file is corrupted or incomplete."
Implement parsing for Emerald, FireRed/LeafGreen, and Ruby/Sapphire based on `.foundry/docs/knowledge_base/gen3_static_encounters/gen3_static_encounter_offsets.md`.

## Acceptance Criteria
- [ ] Ensure `src/engine/gen3/staticEncounters.ts` meets the criteria.
- [ ] Define module-level constants for all event flags and bit positions.
- [ ] Implement `extractGen3StaticEncounterFlags` mapping DataView to flags boolean state.
- [ ] Follow ADR 028: No magic numbers. Use relative offsets `section1Offset + EVENT_FLAGS_START + BYTE_OFFSET`.
- [ ] Handle `RangeError` and re-throw with "The save file is corrupted or incomplete."
- [ ] Write tests ensuring offsets are parsed correctly and RangeError is handled.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
