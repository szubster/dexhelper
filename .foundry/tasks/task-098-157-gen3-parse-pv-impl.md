---
id: task-098-157-gen3-parse-pv-impl
type: TASK
title: Implement Gen3 32-bit PV parsing
status: READY
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-10'
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

# Implement Gen3 32-bit PV parsing

## Context
As part of the Mirage Island checking feature (Epic `epic-038-062-personality-value-extraction`), we need to parse the full 32-bit personality value (PV) for Gen 3 Pokémon. This requires adhering to ADR 010 by using the native `DataView` API for safe and maintainable binary parsing.

## Requirements
1. **Implementation Details**: Write logic to safely extract the 32-bit PV using the `DataView` API. Ensure that the parser throws explicit, catchable `RangeError` on out-of-bounds reads and propagates them properly.
2. **Backwards Compatibility**: Keep the original Gen 1 and Gen 2 handlers functional without altering legacy parsing.
3. **Important for Coder**: If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement the `DataView` parsing logic for Gen 3 PV extraction.
- [x] Ensure `RangeError` is explicitly caught and propagated for out-of-bounds reads.
- [x] Ensure Gen 1 and Gen 2 parsing logic is untouched.
