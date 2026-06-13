---
id: task-098-169-extract-32bit-pv-impl
type: TASK
title: Extract 32-bit PV using DataView
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
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
As part of the Mirage Island checking feature, we need to parse the full 32-bit personality value (PV) for Gen 3 Pokémon. This requires adhering to ADR 010 by using the native `DataView` API.

## Requirements
1. Use the native `DataView` API (e.g., `getUint32`) to extract the 32-bit PV.
2. Ensure that the parser throws explicit, catchable `RangeError` on out-of-bounds reads and propagates them properly.
3. Keep the original Gen 1 and Gen 2 handlers functional without altering legacy parsing.
4. If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
5. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement the 32-bit PV extraction using `DataView`.
- [ ] Explicitly throw and propagate `RangeError` on out-of-bounds reads.
- [ ] Verify Gen 1 and Gen 2 parsing handlers remain functional.
