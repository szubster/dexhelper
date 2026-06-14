# Gen 3 Pokémon Data Structure

## Overview
In Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen), a Pokémon's full data structure in the party is 100 bytes long. However, the core details are stored in a 48-byte encrypted Data block (bytes 32 through 79 of the 100-byte structure).

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
