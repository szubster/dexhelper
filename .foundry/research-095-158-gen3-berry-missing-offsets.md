---
id: research-095-158-gen3-berry-missing-offsets
type: RESEARCH
title: >-
  Investigate Missing Gen 3 Berry Patch Offsets (Map ID, Time Planted, Last
  Watered)
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-11'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '1929460678560929935'
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - research
  - gen3
  - berries
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Missing Gen 3 Berry Patch Offsets

## Context
During the implementation of `task-095-157-gen3-berry-dataview-parsing`, the PRD required the extraction of `map ID`, `time planted`, and `last watered time` for berry patches.
However, the knowledge base (`gen3_berry_patch_offsets.md`) only documents `berry ID`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and `watered` stages. The exact memory offsets and block structures for the requested fields are missing.

## Requirements
- [x] Investigate where `map ID`, `time planted`, and `last watered time` are stored in the Gen 3 save format.
- [x] Document the exact byte offsets, types, and bitwise logic necessary to extract these fields.
- [x] Determine if `map ID` is implicit (based on the array index) or stored explicitly.
- [x] Determine if `time planted` and `last watered time` can be derived from existing fields or are stored separately.

## Findings

Based on an analysis of the `pret/pokeemerald` decompilation (specifically `src/berry.c` and `include/global.berry.h`):

1. **Map ID is Implicit**: The `Map ID` is not stored in the `BerryTree` save structure. Instead, the game stores exactly 128 berry patches in a flat array (`gSaveBlock1Ptr->berryTrees`). The indices of this array statically map to predefined tree IDs (e.g., `#define BERRY_TREE_ROUTE_102_PECHA 1`), which correspond to specific maps and locations. Thus, to determine the location of a berry patch, the parser must rely on the array index and a static lookup table.

2. **Time Planted is Not Stored**: The game does not store an absolute timestamp for when a berry was planted. Instead, it initializes a countdown timer (`minutesUntilNextStage`) using `GetStageDurationByBerryType(berry)` when the berry is planted. This timer is decremented as real-world minutes pass.

3. **Last Watered Time is Not Stored**: The game does not track the timestamp of when a berry was last watered. It only tracks whether the patch was watered during each of its four growth stages using a set of bit flags (`watered1:1`, `watered2:1`, `watered3:1`, `watered4:1`).
