---
id: task-105-215-gen3-roamer-parser-retry-qa
type: TASK
title: QA Gen 3 Roamer Parse Logic (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - task-105-214-gen3-roamer-parser-retry-impl
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

# QA Gen 3 Roamer Parse Logic (Retry)

## Objective
Verify the Gen 3 roamer parsing implementation.

## Description
Ensure that the parser correctly extracts `speciesId` and `level` of the active roamer using the `DataView` API and that it correctly verifies the roamer released event flag. Ensure no attempt is made to extract map data. Ensure module-level constants are used for offsets.

## Acceptance Criteria
- [ ] Verify parser extracts species ID and level using DataView.
- [ ] Verify parser checks event flags before marking roamer as active.
- [ ] Verify memory offsets are module-level constants.
- [ ] Verify `RangeError` from out-of-bounds reads is handled gracefully.
- [ ] **QA Mandate:** If experiencing a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [ ] **QA Mandate:** If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [ ] **QA Mandate:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
