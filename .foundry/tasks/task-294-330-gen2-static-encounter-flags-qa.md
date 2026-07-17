---
id: task-294-330-gen2-static-encounter-flags-qa
type: TASK
title: QA - Gen 2 Static Encounter Event Flag Parsing
status: CANCELLED
owner_persona: qa
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on:
  - task-294-329-gen2-static-encounter-flags-impl
jules_session_id: null
pr_number: null
parent: story-137-294-gen2-event-flag-parsing
tags:
  - qa
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# QA - Gen 2 Static Encounter Event Flag Parsing

Verify the implementation of Gen 2 static encounter event flag parsing.

## Verification Requirements
1. **Constant Enforcement**: Verify that all byte offsets, bit shifts, and masks are defined as module-level constants and NO magic numbers are used in the bitwise logic.
2. **ADR 026 Compliance**: Verify that explicit bitwise shifting (`>>`) and masking (`&`) are used.
3. **Test Coverage**: Ensure that the unit tests accurately cover the absolute zero state and the boundary states for each of the relevant flags (Sudowoodo, Snorlax, Red Gyarados, Ho-Oh, Lugia).

## QA Contract
- Review the implemented code to ensure all memory offsets, lengths, bit locations, and shifts are defined as reusable module-level constants.
- Reject the implementation if any inline magic numbers are used for memory operations.
- Verify that the parsed event flags are correctly exposed to the state management layer.
- Ensure that unit tests are present and pass successfully.

## Important Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify module-level constants for memory operations.
- [ ] Verify no magic numbers are used inline.
- [ ] Verify explicit bitwise logic (`&`, `>>`) is used per ADR 026.
- [ ] Verify data exposure to the state management layer.
- [ ] Verify unit tests correctly assert the 0 and 1 states of the required static encounter flags.
