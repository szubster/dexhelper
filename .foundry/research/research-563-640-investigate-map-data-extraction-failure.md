---
id: research-563-640-investigate-map-data-extraction-failure
type: RESEARCH
title: Investigate Map Data Extraction Failure
status: READY
owner_persona: researcher
created_at: '2023-10-27T00:00:00Z'
updated_at: '2023-10-27T00:00:00Z'
depends_on: []
jules_session_id: null
parent: story-553-563-gen3-map-data-extraction
rejection_count: 0
rejection_reason: ''
locks: []
tags: []
research_references: []
notes: ''
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
The failure of `task-563-582-map-data-extraction-logic` stems from an incorrect assumption about the Gen 3 A/B bank flash memory architecture.

The Gen 3 save system divides the 56KB save bank into 14 distinct 4KB sections. Each section only contains 3968 bytes of actual data payload, with a trailing footer. Furthermore, these 14 sections are not guaranteed to be stored sequentially in physical memory due to wear-leveling.

Current parsing logic (like `parseGen3Roamer`, `extractPlayerLocation`, `extractFeebasSeed`) takes the resolved physical offset of Section 1 (`section1Offset`) and adds a logical offset to it (e.g., `section1Offset + 0x3144`).

Because `0x3144` (12612 bytes) is greater than the section payload size (3968 bytes), this addition will span across multiple section boundaries. Since the sections are physically disorganized, doing linear arithmetic from a single section's base address will result in reading garbage or unrelated data.

### Actionable Next Steps
To resolve this architectural blocker in Gen 3 Map Data Extraction:
1. We must introduce a utility function that translates a given logical offset (e.g., `0x3144` for the Roamer) into its corresponding physical section offset and the exact offset within that section's 3968-byte data payload.
2. The parsing functions must use this logical-to-physical address mapping utility to read data accurately across section boundaries without physically reconstructing a contiguous buffer in memory, aligning with the project's architectural guidelines for direct, low-overhead memory extraction.
