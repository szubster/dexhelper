# Gen 3 Pokémon Data Structure

## Overview
In Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen), a Pokémon's full data structure in the party is 100 bytes long, whereas in the PC it is truncated to 80 bytes. However, the core details are stored in a 48-byte encrypted Data block (bytes 32 through 79).

## Personality Value (PID) Structure
The **Personality Value** (often referred to as PID or PV) is located at offset `0x00` of the Pokémon data structure (both in the Party 100-byte structure and the PC 80-byte structure). It is a 32-bit (4-byte) integer that controls:
- Gender
- Ability
- Nature
- Shininess (when combined with OT ID)
- Spinda's spots
- Unown's letter
- The decryption key for the 48-byte Data block
- The permutation order of the 48-byte Data block's substructures (`PV % 24`)

## The 48-Byte Encrypted Data Block
This block is divided into four 12-byte substructures:
- **Growth (G):** Species, Item held, Experience, PP bonuses, Friendship.
- **Attacks (A):** Move 1, Move 2, Move 3, Move 4, PP 1, PP 2, PP 3, PP 4.
- **EVs & Condition (E):** HP EV, Attack EV, Defense EV, Speed EV, Special Attack EV, Special Defense EV, Coolness, Beauty, Cuteness, Smartness, Toughness, Feel.
- **Miscellaneous (M):** Pokerus status, Met location, Origins info, IVs/Egg/Ability, Ribbons/Obedience.

### Decryption
The data is encrypted using a simple XOR cipher. The 32-bit decryption key is obtained by XORing the Pokémon's Personality Value (PV) with the Original Trainer ID (OT ID). The data is decrypted by XORing it with this key, 32 bits (4 bytes) at a time.

### Substructure Order
The order of the four 12-byte substructures within the 48-byte block is not static. It is determined by the Personality Value (PV) modulo 24 (`PV % 24`). This produces one of 24 possible permutations (e.g., GAEM, AGEM, MGAE, etc.).

## Pokerus
The Pokerus status is stored in the **first byte** (offset 0) of the **Miscellaneous (M)** substructure.

Its bitwise structure is **identical to Generation 2**:
- **Bits 0-3 (Lower 4 bits):** Days left until Pokérus is cured.
- **Bits 4-7 (Upper 4 bits):** Pokérus "strain".

Just like in Gen 2, if the strain is non-zero (i.e., the Pokémon was infected) but the days remaining is 0, the Pokémon is considered "cured" (immune).

### Implementation Strategy
To extract the Pokerus data in Gen 3, the engine must:
1. Parse the 100-byte structure to obtain the PV and OT ID.
2. Determine the permutation order using `PV % 24`.
3. Locate the Miscellaneous (M) substructure within the 48-byte Data block.
4. Decrypt the Data block (or specifically the M substructure).
5. Read the first byte of the M substructure and apply the bitwise operations (`byte >> 4` for strain, `byte & 0x0f` for days).

## Contest Ribbons and Obedience
The Contest Ribbons and Obedience bitfield is a 4-byte (32-bit) structure located in the **Miscellaneous (M)** substructure at **offset 8** (bytes 8-11 of the 12-byte M substructure).

Since the M substructure itself is part of the 48-byte encrypted Data block, the exact physical offset within the 100-byte Pokémon data structure depends on the `PV % 24` substructure permutation.

### Ribbon Bitmask Definition
The 32 bits represent specific ribbons or obedience flags. A value of `1` means the ribbon is present. For Contest Ribbons (Cool, Beauty, Cute, Smart, Tough), they are grouped into 3-bit fields because there are 4 ranks (Normal, Super, Hyper, Master), represented by values 1 to 4 respectively.

| Bits  | Description |
|---|---|
| 0-2   | Cool Contest Ribbon Rank (0=None, 1=Normal, 2=Super, 3=Hyper, 4=Master) |
| 3-5   | Beauty Contest Ribbon Rank |
| 6-8   | Cute Contest Ribbon Rank |
| 9-11  | Smart Contest Ribbon Rank |
| 12-14 | Tough Contest Ribbon Rank |
| 15    | Champion Ribbon |
| 16    | Winning Ribbon |
| 17    | Victory Ribbon |
| 18    | Artist Ribbon |
| 19    | Effort Ribbon |
| 20    | Battle Champion Ribbon |
| 21    | Regional Champion Ribbon |
| 22    | National Champion Ribbon |
| 23    | Country Ribbon |
| 24    | National Ribbon |
| 25    | Earth Ribbon |
| 26    | World Ribbon |
| 27-30 | Unused/Reserved |
| 31    | Obedience flag (Used for Mew/Deoxys to prevent disobedience; fateful encounter flag when transferred) |

### Implementation Strategy for Ribbons
To extract a specific Contest Ribbon rank:
1. Locate and decrypt the **Miscellaneous (M)** substructure.
2. Read the 32-bit integer (little-endian) starting at offset 8 of the M substructure.
3. Apply a bitwise right-shift `>>` to move the target field to the least significant bits.
4. Apply a bitwise AND `& 0x07` (binary `111`) to isolate the 3-bit rank value.

Example for Smart Contest Ribbon (Bits 9-11):
`smartRank = (ribbonsBitfield >> 9) & 0x07;`
