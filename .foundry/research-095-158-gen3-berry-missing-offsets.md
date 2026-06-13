---
id: research-095-158-gen3-berry-missing-offsets
type: RESEARCH
title: >-
  Investigate Missing Gen 3 Berry Patch Offsets (Map ID, Time Planted, Last
  Watered)
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-11'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - research
  - gen3
  - berries
research_references: []
rejection_count: 1
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
Based on our research into the `pret/pokeemerald` decompilation:

1. **Map ID**: Map IDs are not stored explicitly per Berry Tree. Instead, the `berryTrees` array contains 128 elements. These elements are implicitly mapped to specific locations via constants in `constants/berry.h` (e.g., `BERRY_TREE_ROUTE_102_PECHA 1`). These IDs are assigned directly to the `trainerRange_berryTreeId` field of `ObjectEvent` inside map layout definitions (`map.json`). Map locations must be resolved by hardcoding these indices.

2. **Time Planted**: The time a berry was planted is NOT explicitly stored in the save file. The `BerryTree` struct only contains `minutesUntilNextStage` and `stage`. The game calculates remaining time by comparing the global timestamp `lastBerryTreeUpdate` (located in SaveBlock2) to the current time, rather than storing individual planted times.

3. **Last Watered Time**: This is also NOT stored explicitly. The `BerryTree` struct keeps boolean bitflags (`watered1`, `watered2`, `watered3`, `watered4`) to record whether the patch was watered during each of its four growth stages. The exact timestamps of watering events are not recorded.

The knowledge base (`gen3_berry_patch_offsets.md`) has been updated to reflect these missing explicit data structures.
