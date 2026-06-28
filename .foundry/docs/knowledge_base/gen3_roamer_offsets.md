# Gen 3 Roamer Event Flag Offset Research

Based on the Gen 3 decompilation code (`pret/pokeemerald`, `pret/pokeruby`, `pret/pokefirered`), here is the detailed research on the roaming Pokémon event flag offsets.

## Summary

The "roamer released" event is tracked by a standard game flag, not a dedicated boolean in a specific structure. Once this flag is set, the roamer starts moving around the map and can be encountered.

## 1. The Flag

The flag responsible for indicating that the roamer has been released in Ruby/Sapphire and Emerald is:

*   **Flag Constant:** `FLAG_LATIOS_OR_LATIAS_ROAMING`
*   **Flag Value:** `0xFF` (255)

This flag is set in the TV event script (`data/scripts/tv.inc`) after the player watches the television reporting the mysterious Pokémon, and in the `data/scripts/players_house.inc` script.

## 2. Memory Offset Calculation

Flags in Generation 3 are stored as a bit array (bitfield) within `SaveBlock1` under the `flags` array (`u8 flags[NUM_FLAG_BYTES];`).

To calculate the specific byte offset and bit for flag `0xFF` (255):
*   **Byte Offset within the `flags` array:** `255 // 8 = 31` (`0x1F`)
*   **Bit Position within the byte:** `255 % 8 = 7` (the highest bit)

### Emerald Offsets

*   **`SaveBlock1` `flags` array base offset:** `0x1270`
*   **Absolute Offset within `SaveBlock1`:** `0x1270 + 0x1F = 0x128F`
*   **Bitmask:** `1 << 7` (`0x80`)

### Ruby / Sapphire Offsets

*   **`SaveBlock1` `flags` array base offset:** `0x1220`
*   **Absolute Offset within `SaveBlock1`:** `0x1220 + 0x1F = 0x123F`
*   **Bitmask:** `1 << 7` (`0x80`)

### FireRed / LeafGreen

FireRed and LeafGreen use a different roaming legendary (the legendary beast corresponding to the player's starter). The `FLAG_LATIOS_OR_LATIAS_ROAMING` flag does not exist in FRLG. Instead, FRLG uses `FLAG_ENCOUNTERED_ROAMER` (`0x2A2`) and initializes the roamer when delivering the Sapphire to Celio. Let's find the `roamer` block offset in FRLG:
`roamer` block offset in FRLG: `0x30D0`.
However, the `roamer` struct itself has an `active` boolean field at offset `0x13`.

## 3. The `Roamer` Struct

Additionally, `SaveBlock1` contains a dedicated `Roamer` structure that maintains the roamer's current state (IVs, HP, level, active status).

The `Roamer` struct is defined as:
```c
struct Roamer
{
    /*0x00*/ u32 ivs;
    /*0x04*/ u32 personality;
    /*0x08*/ u16 species;
    /*0x0A*/ u16 hp;
    /*0x0C*/ u8 level;
    /*0x0D*/ u8 status;
    /*0x0E*/ u8 cool;
    /*0x0F*/ u8 beauty;
    /*0x10*/ u8 cute;
    /*0x11*/ u8 smart;
    /*0x12*/ u8 tough;
    /*0x13*/ bool8 active;
    /*0x14*/ u8 filler[0x8];
};
```

This struct includes an `active` boolean at offset `0x13`. This `active` boolean is arguably a more robust way to check if the roamer is currently roaming the map (as opposed to defeated or captured, which would deactivate it).

**`Roamer` Struct Base Offset in `SaveBlock1`:**
*   **Emerald:** `0x31DC`
*   **Ruby/Sapphire:** (Need to verify)
*   **FireRed/LeafGreen:** `0x30D0`

Let's verify the Ruby/Sapphire `roamer` struct offset.

**Ruby/Sapphire `Roamer` Struct Base Offset:** `0x3144`

## 4. Conclusion

There are two primary ways to check if the roamer is released and active:

1.  **Event Flag (`FLAG_LATIOS_OR_LATIAS_ROAMING`):**
    *   **Emerald:** Offset `0x128F`, bit 7 (`0x80`).
    *   **Ruby/Sapphire:** Offset `0x123F`, bit 7 (`0x80`).
    *   **Pros:** Represents the exact storyline event.
    *   **Cons:** FRLG uses a different flag (`FLAG_ENCOUNTERED_ROAMER` at `0x2A2` - byte offset `0x54`, bit 2). Requires offset tables based on game version.

2.  **`Roamer` Struct `active` boolean:**
    *   **Emerald:** Offset `0x31DC` + `0x13` = `0x31EF`
    *   **Ruby/Sapphire:** Offset `0x3144` + `0x13` = `0x3157`
    *   **FireRed/LeafGreen:** Offset `0x30D0` + `0x13` = `0x30E3`
    *   **Pros:** The `active` boolean (`0x13` within the `struct Roamer`) directly determines if the game currently considers the roamer to be active on the map. This gets set to `FALSE` if the player defeats or catches the roamer. This is likely the exact data point the radar needs, as opposed to just whether the TV event happened.

I will document both the event flag offsets and the `Roamer` structure offsets (specifically the `active` field) in `.foundry/docs/knowledge_base/gen3_roamer_offsets.md`.

## 5. Roamer Data Schema

Given the impossibility of statically extracting the roamer's map coordinates from the save file (as documented in `adr-108-027-gen3-roamer-location-impossible`), the application should utilize a tracking schema focused on the roamer's state, identity, and stats.

### Proposed Data Structure

```typescript
export interface Gen3RoamerState {
    isActive: boolean;    // Derived from the 'active' boolean (offset 0x13 in Roamer struct). True if roaming the map.
    speciesId: number;    // The species ID of the roamer (e.g., Latios/Latias in RS/E, Legendary Beast in FRLG).
    level: number;        // Current level of the roamer.
    hp: number;           // Current HP (useful for tracking damage across encounters).
    status: number;       // Status condition (Sleep, Paralysis, etc.).
    personality: number;  // Personality Value (PID).
    ivs: number;          // 32-bit integer containing IVs. Can be unpacked into individual stats.
    cool: number;         // Cool contest stat.
    beauty: number;       // Beauty contest stat.
    cute: number;         // Cute contest stat.
    smart: number;        // Smart contest stat.
    tough: number;        // Tough contest stat.
}
```

This alternative schema provides significant value (e.g., for RNG tracking or confirming encounter readiness) by surfacing the exact state of the roamer when the save file was generated, completely avoiding the impossible requirement of live map tracking.
