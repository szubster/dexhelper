# Gen 3 Static Encounter Event Flag Offsets

This document tracks the event flags used in Gen 3 games (Emerald, FireRed, LeafGreen, Ruby, Sapphire) to determine if a static encounter (legendaries, interactables like Sudowoodo, Snorlax, Voltorb/Electrode) has been defeated/caught/cleared.

## Memory Offset Calculation
The "Event Flags" section starts at `0x1270` within `SaveBlock1`.
To calculate the specific byte and bit for an event flag:
`Byte Offset = (Flag_ID / 8)`
`Bit Position = (Flag_ID % 8)`

## Emerald (`pret/pokeemerald`)

| Encounter | Flag ID (Hex) | Byte Offset (Hex) | Bit |
| :--- | :--- | :--- | :--- |
| Deoxys | `0x1AC` | `0x35` | 4 |
| Regirock | `0x1BB` | `0x37` | 3 |
| Regice | `0x1BC` | `0x37` | 4 |
| Registeel | `0x1BD` | `0x37` | 5 |
| Kyogre | `0x1BE` | `0x37` | 6 |
| Groudon | `0x1BF` | `0x37` | 7 |
| Rayquaza | `0x1C0` | `0x38` | 0 |
| Voltorb 1 (New Mauville) | `0x1C1` | `0x38` | 1 |
| Voltorb 2 (New Mauville) | `0x1C2` | `0x38` | 2 |
| Voltorb 3 (New Mauville) | `0x1C3` | `0x38` | 3 |
| Electrode 1 (Aqua Hideout) | `0x1C4` | `0x38` | 4 |
| Electrode 2 (Aqua Hideout) | `0x1C5` | `0x38` | 5 |
| Sudowoodo | `0x1C6` | `0x38` | 6 |
| Mew (Defeated) | `0x1C7` | `0x38` | 7 |
| Mew (Caught) | `0x1CA` | `0x39` | 2 |
| Ho-Oh | `0x1DC` | `0x3B` | 4 |
| Lugia | `0x1DD` | `0x3B` | 5 |


## FireRed & LeafGreen (`pret/pokefirered`)

| Encounter | Flag ID (Hex) | Byte Offset (Hex) | Bit | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Mewtwo | `0x2BC` | `0x57` | 4 | Fought |
| Moltres | `0x2BD` | `0x57` | 5 | Fought |
| Articuno | `0x2BE` | `0x57` | 6 | Fought |
| Zapdos | `0x2BF` | `0x57` | 7 | Fought |
| Deoxys | `0x2E4` | `0x5C` | 4 | Fought |
| Lugia | `0x2F2` | `0x5E` | 2 | Fought |
| Ho-Oh | `0x2F3` | `0x5E` | 3 | Fought |
| Snorlax (Route 12) | `0x253` | `0x4A` | 3 | Woke up flag |
| Snorlax (Route 16) | `0x080` | `0x10` | 0 | Hide flag |

## Ruby & Sapphire (`pret/pokeruby`)

| Encounter | Flag ID (Hex) | Byte Offset (Hex) | Bit | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Groudon/Kyogre | `0x71` | `0x0E` | 1 | Cave of Origin Legendary Battle Completed |
| Rayquaza | `0x305` | `0x60` | 5 | Hide flag |
| Regirock | `0x3A7` | `0x74` | 7 | Hide flag |
| Regice | `0x3A8` | `0x75` | 0 | Hide flag |
| Registeel | `0x3A9` | `0x75` | 1 | Hide flag |
| Voltorb 1 (New Mauville) | `0x3CE` | `0x79` | 6 | Hide flag |
| Voltorb 2 (New Mauville) | `0x3CF` | `0x79` | 7 | Hide flag |
| Voltorb 3 (New Mauville) | `0x3D0` | `0x7A` | 0 | Hide flag |
| Electrode 1 (Aqua Hideout) | `0x3D1` | `0x7A` | 1 | Hide flag |
| Electrode 2 (Aqua Hideout) | `0x3D2` | `0x7A` | 2 | Hide flag |
