---
id: task-240-245-gen2-daycare-parsing-impl
type: TASK
title: Implement Gen 2 Daycare Data Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: '14562293871297410461'
pr_number: null
parent: story-105-240-daycare-gen2-parsing
tags:
  - gen2
  - breeding
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 2 Daycare Data Parsing

## Context
We need to extract the Pokémon left in the Daycare (Slot 1 and Slot 2) for Gen 2 saves (Gold/Silver and Crystal).
As defined in `.foundry/docs/knowledge_base/engine/save_parsing/gen2_daycare_structure.md`, the offsets are:
- **Gold/Silver**: Slot 1 Data Start is `0x2850`, Slot 2 Data Start is `0x2817`. The Egg Flag is at `0x284f`.
- **Crystal**: Slot 1 Data Start is `0x282c`, Slot 2 Data Start is `0x27f3`. The Egg Flag is at `0x282b`.

Each slot is 57 bytes long:
1. Data Block (32 bytes)
2. OT Name (11 bytes, starts +32)
3. Nickname (11 bytes, starts +43)
4. Flags/Padding (3 bytes)

The Egg species ID is `253` (`0xFD`).

## Constraints
- **CRITICAL**: All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- If a transient failure occurs, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If a permanent failure occurs, update to `status: CANCELLED` with a `rejection_reason`.
- If submitting an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement a parser for Gen 2 Daycare slots that extracts the Pokémon in Slot 1 and Slot 2.
- [ ] Implement parsing of the Egg Flag.
- [ ] Ensure all offsets and sizes (e.g. 57, 32, 11, `0x2850`, `0x282c`, etc.) are defined as module-level constants.
- [ ] Add unit tests verifying the parsing logic.
