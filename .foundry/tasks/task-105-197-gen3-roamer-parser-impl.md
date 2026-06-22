---
id: task-105-197-gen3-roamer-parser-impl
type: TASK
title: Implement Gen 3 Roamer Parse Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-06-17'
updated_at: '2026-06-21'
depends_on:
  - research-105-196-gen3-roamer-event-flag
  - task-108-192-gen3-roamer-dataview-extraction-impl
jules_session_id: '11037981089361676713'
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
Update the parser to extract the `speciesId`, `level`, and `mapId`/`mapGroup` of the active roamer using the `DataView` API. Crucially, the parser must only consider a roamer as "active" if the corresponding event flag indicating it has been released is set in the save file. This task depends on the roamer data structure extraction and the location data extraction which are handled in separate tasks, as well as the research to identify the correct event flag offset.

## Acceptance Criteria
- [ ] Parser extracts Latios/Latias map group and ID using DataView.
- [ ] Parser extracts species ID and level using DataView.
- [ ] Parser verifies event flags before marking roamer as active.
- [ ] Gracefully handles `RangeError` from out-of-bounds reads.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
