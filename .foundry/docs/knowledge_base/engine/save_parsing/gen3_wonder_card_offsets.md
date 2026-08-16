# Gen 3 Wonder Card Memory Offsets

This document details the memory offsets and data structures for Wonder Cards in Generation 3 (Emerald, FireRed, LeafGreen). Note that Ruby and Sapphire do not support Mystery Gift/Wonder Cards natively in their save structures.

## 1. Global Offset and Location
Wonder Card data is part of the `MysteryGiftSave` structure which is located at the end of `SaveBlock1`.

### Base Offsets within `SaveBlock1`
- **Emerald:** `0x322C`
- **FireRed / LeafGreen:** `0x3120`

## 2. MysteryGiftSave Structure
The `MysteryGiftSave` block contains both Wonder News and Wonder Cards. It is `0x36C` (876) bytes long.

| Offset within MysteryGiftSave | Size | Name | Description |
|---|---|---|---|
| `0x00` | 4 | `newsCrc` | CRC32 of the Wonder News. |
| `0x04` | 444 | `news` | `WonderNews` structure. |
| `0x1C0` | 4 | `cardCrc` | CRC32 of the Wonder Card. |
| `0x1C4` | 332 | `card` | `WonderCard` structure. |
| `0x310` | 4 | `cardMetadataCrc` | CRC32 of the Wonder Card metadata. |
| `0x314` | 36 | `cardMetadata` | `WonderCardMetadata` structure. |
| `0x338` | 8 | `questionnaireWords` | 4 `u16` words for Mystery Gift questionnaire. |
| `0x340` | 2 | `newsMetadata` | `WonderNewsMetadata` structure. |
| `0x344` | 40 | `trainerIds` | 10 `u32` IDs of trainers interacted with. |

## 3. WonderCard Structure Definition
The `WonderCard` structure is `332` bytes (`0x14C`) long. It starts at offset `0x1C4` within the `MysteryGiftSave` block.

| Offset | Type | Name | Description |
|---|---|---|---|
| `0x00` | `u16` | `flagId` | Event flag ID. |
| `0x02` | `u16` | `iconSpecies` | Species ID of the icon to display. |
| `0x04` | `u32` | `idNumber` | Unique ID of the Wonder Card. |
| `0x08` | `u8` (Bitfield) | `type` (2), `bgType` (4), `sendType` (2) | Configuration for the card type and background. |
| `0x09` | `u8` | `maxStamps` | Maximum number of stamps allowed. |
| `0x0A` | `u8[40]` | `titleText` | Title of the card. |
| `0x32` | `u8[40]` | `subtitleText` | Subtitle of the card. |
| `0x5A` | `u8[4][40]` | `bodyText` | Main body text (4 lines of 40 chars). |
| `0xFA` | `u8[40]` | `footerLine1Text` | Footer text line 1. |
| `0x122` | `u8[40]` | `footerLine2Text` | Footer text line 2 (Gift text). |

### Absolute Offsets within `SaveBlock1`
To calculate the absolute offset of the `WonderCard` block within `SaveBlock1`:
- **Emerald:** `0x322C` + `0x1C4` = `0x33F0`
- **FireRed / LeafGreen:** `0x3120` + `0x1C4` = `0x32E4`
