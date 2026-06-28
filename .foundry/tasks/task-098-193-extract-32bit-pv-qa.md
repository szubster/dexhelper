---
id: task-098-193-extract-32bit-pv-qa
type: TASK
title: QA - Extract 32-bit PV using DataView
status: ACTIVE
owner_persona: qa
created_at: '2026-06-16'
updated_at: '2026-06-27'
depends_on:
  - task-098-192-extract-32bit-pv-impl
jules_session_id: '6961323802298327849'
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
The coder has implemented the extraction logic for the 32-bit personality value (PV) for Gen 3 Pokémon. This requires adhering to ADR 010 by using the native `DataView` API.

## Requirements
1. **Verification:** Verify that the `DataView` API (e.g., `getUint32`) is used to extract the 32-bit PV.
2. **Error Handling:** Verify that the parser properly propagates `RangeError` on out-of-bounds reads.
3. **Legacy Checks:** Ensure that the original Gen 1 and Gen 2 handlers remain functional and unadulterated.
4. **Resilience Contract:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
5. **Completion Contract:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify `DataView` is used for Gen 3 PV extraction.
- [x] Verify `RangeError` is propagated on out-of-bounds reads.
- [x] Verify Gen 1 and Gen 2 parsing handlers are fully functional.
