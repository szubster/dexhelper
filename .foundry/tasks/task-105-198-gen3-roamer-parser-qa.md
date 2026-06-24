---
id: task-105-198-gen3-roamer-parser-qa
type: TASK
title: QA Gen 3 Roamer Parse Logic
status: PENDING
owner_persona: qa
created_at: '2026-06-17'
updated_at: '2026-06-17'
depends_on: []jules_session_id: null
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
Ensure that the parser correctly extracts `speciesId`, `level`, and `mapId`/`mapGroup` of the active roamer using the `DataView` API and that it correctly verifies the roamer released event flag.

## Acceptance Criteria
- [ ] Verify parser extracts Latios/Latias map group and ID using DataView.
- [ ] Verify parser extracts species ID and level using DataView.
- [ ] Verify parser checks event flags before marking roamer as active.
- [ ] Verify `RangeError` from out-of-bounds reads is handled gracefully.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### Auditor Rejection
CANCELLED: The implementation task failed permanently because extraction of Gen 3 roamer mapId and mapGroup is impossible (per adr-108-027-gen3-roamer-location-impossible). Replaced by new tasks focusing on IVs and active flag.
