---
id: task-098-170-extract-32bit-pv-qa
type: TASK
title: QA - Extract 32-bit PV using DataView
status: PENDING
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - task-098-169-extract-32bit-pv-impl
jules_session_id: null
pr_number: null
parent: story-062-098-gen3-parse-32bit-pv
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# QA - Extract 32-bit PV using DataView

## Context
The coder has implemented the extraction of the 32-bit personality value (PV) for Gen 3 Pokémon using the native `DataView` API.

## Requirements
1. Verify the parser safely extracts the 32-bit PV using the `DataView` API as per ADR 010.
2. Verify explicit `RangeError` is thrown and properly propagated on out-of-bounds reads.
3. Ensure Gen 1 and Gen 2 legacy handlers still function without alteration.
4. If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
5. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify Gen 3 PV extraction uses `DataView`.
- [ ] Verify `RangeError` propagation for out-of-bounds reads.
- [ ] Verify Gen 1 and 2 handlers are functional.
