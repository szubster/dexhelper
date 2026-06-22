---
id: task-105-215-gen3-roamer-parser-alternative-qa
type: TASK
title: QA Gen 3 Roamer Alternative Parse Logic
status: PENDING
owner_persona: qa
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - task-105-214-gen3-roamer-parser-alternative-impl
jules_session_id: null
pr_number: null
parent: story-067-105-gen3-roamer-parser-implementation
tags:
  - gen3
  - roamer
  - parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Roamer Alternative Parse Logic

## Objective
Verify the Gen 3 alternative roamer parsing implementation.

## Description
Ensure that the parser correctly extracts `speciesId`, `level`, `active` status boolean, and IV metadata of the roamer using the `DataView` API. Verify that no map location parsing is attempted and that all parsing relies on module-level constants instead of inline magic numbers.

## Acceptance Criteria
- [ ] Verify parser extracts species ID and level using DataView.
- [ ] Verify parser extracts active status flag using DataView.
- [ ] Verify parser extracts IV metadata using DataView.
- [ ] Verify `RangeError` from out-of-bounds reads is handled gracefully.
- [ ] Verify no inline magic numbers are used in the parsing logic.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
