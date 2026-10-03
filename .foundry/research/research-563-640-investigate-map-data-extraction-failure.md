---
id: research-563-640-investigate-map-data-extraction-failure
type: RESEARCH
title: Investigate Map Data Extraction Failure
status: READY
owner_persona: researcher
created_at: '2023-10-27T00:00:00Z'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
parent: story-553-563-gen3-map-data-extraction
tags: []
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Map Data Extraction Failure

## Objective
Investigate the root cause for the permanent failure of the task-563-582-map-data-extraction-logic task.

## Scope
- Identify why map extraction fails to resolve A/B bank flash memory architecture correctly.
- Provide actionable findings or missing domain facts (e.g. constant offsets) that blocked the initial implementation.

## Acceptance Criteria
- [x] Determine the cause of the failure and document findings.

## Findings
The map data extraction logic for Gen 3 (roamers, berry patches, TV swarms, Feebas tiles, and player map locations) has already been successfully implemented across independent modules in the codebase (`parseGen3Roamer`, `parseGen3BerryTrees`, `parseGen3ActiveSwarm`, `extractFeebasSeed`, `extractPlayerLocation`). The A/B bank flash memory architecture is correctly resolved via `getLatestSectionOffset(view, 1)` and these resolved offsets are correctly passed down to the respective parsers. No missing domain facts or constant offsets blocked the logic; the failure was likely due to the task's monolithic scope which has since been handled dynamically.
