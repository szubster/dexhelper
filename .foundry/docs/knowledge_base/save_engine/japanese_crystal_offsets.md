# Japanese Crystal Offsets

## Overview
Based on analysis and Bulbapedia documentation, the Japanese version of Pokémon Crystal has different memory offsets and structures compared to the Western (English) release.

## Structural Differences
1. **String Lengths**:
   - Player/Rival/Nicknames are allocated 6 bytes in Japanese (5 characters + 1 terminator).
   - In Western games, they are allocated 11 bytes (10 characters + 1 terminator).
2. **PC Boxes**:
   - Western: 14 boxes of 20 Pokémon.
   - Japanese: 9 boxes of 30 Pokémon.
3. **Party Data Size**:
   - Western Party list size: `6 * (48 + 23) + 2 = 428` bytes.
   - Japanese Party list size: `6 * (48 + 13) + 2 = 368` bytes.

## Known Offsets
- **Japanese Crystal Party Count**: `0x281A` (compared to Western `0x2865`, a shift of `-0x4B` bytes).
- **Japanese Crystal Checksum Range**: `0x2009` to `0x2AE2` (stored at `0x2D0D`), compared to Western `0x2009` to `0x2B82`.

## Recommendations for Engine Integration
Implementing Japanese Crystal support would require substantial refactoring of the parser (e.g., dynamically adjusting string reading lengths, PC box dimensions, checksum validation ranges, and almost all block offsets).

For the current testing context (`crystal-bxtj-0.sav` failing), replacing the fixture with a valid Western Crystal save is the recommended short-term fix to unblock testing, as the parsing engine currently explicitly only targets Western Gen 1 & 2 games. Full Japanese support should be triaged as a separate Epic.
