# Gen 3 Mystery Gift Event Flags and Offsets

This document outlines the memory offsets and bit indices for the Mystery Gift event flags (such as the Aurora Ticket, MysticTicket, Old Sea Map, and Eon Ticket) in Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Data Structure and Location

In Generation 3, event flags are stored as a large bitfield in the `flags` array within `SaveBlock1`.
The offset of the `flags` array within `SaveBlock1` varies by game:
- **Emerald**: `0x1270`
- **Ruby/Sapphire**: `0x1220`
- **FireRed/LeafGreen**: `0x0EE0`

Each flag is a single bit. To access a specific flag with logical ID `F`, you determine its byte offset within the `flags` array via `F / 8` and its bit offset within that byte via `F % 8`.

## Emerald / Ruby / Sapphire Flags

For RSE, the Mystery Gift item flags and the system flags that enable the respective ships to travel to the event islands are as follows. Note that the Old Sea Map is exclusive to Emerald.

### Item Received Flags
- **Aurora Ticket** (`FLAG_RECEIVED_AURORA_TICKET`): Logical ID `0x13A` (314).
  - Byte offset: `39` (`0x27`)
  - Bit index: `2`
- **MysticTicket** (`FLAG_RECEIVED_MYSTIC_TICKET`): Logical ID `0x13B` (315).
  - Byte offset: `39` (`0x27`)
  - Bit index: `3`
- **Old Sea Map** (`FLAG_RECEIVED_OLD_SEA_MAP`): Logical ID `0x13C` (316).
  - Byte offset: `39` (`0x27`)
  - Bit index: `4`

### System Enable Ship Flags
These flags are located in the `SYSTEM_FLAGS` block, which starts at `0x860` in RSE.
- **Southern Island (Eon Ticket)** (`FLAG_ENABLE_SHIP_SOUTHERN_ISLAND`): Logical ID `0x8B3` (2227).
  - Byte offset: `278` (`0x116`)
  - Bit index: `3`
- **Birth Island (Aurora Ticket)** (`FLAG_ENABLE_SHIP_BIRTH_ISLAND`): Logical ID `0x8D5` (2261).
  - Byte offset: `282` (`0x11A`)
  - Bit index: `5`
- **Navel Rock (MysticTicket)** (`FLAG_ENABLE_SHIP_NAVEL_ROCK`): Logical ID `0x8E0` (2272).
  - Byte offset: `284` (`0x11C`)
  - Bit index: `0`
- **Faraway Island (Old Sea Map)** (`FLAG_ENABLE_SHIP_FARAWAY_ISLAND`): Logical ID `0x8D6` (2262).
  - Byte offset: `282` (`0x11A`)
  - Bit index: `6`

## FireRed / LeafGreen Flags

For FRLG, the logical IDs for the item flags and system flags differ from RSE.

### Item Received Flags
- **Aurora Ticket** (`FLAG_RECEIVED_AURORA_TICKET`): Logical ID `0x2A7` (679).
  - Byte offset: `84` (`0x54`)
  - Bit index: `7`
- **MysticTicket** (`FLAG_RECEIVED_MYSTIC_TICKET`): Logical ID `0x2A8` (680).
  - Byte offset: `85` (`0x55`)
  - Bit index: `0`

### System Enable Ship Flags
These flags are located in the `SYS_FLAGS` block, which starts at `0x800` in FRLG.
- **Navel Rock (MysticTicket)** (`FLAG_ENABLE_SHIP_NAVEL_ROCK`): Logical ID `0x84A` (2122).
  - Byte offset: `265` (`0x109`)
  - Bit index: `2`
- **Birth Island (Aurora Ticket)** (`FLAG_ENABLE_SHIP_BIRTH_ISLAND`): Logical ID `0x84B` (2123).
  - Byte offset: `265` (`0x109`)
  - Bit index: `3`

## Conclusion

To verify if a player has participated in a Mystery Gift event and has access to the destination, both the "Item Received" flag and the corresponding "Enable Ship" system flag should be checked in the `flags` array of `SaveBlock1` using the game-specific offsets and bit masks documented above.
