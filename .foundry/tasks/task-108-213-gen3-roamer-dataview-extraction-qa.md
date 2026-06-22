---
id: task-108-213-gen3-roamer-dataview-extraction-qa
type: TASK
title: QA Gen 3 Roamer DataView Extraction
status: PENDING
owner_persona: qa
created_at: 2026-06-22
updated_at: 2026-06-22
depends_on:
  - task-108-212-gen3-roamer-dataview-extraction-impl
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

# QA Gen 3 Roamer DataView Extraction

## Objective
Verify that the `coder` correctly implemented the `DataView` extraction and parsing logic for Gen 3 roamer data.

## Description
Validate that the `coder` successfully extracted the 20-byte hidden roamer data structure from Gen 3 save files using `DataView` and correctly parsed IVs, HP, and Level.

## Constraints
- Ensure all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level (no inline magic numbers).
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `DataView` extraction logic for the 20-byte Gen 3 roamer structure is implemented correctly.
- [ ] Verify parsing logic for IVs, HP, and Level from the structure is implemented correctly.
- [ ] Confirm out-of-bounds reads result in a `RangeError` that is gracefully handled and propagated as a validation error.
- [ ] Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, and no inline magic numbers are used.
- [ ] Confirm all tests and linting checks pass.
