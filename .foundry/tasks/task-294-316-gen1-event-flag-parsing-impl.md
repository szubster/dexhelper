---
id: task-294-316-gen1-event-flag-parsing-impl
type: TASK
title: Gen 1 Event Flag Parsing Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-07-12'
updated_at: '2026-07-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-136-294-gen1-event-flag-parsing
tags:
  - gen1
  - feature
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Event Flag Parsing Implementation

Implement the extraction and parsing of the event flags for Gen 1 static encounters from the save file. Currently the `eventFlags` array is extracted in `src/engine/saveParser/parsers/gen1.ts`, but we need to integrate this with `STATIC_GIFT_DATA` (from `src/engine/data/gen1/assistantData.ts`) to make actionable sense of these flags.

Specifically, create a mechanism (e.g. `src/engine/saveParser/utils/eventFlags.ts` or directly within the parser/generators) to evaluate which Gen 1 static encounters (like Mewtwo, Snorlax, Legendary Birds, fossil choices) have already been claimed or defeated by the player.

## Constraints & Requirements

1.  **Adhere to ADR 026 (Explicit Bitwise Logic)**: Use explicit bitwise shifting (`>>`) and masking (`&`) to isolate the event flags from the raw byte array. Do not rely on implicit boolean coercion of full bytes.
2.  **Adhere to ADR 028 (Module-Level Constants)**: All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. **No inline magic numbers** for evaluating the flags.
3.  **Handle Empty/Traded States**: Be mindful that some event flags might only be set upon specific in-game interactions. Ensure you are evaluating the correct bits. The `STATIC_GIFT_DATA` provides `eventFlag` properties that point to the specific flag ID.

## Process Reminders

- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (e.g. if the implementation already exists), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Create constants for event flag bits/offsets according to ADR 028.
- [x] Implement parsing logic using explicit bitwise operators according to ADR 026.
- [x] Map the raw `eventFlags` to the `STATIC_GIFT_DATA` Gen 1 definitions.
- [x] Write unit tests to verify the extraction logic, explicitly testing edge cases (e.g. absolute zero state, boundary states).
