# Gen 2 Pokegear Phone Memory Offsets

This document outlines the memory offsets related to the Pokegear phone system for both Pokemon Gold/Silver and Pokemon Crystal. These offsets are mapped to the save file structure (SRAM) for both sets of games.

## Gold/Silver Offsets

The following offsets are found in bank `01` of SRAM (which maps directly to bank `01` of WRAM in emulator memory, minus `0xA000` to adjust for save file offsets within SRAM bank 1 if looking at a raw `.sav` file, since SRAM bank 1 begins at `0x2000`). In the disassembly they are mapped to SRAM/WRAM bank 1.

| Variable Name                 | Description                                                | WRAM Offset | Length |
|-------------------------------|------------------------------------------------------------|-------------|--------|
| `wPhoneListIndex`             | The current index or number of active contacts             | `0xCF2A`    | 1 byte |
| `wSpecialPhoneCallID`         | The ID of the current special/forced phone call            | `0xD97B`    | 1 byte |
| `wPhoneList`                  | The array containing the registered contact IDs            | `0xD9C6`    | `CONTACT_LIST_SIZE + 1` |

*Note: In Gold/Silver, `wSwarmFlags`, `wDailyPhoneItemFlags`, and `wDailyPhoneTimeOfDayFlags` do not appear to exist as distinct tracked arrays like they do in Crystal.*

## Crystal Offsets

Crystal heavily updated the mobile system and daily phone tracking flags. The following offsets are found in bank `01` of WRAM/SRAM:

| Variable Name                 | Description                                                | WRAM Offset | Length |
|-------------------------------|------------------------------------------------------------|-------------|--------|
| `wPhoneListIndex`             | The current index or number of active contacts             | `0xD03F`    | 1 byte |
| `wSwarmFlags`                 | Bitflags for active swarms (Dunsparce, Yanma, etc.)        | `0xDC20`    | 1 byte |
| `wSpecialPhoneCallID`         | The ID of the current special/forced phone call            | `0xDC31`    | 1 byte |
| `wDailyPhoneItemFlags`        | Array of bitflags tracking which NPC gave an item today    | `0xDC50`    | 4 bytes|
| `wDailyPhoneTimeOfDayFlags`   | Array of bitflags tracking which NPC called at what time   | `0xDC54`    | 4 bytes|
| `wPhoneList`                  | The array containing the registered contact IDs            | `0xDC7C`    | `CONTACT_LIST_SIZE + 1` |

These offsets provide the baseline needed to read the user's registered phone contacts, their daily item-giving states, and whether a swarm is currently active, which is important for identifying swarm mechanics for Dunsparce, Marill, and Snubbull in Crystal.
