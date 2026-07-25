---
id: task-137-338-gen2-event-flag-parsing-retry-impl
type: TASK
title: "Gen 2 Event Flag Parsing Implementation"
status: PENDING
owner_persona: coder
created_at: "2026-07-20"
updated_at: "2026-07-20"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-137-333-gen2-event-flag-parsing-retry
tags:
  - gen2
  - backend
research_references:
  - research-137-330-investigate-gen2-event-flag-failure
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 2 Event Flag Parsing Implementation

Implement the extraction of Gen 2 event flags from the save file.

## Technical Requirements
- As per the research findings (research-137-330), use the following true parsed bit values for the static encounters, do NOT use line numbers from the assembly file:
  - `EVENT_FOUGHT_SUDOWOODO` = 42
  - `EVENT_FOUGHT_HO_OH` = 791
  - `EVENT_FOUGHT_LUGIA` = 792
  - `EVENT_FOUGHT_SNORLAX` = 1872
  - `EVENT_LAKE_OF_RAGE_RED_GYARADOS` = 1873
- Extract these flags and expose them to the state management layer.
- **ADR 028 STRICT COMPLIANCE**: All memory offsets, lengths, and bit locations must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- Ensure appropriate RangeError handling for DataView operations.

## Acceptance Criteria
- [ ] Implement Gen 2 event flag extraction using the specified bit offsets.
- [ ] Define all memory offsets and bit locations as reusable constants at the module level (no magic numbers).
- [ ] Expose the extracted flags to the state management layer.
