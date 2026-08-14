# Gen 3 Party Offsets

In Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen), the player's team of Pokémon is stored in Section 1 (Team / Items).

## Team List and Size

The team data is located at the following offsets within Section 1:

| Offset within Section 1 | Size (Bytes) | FRLG Offset | Description |
| :--- | :--- | :--- | :--- |
| `0x0234` | 4 | `0x0034` (1 byte) | Team size (number of Pokémon currently on the team) |
| `0x0238` | 600 | `0x0038` | Team Pokémon list |

**Note**: In FireRed and LeafGreen, the Team Size offset is `0x0034` (1 byte), and the Team Pokémon list offset is `0x0038` (600 bytes).

### Team Pokémon List

The Team Pokémon list contains data for up to 6 Pokémon, as an array. Each Pokémon in the party takes up exactly 100 bytes (using the full Pokémon data structure). Therefore, the total list is 6 × 100 = 600 bytes. Data representing Pokémon beyond the team size are padded with the byte value `0x00`.

## Pokémon PID Offset (Party & PC)

The Personality Value (also referred to as PID or PV) is located at offset `0x00` in every Pokémon data structure (both the 100-byte party structure and the 80-byte PC structure). It is a 4-byte (`u32`) little-endian value.

| Offset within Record | Size (Bytes) | Field | Description |
| :--- | :--- | :--- | :--- |
| `0x00` | 4 | Personality value (PID) | 32-bit integer controlling gender, ability, nature, shininess, and encryption key component. |

For a Pokémon in the party:
- Pokémon 1 PID: `0x0238` + `0x00` = `0x0238`
- Pokémon 2 PID: `0x0238` + `100` = `0x029C`
- Pokémon 3 PID: `0x0238` + `200` = `0x0300`
- etc.
