---
id: research-280-324-feebas-offset-investigation
type: RESEARCH
title: Investigate Gen 3 Relative Offsets for Feebas Seed
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-14'
updated_at: '2026-07-15'
depends_on: []
jules_session_id: '7475886777421348190'
pr_number: null
parent: story-058-280-feebas-backend-integration
tags:
  - gen3
  - backend
  - save-parsing
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Relative Offsets for Feebas Seed

## Objective
Investigate how to correctly calculate relative memory offsets using `section1Offset` for the Feebas seed extraction in Gen 3 save files, due to the A/B bank flash memory system.

## Context
The previous implementation failed permanently because it used hardcoded absolute offsets instead of making them relative to the dynamically resolved `section1Offset`. The save blocks in Gen 3 can be either in Bank A or Bank B, meaning absolute offsets will cause the parser to read incorrect data when Bank B is active.

## Expected Outcome
- Document the correct relative offsets for both Ruby/Sapphire and Emerald.
- Ensure the extraction functions explicitly receive `section1Offset` (or similar required base offsets) from the parser engine and use it for calculations.

## Findings & Implementation Details
During investigation, it was discovered that the Feebas seed data (Dewford Trend in Emerald and EasyChatPair in Ruby/Sapphire) is located in **Section ID 2** of `SaveBlock1`, not Section 1.

`SaveBlock1` spans four sections (IDs 0, 1, 2, and 3), each 3968 bytes (`0x0F80`) long.
- Section 0: `0x0000 - 0x0F7F`
- Section 1: `0x0F80 - 0x1EFF`
- Section 2: `0x1F00 - 0x2E7F`
- Section 3: `0x2E80 - 0x3DFF`

The absolute offset for Ruby/Sapphire is `0x2DD6` and for Emerald is `0x2E66`. Because both offsets fall between `0x1F00` and `0x2E7F`, the data resides in Section ID 2.

The save parser currently passes `section2Offset` to `extractFeebasSeed`. The correct relative offsets must be calculated by subtracting the base offset of Section 2 (`0x1F00`) from the absolute offsets:
- **Ruby/Sapphire:** `0x2DD6 - 0x1F00 = 0x0ED6` (Constant: `FEEBAS_SEED_OFFSET_RS`)
- **Emerald:** `0x2E66 - 0x1F00 = 0x0F66` (Constant: `FEEBAS_SEED_OFFSET_EMERALD`)

The previous implementation incorrectly calculated the relative offsets by assuming Section 2 started at `0x2000` instead of `0x1F00`, resulting in `0x0DD6` and `0x0E66` respectively.
