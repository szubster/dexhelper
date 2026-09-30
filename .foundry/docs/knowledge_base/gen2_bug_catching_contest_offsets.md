# Gen 2 Bug-Catching Contest Memory Offsets

The currently caught Bug-Catching Contest Pokémon is stored in SRAM during the contest. It is part of the `sPokemonData` block (which maps directly to `wPokemonData` from WRAM), and exists as a standard 48-byte (0x30) `party_struct`.

## SRAM Save File Offsets

The `wContestMon` structure is exactly `0x2C5` bytes after the beginning of `wPokemonData` (and identically in SRAM as `sContestMon` offset from `sPokemonData`).

### Pokémon Crystal
- **Primary Save Block (`sPokemonData` starts at `0x2865` in save file):**
  - **Species ID:** `0x2B2A` (`0x2865` + `0x02C5` + `0x00`)
  - **Level:** `0x2B49` (`0x2B2A` + `0x1F`)
  - **Current HP:** `0x2B4C` (`0x2B2A` + `0x22`) (2 bytes, Big-Endian)
  - **Max HP:** `0x2B4E` (`0x2B2A` + `0x24`) (2 bytes, Big-Endian)

- **Backup Save Block (`sBackupPokemonData` starts at `0x1A65` in save file):**
  - **Species ID:** `0x1D2A` (`0x1A65` + `0x02C5` + `0x00`)
  - **Level:** `0x1D49`
  - **Current HP:** `0x1D4C`
  - **Max HP:** `0x1D4E`

### Pokémon Gold & Silver
- **Primary Save Block (`sPokemonData` starts at `0x288A` in save file):**
  - **Species ID:** `0x2B4F` (`0x288A` + `0x02C5` + `0x00`)
  - **Level:** `0x2B6E` (`0x2B4F` + `0x1F`)
  - **Current HP:** `0x2B71` (`0x2B4F` + `0x22`) (2 bytes, Big-Endian)
  - **Max HP:** `0x2B73` (`0x2B4F` + `0x24`) (2 bytes, Big-Endian)

- **Backup Save Block (`sBackupPokemonData` starts at `0x10E8` in save file):**
  - **Species ID:** `0x13AD` (`0x10E8` + `0x02C5` + `0x00`)
  - **Level:** `0x13CC`
  - **Current HP:** `0x13CF`
  - **Max HP:** `0x13D1`

## Analysis
The `party_struct` in Generation 2 games has a size of 48 bytes (0x30). The internal offsets from the start of the `party_struct` are consistent across Gold, Silver, and Crystal:
*   `+0x00`: Species
*   `+0x1F`: Level
*   `+0x22`: Current HP (2 bytes, big-endian)
*   `+0x24`: Max HP (2 bytes, big-endian)

The difference in absolute memory locations in the save file is due to both WRAM shifts and SRAM layout shifts between the Gold/Silver engines and the Crystal engine.
