# Gen 3 Trainer Flags and Offsets

## Standard Trainer Defeat Flags
In Generation 3 (RSE and FRLG), standard trainer defeat flags are stored in `SaveBlock1` as a bitfield.
The flags start at a logical offset `TRAINER_FLAGS_START = 0x500` inside the `flags` array.

### RSE (Ruby, Sapphire, Emerald)
- **Emerald:** The `flags` array begins at byte offset `0x1270` in `SaveBlock1`.
- **Ruby/Sapphire:** The `flags` array begins at byte offset `0x1220` in `SaveBlock1`.
- The logical flag ID for standard trainers begins at `0x500`. Since each flag is 1 bit (8 flags per byte), the byte offset within the `flags` array is `0x500 / 8 = 0xA0` (160 bytes).
- **Total Trainers:** `MAX_TRAINERS_COUNT = 864` (Emerald), or `NUMBER_OF_TRAINERS = 693` (Ruby/Sapphire).
- **Max Bytes:** `864 / 8 = 108 bytes`.

### FRLG (FireRed, LeafGreen)
- The `flags` array begins at byte offset `0x0EE0` in `SaveBlock1`.
- The logical flag ID for standard trainers begins at `0x500`. The byte offset within the `flags` array is `0xA0` (160 bytes).
- **Total Trainers:** `MAX_TRAINERS_COUNT = 768`.
- **Max Bytes:** `768 / 8 = 96 bytes`.

## Rematch Flags (VS Seeker / Match Call / Trainer's Eyes)
In Generation 3, rematch readiness flags are also stored in `SaveBlock1` in an array called `trainerRematches`.

### RSE (Ruby, Sapphire, Emerald)
- **Emerald:** The `trainerRematches` array starts at byte offset `0x9CA` in `SaveBlock1`.
- **Ruby/Sapphire:** The `trainerRematches` array starts at byte offset `0x97A` in `SaveBlock1`.
- **Size:** `MAX_REMATCH_ENTRIES = 100` (1 byte per entry).
- Each byte corresponds to a rematch table entry ID, not an absolute trainer flag ID. A non-zero value indicates the trainer wants a rematch.

### FRLG (FireRed, LeafGreen)
- The `trainerRematches` array starts at byte offset `0x063A` in `SaveBlock1`.
- **Size:** `MAX_REMATCH_ENTRIES = 100` (1 byte per entry).
- Each FRLG map uses this array to store standard VS seeker rematch states, indexed by the local Object Event ID.