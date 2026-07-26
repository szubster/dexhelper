---
id: task-137-339-gen2-event-flag-parsing-retry-qa
type: TASK
title: Gen 2 Event Flag Parsing QA
status: READY
owner_persona: qa
created_at: '2026-07-20'
updated_at: '2026-07-26'
depends_on:
  - task-137-338-gen2-event-flag-parsing-retry-impl
jules_session_id: null
pr_number: null
parent: story-137-333-gen2-event-flag-parsing-retry
tags:
  - gen2
  - backend
research_references:
  - research-137-330-investigate-gen2-event-flag-failure
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Event Flag Parsing QA

Verify the implementation of the Gen 2 event flag parsing.

## Verification Requirements
- Verify that the Coder used the exact bit offsets for the static encounters: Sudowoodo (42), Ho-Oh (791), Lugia (792), Snorlax (1872), Red Gyarados (1873).
- **ADR 028 STRICT COMPLIANCE**: Verify that all memory offsets, lengths, and bit locations are defined as reusable constants at the module level. Reject the PR if any inline magic numbers are used for memory operations.
- Ensure the state management layer correctly receives the extracted data.

## Acceptance Criteria
- [ ] Verify exact bit offsets are used for static encounters.
- [ ] Verify strict adherence to ADR 028 (no magic numbers, module-level constants used).
- [ ] Verify integration with the state management layer.
