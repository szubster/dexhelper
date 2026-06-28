---
id: task-099-228-expose-lower-16bit-pv-impl
type: TASK
title: Expose lower 16-bits of PV implementation
status: PENDING
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-062-099-gen3-expose-lower-16bit-pv
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Expose lower 16-bits of PV implementation

## Context
As part of the Mirage Island checking feature, after parsing the 32-bit PV, we need to pre-calculate and expose its lower 16 bits. This specific 16-bit value is compared against the daily generated Mirage Island value to determine if the island will appear.

## Requirements
1. **Pre-calculation**: Ensure that the lower 16 bits of the 32-bit PV are calculated and exposed during the data parsing and processing phases. Modify `parseGen3PersonalityValue` in `src/engine/saveParser/parsers/gen3.ts` to return an object `{ pv: number; lower16: number }` instead of just `number`, or create a separate function `parseGen3PersonalityValueLower16`.
2. **Data Structure Consistency**: Add this logic securely and optimally alongside the newly minted 32-bit PV value using Bitwise operations.
3. **Resilience Contract**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
4. **Completion Contract**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement logic to expose lower 16-bits of PV.
- [ ] Run `pnpm test` to ensure there are no regressions.