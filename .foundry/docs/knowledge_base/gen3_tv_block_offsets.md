# Gen 3 TV Block Memory Offsets and Structures

The memory offsets, block sizes, and data structures for the TV broadcast data block in Gen 3 save files (Ruby, Sapphire, Emerald) are as follows:

## 1. Upcoming Event Schedule (`PokeNews`)
The game maintains an array of `PokeNews` structs within `SaveBlock1` to manage upcoming events.
- **Offset within `SaveBlock1`:** `0x2B50`
- **Count:** `16`
- **Total Array Size:** `64` bytes (`0x40`)
- **Struct Size:** `4` bytes each

## 2. TV Broadcast Data (`TVShow`)
The game stores TV show broadcasts in an array of `TVShow` structures within `SaveBlock1`.
- **Offset within `SaveBlock1`:** `0x27CC`
- **Count:** `25`
- **Total Array Size:** `900` bytes (`0x384`)
- **Struct Size:** `36` bytes each

## 3. TVShow Common Header
The common header for all `TVShow` structs is as follows:
- `0x00` (`u8`): `kind` (The ID of the TV show broadcast)
- `0x01` (`bool8`): `active` (Boolean flag indicating if the show is actively in rotation)

Following the header, bytes `0x02` to `0x23` contain show-specific payload data.
