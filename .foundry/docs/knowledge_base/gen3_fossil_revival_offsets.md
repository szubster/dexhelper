# Gen 3 Fossil Revival Offsets

## Overview
This document outlines the memory layout, variables, and event flags used to track the status of Fossil drop-off and pickup across Generation 3 games (Ruby/Sapphire, Emerald, FireRed/LeafGreen).

## RSE (Ruby, Sapphire, Emerald) - Devon Corporation

In RSE, fossil resurrection is managed at the Devon Corporation in Rustboro City. The game tracks the progress using two primary variables and a few event flags.

### Variables

The tracking uses the `vars` array located in `SaveBlock1`.

| Game | `vars` Array Offset | `VAR_FOSSIL_RESURRECTION_STATE` Offset | `VAR_WHICH_FOSSIL_REVIVED` Offset |
| :--- | :--- | :--- | :--- |
| **Ruby/Sapphire** | `0x1340` | `0x14C8` | `0x14CA` |
| **Emerald** | `0x139C` | `0x1524` | `0x1526` |

**Note**: The `vars` array starts at logical ID `0x4000`. Each var is a 16-bit unsigned integer (2 bytes).

#### `VAR_FOSSIL_RESURRECTION_STATE` (ID: `0x40C4`)
Tracks the current state of the resurrection process:
- `0`: No fossil given / Default state.
- `1`: Fossil given to researcher, currently regenerating. (Requires leaving the building or triggering a map reload to complete).
- `2`: Fossil is ready for pickup.

#### `VAR_WHICH_FOSSIL_REVIVED` (ID: `0x40C5`)
Stores the ID of the fossil currently being revived:
- `1`: Root Fossil (Lileep)
- `2`: Claw Fossil (Anorith)

### Relevant Event Flags
The `flags` array is also in `SaveBlock1` (R/S offset: `0x1220`, Emerald offset: `0x1270`).

| Flag | ID | R/S Offset (Bit) | Emerald Offset (Bit) | Description |
| :--- | :--- | :--- | :--- | :--- |
| `FLAG_CHOSE_ROOT_FOSSIL` | `0x14F` | `0x1249` (Bit 7) | `0x1299` (Bit 7) | Player chose the Root Fossil. |
| `FLAG_CHOSE_CLAW_FOSSIL` | `0x150` | `0x124A` (Bit 0) | `0x129A` (Bit 0) | Player chose the Claw Fossil. |
| `FLAG_RECEIVED_REVIVED_FOSSIL_MON` | `0x10B` | `0x1241` (Bit 3) | `0x1291` (Bit 3) | Player successfully picked up the revived Pokémon. |

---

## FRLG (FireRed, LeafGreen) - Cinnabar Lab

In FireRed and LeafGreen, fossil resurrection takes place at the Pokémon Lab on Cinnabar Island. FRLG relies on a single variable for tracking the *current* process, but heavily utilizes event flags to track which fossils have already been obtained and resurrected.

### Variables

The `vars` array in FRLG is located at offset `0x1000` in `SaveBlock1`.

| Game | `vars` Array Offset | `VAR_MAP_SCENE_CINNABAR_ISLAND_POKEMON_LAB_EXPERIMENT_ROOM_WHICH_FOSSIL` Offset |
| :--- | :--- | :--- |
| **FireRed/LeafGreen** | `0x1000` | `0x10D2` |

#### `VAR_MAP_SCENE_CINNABAR_ISLAND_POKEMON_LAB_EXPERIMENT_ROOM_WHICH_FOSSIL` (ID: `0x4069`)
Tracks which fossil is currently handed over to the researcher:
- `0`: No fossil handed over.
- `ITEM_HELIX_FOSSIL` (`357` / `0x0165`): Helix Fossil (Omanyte) is being revived.
- `ITEM_DOME_FOSSIL` (`358` / `0x0166`): Dome Fossil (Kabuto) is being revived.
- `ITEM_OLD_AMBER` (`354` / `0x0162`): Old Amber (Aerodactyl) is being revived.

*Unlike RSE, this variable stores the actual Item ID of the fossil.*

### Relevant Event Flags
The `flags` array in FRLG starts at offset `0x0EE0` in `SaveBlock1`.

| Flag | ID | Offset (Bit) | Description |
| :--- | :--- | :--- | :--- |
| `FLAG_GOT_DOME_FOSSIL` | `0x272` | `0x0F2E` (Bit 2) | Player obtained the Dome Fossil. |
| `FLAG_GOT_HELIX_FOSSIL` | `0x273` | `0x0F2E` (Bit 3) | Player obtained the Helix Fossil. |
| `FLAG_GOT_OLD_AMBER` | `0x25E` | `0x0F2B` (Bit 6) | Player obtained the Old Amber. |

(When the researcher finishes reviving the Pokémon, he clears the `VAR_..._WHICH_FOSSIL` variable back to `0`.)
