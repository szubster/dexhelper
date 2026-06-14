# Gen 3 Contest Condition Stats Offsets

This document outlines the memory offsets and data structure used for storing Pokémon Contest Condition statistics (Cool, Beauty, Cute, Smart, Tough) in the Generation III save format (Ruby, Sapphire, Emerald).

## Data Structure Overview

In Generation III games, Pokémon data in the party or PC is managed in a 100-byte structure.

- The first 32 bytes (`0x00` to `0x1F`) store unencrypted details, such as the Personality Value, Original Trainer ID, Nickname, Language, Checksum, etc.
- The next 48 bytes (`0x20` to `0x4F`) make up the **Data** section. This section is encrypted and is subdivided into four 12-byte substructures.
- The remaining 20 bytes (`0x50` to `0x63`) contain status conditions, HP, Level, and battle stats (these 20 bytes are only used when the Pokémon is in the party).

## The Four Substructures

The 48-byte Data section consists of four 12-byte substructures:
1. **Growth**
2. **Attacks**
3. **EVs & Condition**
4. **Miscellaneous**

To obscure the data, the order of these four substructures varies per Pokémon. The exact order is determined by taking the Pokémon's **Personality Value modulo 24** (`PV % 24`).

## Contest Condition Stats Offsets

The Contest Condition stats are stored within the **EVs & Condition** substructure.

Within this specific 12-byte substructure, the Condition stats begin at offset `0x06` (6 bytes in) and take up 5 consecutive bytes, with 1 byte per stat (ranging from 0 to 255):

| Offset within EVs & Condition Substructure | Size | Name | Description |
|---|---|---|---|
| `0x06` | 1 byte | Coolness | The Cool condition stat. |
| `0x07` | 1 byte | Beauty | The Beauty condition stat. |
| `0x08` | 1 byte | Cuteness | The Cute condition stat. |
| `0x09` | 1 byte | Smartness | The Smart condition stat. |
| `0x0A` | 1 byte | Toughness | The Tough condition stat. |
| `0x0B` | 1 byte | Feel | The Feel/Sheen stat (limit for Pokéblock feeding). |

### Parsing Logic Summary

To read a Gen 3 Pokémon's Condition stats:
1. Read the 32-bit **Personality Value** at offset `0x00`.
2. Compute `PV % 24` to find the substructure order (from a lookup table of the 24 possible permutations).
3. Identify the position (index 0 to 3) of the **EVs & Condition** substructure in the Data section (offset `0x20`).
4. Calculate the absolute offset for the substructure: `0x20 + (Index * 12)`.
5. Add the internal offsets for the Conditions (e.g., `+ 0x06` for Cool, `+ 0x07` for Beauty) to extract the values from the decrypted data.
