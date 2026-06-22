---
id: task-105-215-gen3-roamer-parser-impl
type: TASK
title: Implement Gen 3 Roamer Parse Logic
status: READY
owner_persona: coder
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - research-105-196-gen3-roamer-event-flag
  - research-105-214-gen3-roamer-parser-impossibility
jules_session_id: null
pr_number: null
parent: story-067-105-gen3-roamer-parser-implementation
tags:
  - gen3
  - roamer
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Parse Logic

## Objective
Implement binary parsing logic in `src/engine/saveParser/parsers/gen3.ts` to extract the Latios/Latias roaming data.

## Description
Update the parser to extract the `speciesId` and `level` of the active roamer using the `DataView` API. As established in `research-105-214-gen3-roamer-parser-impossibility.md` and `adr-108-027-gen3-roamer-location-impossible.md`, extracting map location is impossible and must be omitted. Crucially, the parser must only consider a roamer as "active" if the corresponding event flag indicating it has been released is set in the save file. **All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level.** No inline magic numbers are permitted.

## Acceptance Criteria
- [ ] Parser extracts species ID and level using DataView.
- [ ] Parser verifies event flags before marking roamer as active.
- [ ] Gracefully handles `RangeError` from out-of-bounds reads.
- [ ] All memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
