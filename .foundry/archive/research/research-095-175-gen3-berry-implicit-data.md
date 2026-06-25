---
id: research-095-175-gen3-berry-implicit-data
type: RESEARCH
title: Investigate Gen 3 Berry Patch Implicit Data and Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - research
  - gen3
  - berries
  - offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Berry Patch Implicit Data and Offsets

## Overview
The previous implementation task `task-095-157-gen3-berry-dataview-parsing` failed permanently due to incorrect offset calculations and attempting to extract missing implicit data such as "Time Planted" and "Last Watered Time". This research node is responsible for finding the correct relative offset calculations and fully investigating the absence of implicit data to prevent future failures.

## Research Objectives
1. **Verify Logical Offsets**: Gen 3 Berry Trees are stored at logical offset `0x169C` in Section 1 of `SaveBlock1`. Investigate and document the correct relative offset calculation (e.g., using the Section 0 payload size of `0x0F80`).
2. **Investigate Implicit Data**: Research and definitively document why implicit data such as "Map ID", "Time Planted", and "Last Watered Time" are not explicitly stored in the Gen 3 save format and cannot be extracted from the `BerryTree` struct.
3. **Draft Updated Spec**: Produce an updated data extraction specification that removes impossible constraints and relies solely on the explicit data available in the 8-byte `BerryTree` structure (e.g., Berry ID, growth stage).

## Deliverables
- [x] A documented explanation of the correct relative offset calculation for Berry Trees in `SaveBlock1` Section 1.
- [x] A technical breakdown of why implicit data is missing and how the engine should handle this limitation.
- [x] An updated extraction specification to be used by the retry implementation task.

## Research Findings

### 1. Correct Relative Offset Calculation
The Gen 3 Game Boy Advance save format divides `SaveBlock1` into multiple 4096-byte (`0x1000`) sectors. The payload size of Section 0 is `3968` bytes (`0x0F80`).
The Berry Trees array starts at logical offset `0x169C` within the unpartitioned `SaveBlock1` structure.

To calculate the offset within Section 1 (where the data resides):
- **Logical Offset:** `0x169C`
- **Subtract Section 0 Payload Size:** `- 0x0F80`
- **Relative Offset within Section 1:** `= 0x071C`

Therefore, the DataView parser must target relative offset `0x071C` within the payload of Section 1 of `SaveBlock1`.

### 2. Technical Breakdown of Missing Implicit Data
Earlier parsing attempts failed by trying to extract data that does not exist in the 8-byte `BerryTree` save struct:
- **Map ID:** The game does not store Map IDs in the berry array. Instead, the 128 `BerryTree` elements are mapped to static game locations implicitly via their array index (e.g., index `10` corresponds to a hardcoded patch on Route 102). The save engine should not attempt to parse a Map ID from the binary data; instead, the frontend/graph layer must map the array indices to predefined map configurations.
- **Time Planted / Last Watered Time:** These absolute timestamps are not recorded. Gen 3 tracks time differences against a global `lastBerryTreeUpdate` timestamp (stored in `SaveBlock2`). The `BerryTree` struct only tracks real-time minutes remaining until the next growth stage (`minutesUntilNextStage`), and 4 boolean flags indicating if the plant was watered at each stage (`watered1` through `watered4`).

### 3. Updated Extraction Specification
The implementation task must use the `DataView` API and strictly adhere to the 8-byte `BerryTree` layout.

*For each of the 128 Berry Trees (8 bytes per tree, starting at Section 1 relative offset `0x071C`):*
- **`berry`**: `getUint8(offset + 0x00)` - The ID of the berry planted (0 = empty).
- **`stage` & `stopGrowth`**: `getUint8(offset + 0x01)`
  - `stage`: `(value & 0x7F)` (bits 0-6)
  - `stopGrowth`: `(value >> 7) & 0x01` (bit 7)
- **`minutesUntilNextStage`**: `getUint16(offset + 0x02, true)` (Little-Endian)
- **`berryYield`**: `getUint8(offset + 0x04)`
- **`regrowthCount` & `watered` flags**: `getUint8(offset + 0x05)`
  - `regrowthCount`: `(value & 0x0F)` (bits 0-3)
  - `watered1`: `(value >> 4) & 0x01` (bit 4)
  - `watered2`: `(value >> 5) & 0x01` (bit 5)
  - `watered3`: `(value >> 6) & 0x01` (bit 6)
  - `watered4`: `(value >> 7) & 0x01` (bit 7)
- Ignore offsets `0x06` and `0x07` (2 bytes of 32-bit alignment padding).
