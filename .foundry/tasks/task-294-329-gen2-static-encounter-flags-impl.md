---
id: task-294-329-gen2-static-encounter-flags-impl
type: TASK
title: Gen 2 Static Encounter Event Flag Parsing Implementation
status: CANCELLED
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-137-294-gen2-event-flag-parsing
tags:
  - gen2
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Gen 2 Static Encounter Event Flag Parsing Implementation

Implement the parsing logic to extract event flags for Gen 2 static encounters from the save file. This includes specific encounters like Sudowoodo, Snorlax, Red Gyarados, Ho-Oh, and Lugia. The extracted data must be exposed to the state management layer.

## Context and Requirements
1. **Event Flags Region**: The event flags are located exactly 256 bytes prior to `wCurBox` (`0x2624` for Gold/Silver English, `0x2600` for Crystal English). See `.foundry/docs/knowledge_base/engine/save_parsing/gen2_generic_structure.md`.
2. **Bitwise Extraction**: Adhere strictly to **ADR 026**. Parsers MUST use explicit bitwise shifting (`>>`) and masking (`&`) to isolate multi-value bitfields or extract single-bit properties into boolean states.
3. **Module-level Constants**: All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers for memory operations are strictly forbidden.

## Technical Contract
- **Module:** Target the Gen 2 save parsing module (`src/engine/saveParser/gen2/` or similar).
- **Constants:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level.
- **No Magic Numbers:** Inline magic numbers are strictly forbidden for memory operations.
- **Data Exposure:** Ensure the parsed event flags are correctly mapped and exposed to the central state management layer for use by the UI.

## Important Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement event flag extraction for Gen 2 static encounters (Sudowoodo, Snorlax, Red Gyarados, Ho-Oh, Lugia).
- [ ] Define all memory offsets, lengths, bit locations, and shifts as module-level constants.
- [ ] Expose the extracted data to the state management layer.
- [ ] Write or update unit tests to verify parsing logic.
