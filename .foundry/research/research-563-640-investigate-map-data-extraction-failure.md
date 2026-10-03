---
id: research-563-640-investigate-map-data-extraction-failure
type: RESEARCH
title: Investigate Map Data Extraction Failure
status: CANCELLED
owner_persona: researcher
created_at: '2023-10-27T00:00:00Z'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: null
parent: story-553-563-gen3-map-data-extraction
tags: []
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
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
Upon investigating the failure of `task-563-582-map-data-extraction-logic`, the following issues were identified:

1. **Missing Integration in `parseGen3`**: The core extraction function `extractPlayerLocation` was successfully implemented in `src/engine/gen3/playerLocation/parser.ts`. However, it was never imported or utilized inside the main `parseGen3` function (`src/engine/saveParser/parsers/gen3.ts`), which is responsible for resolving the A/B bank architecture and calculating `section1Offset`. Because it wasn't integrated, the data was never actually extracted during runtime.
2. **Missing `gen3PlayerLocation` in `Gen3SaveData` schema**: The `Gen3SaveData` type (in `src/engine/saveParser/parsers/common.ts`) does not include a `gen3PlayerLocation` field. Therefore, even if the parser extracted the data, TypeScript would throw compilation errors when attempting to attach it to the parsed save object.
3. **Other map data is already implemented**: Other requested map data fields (such as `gen3BerryPatches`, `gen3ActiveSwarm`, `gen3FeebasSeed`, and `roamingLegendaries`) are already successfully implemented, properly utilize the `section1Offset` for A/B bank support, and are integrated into both the `Gen3SaveData` interface and the `parseGen3` function.
4. **Resolution Path**: The retry task (`task-563-641-map-data-extraction-logic-v2`) must focus specifically on integrating `extractPlayerLocation` into `parseGen3`, utilizing the `section1Offset` to satisfy the A/B bank architectural requirement, and updating the `Gen3SaveData` schema to include the `gen3PlayerLocation?: import('../../gen3/playerLocation/parser').PlayerLocation;` property.
