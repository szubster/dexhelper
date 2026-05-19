# Gen 2 Save File Structure: Daycare & Breeding

## Overlays & RAM Mirroring
The save file structure for Pokémon Gold/Silver/Crystal (GSC) often reflects RAM banks. In this project, the offsets correspond to specific regions of the save file that map to these RAM structures.

## Daycare Slots (GSC)
Gen 2 introduced breeding, which requires two daycare slots (one for the "Old Man" and one for the "Old Lady" on Route 34).

### Offset Mapping
| Region | Slot 1 (Data Start) | Slot 2 (Data Start) | Egg Flag |
| :--- | :--- | :--- | :--- |
| **Gold/Silver** | `0x2850` | `0x2817` | `0x284f` |
| **Crystal** | `0x282c` | `0x27f3` | `0x282b` |

### Slot Structure (57 Bytes Total)
The slots are exactly 57 bytes (0x39) apart. In this codebase's specific layout:
1. **Data Block (32 bytes)**: Standard Pokemon struct (Species, Item, Moves, DVs, Level, etc.).
2. **OT Name (11 bytes)**: Starts immediately after Data (+32).
3. **Nickname (11 bytes)**: Starts immediately after OT Name (+43).
4. **Flags/Padding (3 bytes)**: Trailing bytes before the next block or party count.

### Separation Calculation
*   **Crystal**: `0x282c` (Slot 1) - 57 bytes = `0x27f3` (Slot 2).
*   **GS**: `0x2850` (Slot 1) - 57 bytes = `0x2817` (Slot 2).

## Breeding/Egg Logic
*   **Egg Flag**: A single byte indicating if an egg is waiting to be picked up by the player.
    *   Located at `Slot 1 Data - 1 byte`.
    *   Mask: `0x01`.
*   **Egg Species**: If a Pokémon in the party or daycare is an egg, its species ID is `253` (`0xFD`).

## Fixture Limitations
Current testing fixtures (`gold.sav`, `crystal.sav`) are early-game saves. They likely have both daycare slots initialized to `0x00`, meaning verification against real data requires either mocked buffers or specifically crafted saves.
