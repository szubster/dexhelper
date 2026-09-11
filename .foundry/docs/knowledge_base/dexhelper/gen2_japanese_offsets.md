
# Gen 2 Japanese Offsets

## Context
Japanese Generation II games (Gold, Silver, and Crystal) have completely different memory layouts compared to the Western (English) releases. This is primarily due to differences in character encoding lengths (Japanese names are shorter) and the inclusion of the Mobile System GB in Japanese Crystal, which shifted data blocks significantly.

## Known Shifts & Memory Addresses

### Party Data
The most critical structural identifier used by DexHelper's save parser is the `PARTY_COUNT` offset.

| Data | Western GS | Western Crystal | Japanese GS | Japanese Crystal |
| --- | --- | --- | --- | --- |
| Party Count | `0x288A` | `0x2865` | `0x283E` | `0x281A` |
| Party Species List | `0x288B` | `0x2866` | `0x283F` | `0x281B` |

### Pokédex
| Data | Western GS | Western Crystal | Japanese GS | Japanese Crystal |
| --- | --- | --- | --- | --- |
| Owned | `0x2A4C` | `0x2A27` | `0x29CE` | `0x29AA` |
| Seen | `0x2A6C` | `0x2A47` | `0x29EE` | `0x29CA` |

### Current PC Box
| Data | Western GS | Western Crystal | Japanese GS | Japanese Crystal |
| --- | --- | --- | --- | --- |
| Box Number | `0x2724` | `0x2700` | `0x2705` | `0x26E2` |
| Box Names | `0x2727` | `0x2703` | `0x2708` | `0x26E5` |

*(Note: PC Box data structures remain mostly identical, except the Current Box Pokémon List which is located at `0x2D10` for Japanese GS, Japanese Crystal, and Western Crystal, but `0x2D6C` for Western GS).*

## Detection Fallbacks

DexHelper's `isGen2Save` and `parseGen2` functions rely on heuristic probing of the `PARTY_COUNT` offset to determine the game version.
To support Japanese Gen 2 saves, the detection logic must be expanded to probe four distinct offsets:
1. Western GS (`0x288A`)
2. Western Crystal (`0x2865`)
3. Japanese GS (`0x283E`)
4. Japanese Crystal (`0x281A`)

A save file is identified as a specific version if:
1. The party count is between 1 and 6.
2. The terminating byte immediately following the active species list (at `PARTY_COUNT` offset + `count` + 1) is `0xFF`.
3. All Pokémon IDs in the active species list are valid (1-251, or 253 for Eggs).
