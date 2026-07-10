# Gen 3 Lottery Offsets

This document describes the memory offsets for the daily lottery PRNG seed in Pokémon Ruby, Sapphire, and Emerald.

## Emerald
In Emerald, the lottery number is stored in `SaveBlock1`. It is a 32-bit number, but it's split into two 16-bit variables stored in the `vars` array.

- **Block**: SaveBlock1
- **Array**: vars
- **Array Offset in Block**: 0x139C
- **Var Indices**:
  - `VAR_POKELOT_RND1` (0x404B) stores the high 16 bits.
  - `VAR_POKELOT_RND2` (0x404C) stores the low 16 bits.
- **Index Offset**: The `vars` array starts at index `0x4000`. So the indices are:
  - High 16 bits offset: (0x404B - 0x4000) * 2 bytes = 0x4B * 2 = 0x96 bytes.
  - Low 16 bits offset: (0x404C - 0x4000) * 2 bytes = 0x4C * 2 = 0x98 bytes.
- **Total Offsets in SaveBlock1**:
  - High 16 bits: 0x139C + 0x96 = 0x1432
  - Low 16 bits: 0x139C + 0x98 = 0x1434

## Ruby / Sapphire
In Ruby and Sapphire, the lottery number is also stored in `SaveBlock1`. It is a 32-bit number split into two 16-bit variables stored in the `vars` array.

- **Block**: SaveBlock1
- **Array**: vars
- **Array Offset in Block**: 0x1340
- **Var Indices**:
  - `VAR_LOTTERY_RND_L` (0x404B) stores the low 16 bits.
  - `VAR_LOTTERY_RND_H` (0x404C) stores the high 16 bits.
- **Index Offset**: The `vars` array starts at index `0x4000`. So the indices are:
  - Low 16 bits offset: (0x404B - 0x4000) * 2 bytes = 0x4B * 2 = 0x96 bytes.
  - High 16 bits offset: (0x404C - 0x4000) * 2 bytes = 0x4C * 2 = 0x98 bytes.
- **Total Offsets in SaveBlock1**:
  - Low 16 bits: 0x1340 + 0x96 = 0x13D6
  - High 16 bits: 0x1340 + 0x98 = 0x13D8
