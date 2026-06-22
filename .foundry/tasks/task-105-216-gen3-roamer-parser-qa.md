---
id: task-105-216-gen3-roamer-parser-qa
type: TASK
title: QA Gen 3 Roamer Parse Logic
status: PENDING
owner_persona: qa
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - task-105-215-gen3-roamer-parser-impl
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

# QA Gen 3 Roamer Parse Logic

## Objective
Verify the Gen 3 roamer parsing implementation.

## Description
Ensure that the parser correctly extracts `speciesId` and `level` of the active roamer using the `DataView` API and that it correctly verifies the roamer released event flag. Ensure that it omits `mapId` and `mapGroup` as they cannot be parsed. Check that all constants are extracted to the module level.

## Acceptance Criteria
- [ ] Verify parser extracts species ID and level using DataView.
- [ ] Verify parser checks event flags before marking roamer as active.
- [ ] Verify `RangeError` from out-of-bounds reads is handled gracefully.
- [ ] Verify no inline magic numbers are used for parsing; constants should be extracted to the module level.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
