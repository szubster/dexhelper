# Pokémon Generation 2 Save File Protocol (Standard vs. Pattern)

This document catalogs the save file offsets for Pokémon Gold, Silver, and Crystal (Gen 2). It highlights the discrepancy between common "Standard" offsets found in documentation (e.g., Bulbapedia, Project Pokémon) and the "Patterns" observed in this project's current implementation.

## 1. Global Trainer & Progress (Bank 1)

| Field | GS (Standard) | Crystal (Standard) | Size | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Player ID** | `0x2009` | `0x2009` | 2 | 16-bit unsigned (Big Endian) |
| **Player Name** | `0x200B` | `0x200B` | 11 | Padded with `0x50` |
| **Time Played** | `0x204E` | `0x204E` | 4 | [HH, MM, SS, FF] |
| **Money** | `0x23DB` | `0x23BC` | 3 | BCD (e.g., `01 23 45` = $12,345) |
| **Johto Badges**| `0x23E5` | `0x23C6` | 1 | Bitmask |
| **Kanto Badges**| `0x23E6` | `0x23C7 | 1 | Bitmask |
| **Map Group/ID**| `0x2868` | `0x281C` | 2 | Current location pointers |

## 2. Pokémon Storage (Bank 1)

### Party Data
| Region | Offset (Standard) | Notes |
| :--- | :--- | :--- |
| **GS Party** | `0x288A` | Includes count, species list, data blocks, OT, nicknames |
| **Crystal Party** | `0x283E` | Shifted by `-0x4C` compared to GS |

### Daycare & Breeding
| Field | GS (Standard) | Crystal (Standard) | Observed in Project |
| :--- | :--- | :--- | :--- |
| **Egg Waiting** | `0x284F` | `0x282B` | Same |
| **Daycare Slot 1**| `0x2ABF` | `0x2ABF` | `0x2850` (GS) / `0x282C` (C) |
| **Daycare Slot 2**| `0x2AF8` | `0x2AF8` | Unknown |

> [!WARNING]
> There is a significant discrepancy: The current project parser looks for Daycare Data immediately after the Egg Waiting flag (`0x2850` for GS). Standard documentation suggests the actual 32-byte data blocks are much further down in the bank at `0x2ABF`.

## 3. Pokedex (Bank 1)

| Field | GS (Standard) | Crystal (Standard) |
| :--- | :--- | :--- |
| **Owned Flags** | `0x2A4C` | `0x29CE` |
| **Seen Flags** | `0x2A6C` | `0x29EE` |

## 4. Item Inventory (Bank 1)

| Pocket | GS (Standard) | Crystal (Standard) |
| :--- | :--- | :--- |
| **TM/HM** | `0x23E7` | `0x23C8` |
| **Items** | `0x2420` | `0x2402` |
| **Key Items** | `0x244A` | `0x242C` |
| **Balls** | `0x2465` | `0x2447` |

## Notes on Fixtures
The project's `gold.sav` and `crystal.sav` are early-game saves. They often contain zeroed-out blocks for late-game features like the Daycare slots. When verifying offsets, if a block is all `0x00`, it does not necessarily mean the offset is incorrect, but rather that the save state is uninitialized for that feature. Corroborating with `Egg Waiting` flag shifts is the best proxy for locating related daycare data.
