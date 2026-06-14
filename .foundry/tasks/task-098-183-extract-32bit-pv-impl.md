---
id: task-098-183-extract-32bit-pv-impl
type: TASK
title: Extract 32-bit PV using DataView
status: PENDING
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
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

# Extract 32-bit PV using DataView

## Context
As part of the Mirage Island checking feature (Epic `epic-038-062-personality-value-extraction`), we need to parse the full 32-bit personality value (PV) for Gen 3 Pokémon. This requires adhering to ADR 010 by using the native `DataView` API for safe and maintainable binary parsing.

## Requirements
1. **DataView Usage:** The parser MUST use the `DataView` API (e.g., `getUint32`) to safely extract the 32-bit PV instead of raw array access.
2. **Bounds Checking:** Ensure the parser propagates the `RangeError` thrown by `DataView` when attempting out-of-bounds reads. Catch the error, and either throw a clear error message (e.g., "Corrupted Save File") or propagate it up.
3. **Backwards Compatibility:** Ensure that Gen 1 and Gen 2 legacy handlers continue to work without modification.
4. **Resilience Contract:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
5. **Completion Contract:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DataView` extraction for the Gen 3 32-bit PV.
- [ ] Explicitly propagate `RangeError` from out-of-bounds reads.
- [ ] Ensure Gen 1 and Gen 2 legacy parsing remains functional.