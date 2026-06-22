---
id: task-108-211-gen3-roamer-dataview-extraction-qa
type: TASK
title: "Gen 3 Roamer DataView Extraction QA"
status: PENDING
owner_persona: "qa"
created_at: "2026-06-19"
updated_at: "2026-06-19"
depends_on:
  - task-108-210-gen3-roamer-dataview-extraction-impl
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Extraction QA

## Objective
Validate the implementation of DataView reading logic for the 20-byte Gen 3 roamer structure and parsing logic for IVs, HP, and Level.

## Description
Verify that the implementation safely reads the 20-byte roamer structure exclusively using the `DataView` API according to ADR 010. Confirm that the parsing of IVs, HP, and Level from this raw byte structure is accurate. Ensure that any out-of-bounds reads throw a `RangeError` which is caught and gracefully handled (e.g., throwing "Corrupted Save File"). Verify that no inline magic numbers are used and all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level.

## Acceptance Criteria
- [ ] Verify `DataView` reading logic for the 20-byte Gen 3 roamer structure is implemented correctly.
- [ ] Verify parsing logic for IVs, HP, and Level from the structure is implemented correctly.
- [ ] Confirm out-of-bounds reads result in a `RangeError` that is gracefully handled and propagated as a validation error.
- [ ] Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, and no inline magic numbers are used.
- [ ] Confirm all tests and linting checks pass.

### Auditor Rejection
This task was permanently aborted and replaced by `task-108-212-gen3-roamer-dataview-extraction-impl` and `task-108-213-gen3-roamer-dataview-extraction-qa`.

**Important Instructions:**
If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
