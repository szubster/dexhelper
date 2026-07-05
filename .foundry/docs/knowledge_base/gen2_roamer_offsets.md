# Gen 2 Roamer Offsets

## Memory Layout
In Generation 2 (Pokémon Gold, Silver, Crystal), roaming Pokémon (Raikou, Entei, Suicune) are tracked using a 7-byte `roam_struct`.

The structure is defined as follows:
- **Species** (1 byte) - offset `+0`
- **Level** (1 byte) - offset `+1`
- **MapGroup** (1 byte) - offset `+2`
- **MapNumber** (1 byte) - offset `+3`
- **HP** (1 byte) - offset `+4`
- **DVs** (2 bytes) - offset `+5`

## SRAM Offsets
The roamer data is saved as part of the `sPokemonData` block (which corresponds to `wPokemonData` in WRAM).
- `wPokemonData` begins at `0xDCD7` in WRAM.
- `wRoamMon1` begins at `0xDFCF` in WRAM.
- The offset of the roamer data from the start of the `sPokemonData` block is **`0x02F8` (760 bytes)**.

Within the `sPokemonData` block in the save file, the roamers are located at:
- **Raikou (RoamMon1):** `+0x02F8` (760 bytes from start of `sPokemonData`)
- **Entei (RoamMon2):** `+0x02FF` (767 bytes from start of `sPokemonData`)
- **Suicune (RoamMon3):** `+0x0306` (774 bytes from start of `sPokemonData`)

Additionally, there are tracking variables for the player's last and current map, located shortly after the roamers:
- **wRoamMons_CurMapNumber:** `+0x030B` (779 bytes)
- **wRoamMons_CurMapGroup:** `+0x030C` (780 bytes)
- **wRoamMons_LastMapNumber:** `+0x030D` (781 bytes)
- **wRoamMons_LastMapGroup:** `+0x030E` (782 bytes)

## Active Status Determination
A roamer's active status is primarily determined by its **MapGroup** property.
- If a roamer's **MapGroup** is set to `0xFF` (`-1` / `GROUP_N_A`), the roamer is inactive and the game skips updating its location or triggering encounters.
- When initializing a new game, the game explicitly sets the `MapGroup` of all three roamers to `0xFF` (and their `Species` to `0`).
- Therefore, to determine if a roamer is currently roaming the map, check if its **MapGroup** `!= 0xFF`.
- A roamer is effectively defeated/caught if its **HP** is `0` (or `Species` `== 0`).
