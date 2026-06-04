---
id: research-036-006-feebas-seed-investigation
type: RESEARCH
title: Investigate Feebas Seed Offset and Algorithm in R/S/E
status: ACTIVE
owner_persona: researcher
created_at: '2026-05-30'
updated_at: '2026-06-01'
depends_on: []
jules_session_id: '1866607533550358339'
parent: prd-066-036-feebas-tile-predictor
tags:
  - gen3
  - feebas
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Feebas Seed Offset and Algorithm in R/S/E

## Objective
Investigate the exact memory offset for the Feebas seed (Dewford Town trendy phrase) in Generation 3 (Ruby, Sapphire, Emerald) save files and document the algorithm used to derive the 6 Feebas tile coordinates from that seed.

## Requirements
- [x] Determine the save file offset for the Feebas seed (or Dewford trendy phrase variables) in Ruby, Sapphire, and Emerald.
- [x] Document the mathematical algorithm/PRNG used by the games to generate the 6 specific tile coordinates on Route 119 based on the seed.
- [x] Ensure the findings are documented clearly in the markdown body of this research node, so downstream tasks can use it for implementation.

## Findings

### Save File Offsets

The Feebas seed is derived from the "Dewford Trendy Phrase" data stored in `SaveBlock1` (Section 0) of the Gen 3 save file. The seed itself is a 16-bit random value (`rand` or `unk2`) assigned to the active phrase.

*   **Ruby & Sapphire (R/S)**:
    *   The Dewford Trends are stored in an array of 5 `struct EasyChatPair` elements starting at offset `0x2DD4` in `SaveBlock1`.
    *   Each `EasyChatPair` struct is 8 bytes. The RNG seed (`unk2`) is located at byte offset 2 within the struct.
    *   Therefore, the active Feebas seed is located at **`0x2DD6`** in `SaveBlock1` (or absolute offset `0x2DD6` within the Section 0 data payload).
*   **Emerald (E)**:
    *   The Dewford Trends are stored in an array of 5 `struct DewfordTrend` elements starting at offset `0x2E64` in `SaveBlock1`.
    *   Each `DewfordTrend` struct is 8 bytes. The RNG seed (`rand`) is located at byte offset 2 within the struct.
    *   Therefore, the active Feebas seed is located at **`0x2E66`** in `SaveBlock1` (or absolute offset `0x2E66` within the Section 0 data payload).
*   **FireRed & LeafGreen (FR/LG)**:
    *   Feebas cannot be encountered natively; these games do not use this algorithm.

### Algorithm & RNG Implementation

The generation of the 6 Feebas tiles relies on a custom Linear Congruential Generator (LCG) seeded by the aforementioned trend value.

1.  **Seed Initialization**: The RNG is seeded using the value at the active trend offset: `sFeebasRngValue = seed`.
2.  **LCG Function**: The game uses a custom RNG function `FeebasRandom()` which updates the internal state:
    *   `sFeebasRngValue = (1103515245 * sFeebasRngValue + 12345)`
    *   It returns `sFeebasRngValue >> 16` (the upper 16 bits).
3.  **Spot Generation Loop**: The game generates exactly 6 fishing spots.
    *   A random spot ID is determined by `FeebasRandom() % 447` (where 447 is the total number of valid fishing spots on Route 119).
    *   If the result is `0`, it is forcefully set to `447`.
    *   Spots `1`, `2`, and `3` are inaccessible in the game geometry, so if a generated spot ID is `< 4`, the algorithm discards it and iterates again without incrementing the counter for the 6 required spots.
4.  **Coordinate Mapping**: The spot IDs (1 to 447) map sequentially to the physical tiles on Route 119 by iterating over the map grid row-by-row (`y`, then `x`), left-to-right, top-to-bottom. Any tile that has the behavior "Surfable and not waterfall" is assigned the next sequential Spot ID.
