# Gen 3 Secret Base Memory Offsets

## 1. Global Offset and Structure Array
In Gen 3 save files (Ruby, Sapphire, Emerald), the game stores a flat array of `SecretBase` structures in **SaveBlock1**.
- **Max Number of Secret Bases:** `20` (Constant `SECRET_BASES_COUNT`)
- **Size of each `SecretBase` Record:** `160` bytes (`0xA0`)
- **Total Array Size:** `3200` bytes (`0xC80`)

### Offset within SaveBlock1:
- **Ruby/Sapphire:** `0x1A08`
- **Emerald:** `0x1A9C`

## 2. Secret Base Struct Definition (`SecretBase` / `SecretBaseRecord`)

The structure of the `SecretBase` record differs slightly between Ruby/Sapphire and Emerald. Emerald introduces an additional `language` byte, which shifts the subsequent fields. However, due to 16-bit alignment padding in Ruby/Sapphire, the final total size remains exactly `160` bytes for both versions, and the offset of the `party` struct is identical (`0x34` or 52 bytes in).

| Field Name | Type | Size | RS Offset | Emerald Offset | Description |
|---|---|---|---|---|---|
| `secretBaseId` | `u8` | 1 | `0x00` | `0x00` | ID of the Secret Base location. |
| `flags` | `u8` (Bitfield) | 1 | `0x01` | `0x01` | `toRegister` (4), `gender` (1), `battledOwnerToday` (1), `registryStatus` (2). |
| `trainerName` | `u8[7]` / `[8]` | 7 (RS) / 8 (E) | `0x02` | `0x02` | Name of the base owner. Emerald increased player name length to 8. |
| `trainerId` | `u8[4]` | 4 | `0x09` | `0x0A` | Trainer ID (used to determine class/sprite). |
| `language` | `u8` | 1 | - | `0x0E` | Language ID (Emerald only). |
| (Padding) | `u8` | 1 | `0x0D` | - | Implicit padding in RS to align `numSecretBasesReceived` to 16-bit. |
| `numSecretBasesReceived` | `u16` | 2 | `0x0E` | `0x0F` | Number of bases received via Mix Records. |
| `numTimesEntered` | `u8` | 1 | `0x10` | `0x11` | Times the player has entered this specific base. |
| `unused` | `u8` | 1 | `0x11` | `0x12` | Unused byte. |
| `decorations` | `u8[16]` | 16 | `0x12` | `0x13` | Array of 16 Decoration IDs (Constant `DECOR_MAX_SECRET_BASE`). |
| `decorationPos` | `u8[16]` | 16 | `0x22` | `0x23` | Array of 16 spatial coordinates corresponding to the decorations. |
| (Padding) | `u8[2]` | 2 | `0x32` | `0x33` | Implicit padding to align `party` to 32-bit. |
| `party` | `SecretBaseParty` | 108 | `0x34` | `0x34` | The Pokémon party of the base owner. |

