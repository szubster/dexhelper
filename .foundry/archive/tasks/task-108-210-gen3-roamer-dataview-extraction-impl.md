---
id: task-108-210-gen3-roamer-dataview-extraction-impl
type: TASK
title: "Gen 3 Roamer DataView Extraction Implementation"
status: CANCELLED
owner_persona: "coder"
created_at: "2026-06-19"
updated_at: "2026-06-19"
depends_on:
  - research-108-209-gen3-roamer-iv-bitfield
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: 'Redundant task, implementation was already completed in task-108-161'
notes: ''
---

# Gen 3 Roamer DataView Extraction Implementation

## Objective
Implement DataView reading logic for the 20-byte Gen 3 roamer structure and parsing logic for IVs, HP, and Level. Must wait for `research-108-209-gen3-roamer-iv-bitfield` to be completed.

## Description
Following ADR 010, implement extraction of the 20-byte hidden roamer data structure from Gen 3 save files safely using the `DataView` API. Following extraction, parse the IVs, HP, and Level of the roamer from this raw byte structure according to the bitwise layout identified in `research-108-209-gen3-roamer-iv-bitfield`.
Ensure that any out-of-bounds reads result in a `RangeError` that is caught and handled gracefully by propagating a validation error (e.g., "Corrupted Save File").
All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [x] Implement `DataView` reading logic for the 20-byte Gen 3 roamer structure.
- [x] Implement parsing logic for IVs, HP, and Level from the structure.
- [x] Handle `RangeError` on out-of-bounds reads gracefully and throw a clear validation error.
- [x] All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- [x] Tests and lint must pass.

**Important Instructions:**
If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.


### Auditor Rejection
This task is permanently cancelled as it is redundant. The extraction logic was already fully implemented and verified in task-108-161.
