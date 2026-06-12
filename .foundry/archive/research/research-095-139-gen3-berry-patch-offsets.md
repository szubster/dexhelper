---
id: research-095-139-gen3-berry-patch-offsets
type: RESEARCH
title: Investigate Gen 3 Berry Patch Memory Offsets and Structures
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-095-157-gen3-berry-dataview-parsing
tags:
  - gen3
  - berries
  - engine
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Berry Patch Memory Offsets and Structures

## Context
Task `task-095-157-gen3-berry-dataview-parsing` attempts to implement the parsing logic for Gen 3 berry patches using the native `DataView` API. However, the task failed because the exact memory block offsets, block structures, and data offsets within the blocks for Gen 3 berry patches are not currently known or documented in the knowledge base or PRD (`prd-067-037-gen3-berry-tracker`). We lack the knowledge of exactly where to look for this data in `SaveBlock1` or `SaveBlock2` or elsewhere in the save file.

## Objectives
- [x] Identify the correct Game Boy Advance / Gen 3 memory offsets or save block structure where berry patch data is stored.
- [x] Determine the structure of a single berry patch entry (e.g., how map ID, berry ID, growth stage, time planted, and last watered time are laid out in bytes).
- [x] Investigate how this data aligns with real-time clock (RTC) mechanics.
- [x] Produce a clear mapping that the `coder` persona can use to implement the `DataView` parsing logic.

## Findings
The exact mappings and research findings have been documented in `.foundry/docs/knowledge_base/gen3_berry_patch_offsets.md`.

## Recommended Investigation Paths
- Review decompilation projects like `pret/pokeemerald`, specifically looking for structs related to `BerryTree` or `EnigmaBerry`.
- Consult external documentation or existing save editing tools to identify the offsets of berry patch arrays in the Gen 3 save format.