*(Note: Although `trainerName` is 7 bytes in RS, 7 + 1 + 1 = 9. `trainerId` starts at offset 9. `numSecretBasesReceived` is a `u16`, so it must start at an even address (offset 14), leaving offset 13 as padding in RS. In Emerald, `trainerName` is 8 bytes, so `trainerId` starts at 10. `language` is at 14, and `numSecretBasesReceived` starts at 15. Wait, this breaks 16-bit alignment in Emerald? Let's check: 10 + 4 = 14. `language` is at 14. `numSecretBasesReceived` is a `u16`. In Emerald, `numSecretBasesReceived` starts at offset 15 (`0x1AAA` - `0x1A9C` = `0x0E` = 14? Ah. Wait. Offset `0x1AAA` - `0x1A9C` = `14` (`0x0E`). Wait, let me recalculate the offsets for Emerald based on decompilation).*

Let's look at the Emerald struct accurately based on the source code:
```c
struct SecretBase
{
    /*0x1A9C*/ u8 secretBaseId; // Offset 0
    /*0x1A9D*/ u8 flags; // Offset 1
    /*0x1A9E*/ u8 trainerName[PLAYER_NAME_LENGTH]; // PLAYER_NAME_LENGTH = 7. Offset 2..8
    /*0x1AA5*/ u8 trainerId[TRAINER_ID_LENGTH]; // TRAINER_ID_LENGTH = 4. Offset 9..12
    /*0x1AA9*/ u8 language; // Offset 13
    /*0x1AAA*/ u16 numSecretBasesReceived; // Offset 14..15
    /*0x1AAC*/ u8 numTimesEntered; // Offset 16
    /*0x1AAD*/ u8 unused; // Offset 17
    /*0x1AAE*/ u8 decorations[DECOR_MAX_SECRET_BASE]; // DECOR_MAX_SECRET_BASE = 16. Offset 18..33
    /*0x1ABE*/ u8 decorationPositions[DECOR_MAX_SECRET_BASE]; // Offset 34..49
    /*0x1ACE*/ //u8 padding[2]; // Offset 50..51
    /*0x1AD0*/ struct SecretBaseParty party; // Offset 52..159
};
```
And Ruby/Sapphire:
```c
struct SecretBaseRecord
{
    /*0x1A08*/ u8 secretBaseId; // Offset 0
    /*0x1A09*/ u8 flags; // Offset 1
    /*0x1A0A*/ u8 playerName[OT_NAME_LENGTH]; // OT_NAME_LENGTH = 7. Offset 2..8
    /*0x1A11*/ u8 trainerId[4]; // Offset 9..12
    /*0x1A15*/ // implicit padding // Offset 13
    /*0x1A16*/ u16 numSecretBasesReceived; // Offset 14..15
    /*0x1A18*/ u8 numTimesEntered; // Offset 16
    /*0x1A19*/ u8 unused; // Offset 17
    /*0x1A1A*/ u8 decorations[DECOR_MAX_SECRET_BASE]; // DECOR_MAX_SECRET_BASE = 16. Offset 18..33
    /*0x1A2A*/ u8 decorationPos[DECOR_MAX_SECRET_BASE]; // Offset 34..49
    /*0x1A3A*/ // implicit padding // Offset 50..51
    /*0x1A3C*/ struct SecretBaseParty party; // Offset 52..159
};
```

**Correction:** Both RS and Emerald use 7 characters for the player name in Secret Bases. The only structural difference is that Emerald fills the 1-byte padding at offset `13` with a `language` byte. The overall size (160 bytes) and all other offsets remain identical between the two games!

## 3. Secret Base Party Struct (`SecretBaseParty`)

The 108-byte `party` structure stores the 6 Pokémon owned by the Secret Base trainer. Unlike normal party Pokémon (which use a complex 100-byte structure with encryption), the Secret Base party is a highly simplified, flat structure.

| Field Name | Type | Size | Offset | Description |
|---|---|---|---|---|
| `personality` | `u32[6]` | 24 | `0x00` | Personality Values for the 6 Pokémon. |
| `moves` | `u16[6 * 4]` | 48 | `0x18` | Array of 24 moves (4 per Pokémon). |
| `species` | `u16[6]` | 12 | `0x48` | Species IDs for the 6 Pokémon. |
| `heldItems` | `u16[6]` | 12 | `0x54` | Held Item IDs. |
| `levels` | `u8[6]` | 6 | `0x60` | Levels of the Pokémon. |
| `EVs` | `u8[6]` | 6 | `0x66` | A single EV value (0-255) distributed across all stats by the engine during battle setup. |

## 4. Map Location Representation (`secretBaseId`)
The physical location of the Secret Base in the game world is defined by the `secretBaseId` (Offset 0).
The `secretBaseId` is used to determine which exact map is loaded.
The ID encapsulates both the Map Group and the specific variant.

**Formula:** `Secret Base Map ID = secretBaseId / 10`
The ones digit (`secretBaseId % 10`) is used to differentiate multiple secret bases that share the exact same internal map layout.
Therefore, `secretBaseId` values range logically from `1` to around `233`, mapping to `24` distinct Secret Base groups (Red Cave, Brown Cave, Tree, Shrub, etc.).

For instance, `SECRET_BASE_RED_CAVE1_1` is `1`, `SECRET_BASE_RED_CAVE1_2` is `2`, etc. They all share the first Red Cave layout (Group 0).
