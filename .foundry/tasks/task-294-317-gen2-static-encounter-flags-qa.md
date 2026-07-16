---
id: task-294-317-gen2-static-encounter-flags-qa
type: TASK
title: QA Gen 2 Static Encounter Flag Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-07-12'
updated_at: '2026-07-16'
depends_on:
  - task-294-316-gen2-static-encounter-flags-impl
jules_session_id: '8283793746439078695'
pr_number: null
parent: story-137-294-gen2-event-flag-parsing
tags:
  - gen2
  - qa
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Static Encounter Flag Parsing

Verify the implementation of the Gen 2 static encounter flag parsing.

## Verification Requirements
1. **Constant Enforcement**: Verify that all byte offsets, bit shifts, and masks are defined as module-level constants and NO magic numbers are used in the bitwise logic.
2. **ADR 026 Compliance**: Verify that explicit bitwise shifting (`>>`) and masking (`&`) are used.
3. **Test Coverage**: Ensure that the unit tests accurately cover the absolute zero state and the boundary states for each of the relevant flags (Sudowoodo, Snorlax, Red Gyarados, Ho-Oh, Lugia).

## Acceptance Criteria
- [ ] No inline magic numbers are used for memory operations or bit shifts.
- [ ] Explicit bitwise logic (`&`, `>>`) is used per ADR 026.
- [ ] Unit tests correctly assert the 0 and 1 states of the required static encounter flags.

## Error Handling
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
