---
id: task-294-331-gen3-static-encounters-parsing-impl
type: TASK
title: Gen 3 Static Encounters Parsing Implementation
status: PENDING
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-138-294-gen3-static-encounters-parsing
tags:
  - gen3
  - feature
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Static Encounters Parsing Implementation

Implement the save block extraction logic for Gen 3 event flags related to static encounters, using the offsets provided in the knowledge base.

## Context
We need to parse event flags to determine if static encounters (legendaries, interactables like Sudowoodo, Snorlax, Voltorb/Electrode) have been defeated, caught, or cleared in Gen 3 games (Emerald, FireRed, LeafGreen, Ruby, Sapphire).

## Technical Requirements
1. **Module-Level Constants:**
   - Define module-level constants for all memory offsets, lengths, bit locations, and shifts for the static encounter event flags.
   - You must consult `.foundry/docs/knowledge_base/gen3_static_encounters/gen3_static_encounter_offsets.md` for the exact offsets.
   - For example, Emerald's Mew (Caught) flag is `0x1CA`, Byte Offset `0x39`, Bit `2`.
   - **No magic numbers are allowed inline** during save block extraction (ADR 028).
2. **Relative Offsets (Gen 3):**
   - When extracting data from Gen 3 save files, you MUST use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
   - The event flags section starts at `0x1270` within `SaveBlock1` (Section 1).
3. **Implementation:**
   - Implement the save file parsing logic to extract static encounter status across the different Gen 3 games.
   - Consider the differences between Emerald, FireRed/LeafGreen, and Ruby/Sapphire as documented in the knowledge base.

## Acceptance Criteria
- [ ] Module-level constants are defined for static encounter event flag offsets and bit locations.
- [ ] Save file parsing logic extracts static encounter status accurately.
- [ ] No inline magic numbers are used (ADR 028).
- [ ] Relative offsets are calculated using resolved section offsets for A/B bank flash memory support.

## Reminders for Coder
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures/Aborts:** If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR because the target artifact already exists and is completely implemented, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **YAML Frontmatter:** Do not modify the YAML frontmatter on successful completion. Only update the markdown body (e.g., checking off acceptance criteria).
