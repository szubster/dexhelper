---
id: task-294-317-gen1-event-flag-parsing-qa
type: TASK
title: Gen 1 Event Flag Parsing QA
status: PENDING
owner_persona: qa
created_at: '2026-07-12'
updated_at: '2026-07-12'
depends_on:
  - task-294-316-gen1-event-flag-parsing-impl
jules_session_id: null
pr_number: null
parent: story-136-294-gen1-event-flag-parsing
tags:
  - gen1
  - feature
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Event Flag Parsing QA

Verify the implementation of Gen 1 static encounter event flag parsing.

## Constraints & Requirements

Ensure the implementation in `task-294-316-gen1-event-flag-parsing-impl` satisfies the following architectural rules:

1.  **ADR 026 (Explicit Bitwise Logic)**: The coder must have used explicit bitwise shifting (`>>`) and masking (`&`) to isolate the event flags, avoiding implicit coercion or unsafe byte reading.
2.  **ADR 028 (Module-Level Constants)**: All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
3.  **Correct Integration**: The logic must correctly integrate with `STATIC_GIFT_DATA` for Gen 1, effectively mapping the raw `eventFlags` to actionable insights on which static encounters are claimed.
4.  **Testing**: Comprehensive unit tests must be written to verify the bitwise extraction and mapping logic, including boundary states.

## Process Reminders

- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify ADR 026 adherence (explicit bitwise shifting/masking).
- [ ] Verify ADR 028 adherence (module-level constants, no inline magic numbers).
- [ ] Verify mapping of `eventFlags` to `STATIC_GIFT_DATA`.
- [ ] Verify unit tests cover absolute zero state and boundary states.
