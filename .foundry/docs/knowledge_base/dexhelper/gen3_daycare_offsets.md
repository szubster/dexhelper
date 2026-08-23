# Gen 3 Daycare Memory Offsets

This document details the memory offsets and data structures for the Daycare in Generation 3 games (Ruby/Sapphire, Emerald, FireRed/LeafGreen). The Daycare data is located within `SaveBlock1` (Section 1).

## Absolute Offsets (SaveBlock1)

The absolute offset of the `DayCare` struct relative to the beginning of `SaveBlock1` varies between the versions due to differences in the preceding save data structures.

- **Ruby/Sapphire:** `0x2F9C`
- **Emerald:** `0x3030`
- **FireRed/LeafGreen:** `0x2F80`

## Data Structures

The `DayCare` struct contains an array of two Pokémon (the parents in the daycare), along with some additional metadata (offspring personality, steps). The layout of the individual `DaycareMon` structures differs significantly between Ruby/Sapphire and the later games (Emerald, FireRed/LeafGreen) due to the inclusion of Mail data and steps in the later games.

### Emerald

In Emerald, the `DaycareMon` struct encapsulates the 80-byte `BoxPokemon` along with Mail information and steps taken.

**Sizes:**
- `DaycareMon`: 140 bytes
- `DayCare`: 288 bytes

**Struct Layout:**
```c
struct DaycareMail_Emerald
{
    struct Mail message; // 36 bytes (with padding)
    u8 otName[PLAYER_NAME_LENGTH + 1]; // 8 bytes
    u8 monName[POKEMON_NAME_LENGTH + 1]; // 11 bytes
    u8 gameLanguage; // 1 byte
}; // Total: 56 bytes (with alignment padding)

struct DaycareMon_Emerald
{
    struct BoxPokemon mon; // 80 bytes
    struct DaycareMail_Emerald mail; // 56 bytes
    u32 steps; // 4 bytes
}; // Total: 140 bytes

struct DayCare_Emerald
{
    struct DaycareMon_Emerald mons[2]; // 280 bytes
    u32 offspringPersonality; // 4 bytes
    u8 stepCounter; // 1 byte
    // 3 bytes padding
}; // Total: 288 bytes
```

### Ruby/Sapphire

In Ruby/Sapphire, the `DayCare` struct groups the two `BoxPokemon` together, and separates the mail and step counter data into a `misc` struct. The individual `DaycareMon` is functionally just the 80-byte `BoxPokemon`.

**Sizes:**
- `DaycareMon` (BoxPokemon): 80 bytes
- `DayCareMisc`: 124 bytes
- `DayCare`: 284 bytes

**Struct Layout:**
```c
struct DayCareMail_RS
{
    struct Mail message;
    u8 names[19];
}; // Total: 56 bytes

struct DayCareStepCountersEtc_RS {
    u32 steps[2];
    u16 pendingEggPersonality;
    u8 eggCycleStepsRemaining;
}; // Total: 12 bytes

struct DayCareMisc_RS
{
    struct DayCareMail_RS mail[2]; // 112 bytes
    struct DayCareStepCountersEtc_RS countersEtc; // 12 bytes
}; // Total: 124 bytes

struct DayCare_RS
{
    struct BoxPokemon mons[2]; // 160 bytes
    struct DayCareMisc_RS misc; // 124 bytes
}; // Total: 284 bytes
```

### FireRed/LeafGreen

FireRed/LeafGreen uses a similar `DaycareMon` struct as Emerald, encapsulating the `BoxPokemon`, Mail, and steps. However, the `DayCare` struct has a slightly different layout for the metadata (offspring personality is `u16` instead of `u32`).

**Sizes:**
- `DaycareMon`: 140 bytes
- `DayCare`: 284 bytes

**Struct Layout:**
```c
struct DaycareMail_FRLG
{
    struct Mail message;
    u8 OT_name[PLAYER_NAME_LENGTH + 1]; // 8 bytes
    u8 monName[POKEMON_NAME_LENGTH + 1]; // 11 bytes
    u8 gameLanguage; // 1 byte (bitfield in decomp)
}; // Total: 56 bytes (with alignment padding)

struct DaycareMon_FRLG
{
    struct BoxPokemon mon; // 80 bytes
    struct DaycareMail_FRLG mail; // 56 bytes
    u32 steps; // 4 bytes
}; // Total: 140 bytes

struct DayCare_FRLG
{
    struct DaycareMon_FRLG mons[2]; // 280 bytes
    u16 offspringPersonality; // 2 bytes
    u8 stepCounter; // 1 byte
    // 1 byte padding
}; // Total: 284 bytes
```
