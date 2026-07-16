---
id: task-294-316-gen2-static-encounter-flags-impl
type: TASK
title: Implement Gen 2 Static Encounter Flag Parsing
status: COMPLETED
owner_persona: coder
created_at: '2026-07-12'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-137-294-gen2-event-flag-parsing
tags:
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Static Encounter Flag Parsing

Extract the event flags for Gen 2 static encounters from the save file. This involves finding the offsets and bit positions for encounters like Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia, and exposing this data to the state management layer.

## Context and Requirements
1. **Event Flags Region**: The event flags are located exactly 256 bytes prior to `wCurBox` (`0x2624` for Gold/Silver English, `0x2600` for Crystal English). See `.foundry/docs/knowledge_base/engine/save_parsing/gen2_generic_structure.md`.
2. **Bitwise Extraction**: Adhere strictly to **ADR 026**. Parsers MUST use explicit bitwise shifting (`>>`) and masking (`&`) to isolate multi-value bitfields or extract single-bit properties into boolean states.
3. **Module-level Constants**: All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers for memory operations are strictly forbidden.
4. **Relevant Flags**: You will need to parse out the flags for encounters such as:
   - Sudowoodo
   - Snorlax
   - Red Gyarados
   - Ho-Oh (Tin Tower)
   - Lugia (Whirl Islands)
   - *Note: Exact byte/bit offsets within the 256-byte array may require referencing pokecrystal `constants/event_flags.asm`. Do not guess these; if you lack the exact constants, use late-binding and spawn a RESEARCH node to map the specific byte offsets and bits within the event flag array.*

## Acceptance Criteria
- [x] Module-level constants are defined for the offset of the event flags block and the specific byte/bit offsets for each static encounter flag.
- [x] The `gen2` save parser reads the event flag block and extracts the required static encounter flags (Sudowoodo, Snorlax, Red Gyarados, Ho-Oh, Lugia) into a clean, typed object/structure.
- [x] Explicit bitwise logic (`&`, `>>`) is used per ADR 026.
- [x] Unit tests are written to verify that flags are correctly extracted (0/1 states).

## Error Handling
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
