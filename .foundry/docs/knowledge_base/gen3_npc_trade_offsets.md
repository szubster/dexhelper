# Gen 3 NPC Trade Memory Offsets

This document outlines the memory flags associated with in-game NPC trades for Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Emerald / Ruby / Sapphire (RSE)

In RSE, there are specific flags that get set when an in-game NPC trade is completed.

From the `pokeemerald` and `pokeruby` decompilations (`include/constants/flags.h`):
- `FLAG_RUSTBORO_NPC_TRADE_COMPLETED`: 0x99 (Decimal 153)
- `FLAG_PACIFIDLOG_NPC_TRADE_COMPLETED`: 0x9A (Decimal 154)
- `FLAG_FORTREE_NPC_TRADE_COMPLETED`: 0x9B (Decimal 155)
- `FLAG_BATTLE_FRONTIER_TRADE_DONE`: 0x9C (Decimal 156) - *Emerald Only*

## FireRed / LeafGreen (FRLG)

In FRLG, there are 9 in-game NPC trades, each with a specific flag.

From the `pokefirered` decompilation (`include/constants/flags.h`):
- `FLAG_DID_MIMIEN_TRADE`: 0x248 (Decimal 584)
- `FLAG_DID_ZYNX_TRADE`: 0x24A (Decimal 586)
- `FLAG_DID_MS_NIDO_TRADE`: 0x24B (Decimal 587)
- `FLAG_DID_CH_DING_TRADE`: 0x24D (Decimal 589)
- `FLAG_DID_NINA_TRADE`: 0x251 (Decimal 593)
- `FLAG_DID_MARC_TRADE`: 0x257 (Decimal 599)
- `FLAG_DID_ESPHERE_TRADE`: 0x274 (Decimal 628)
- `FLAG_DID_TANGENY_TRADE`: 0x275 (Decimal 629)
- `FLAG_DID_SEELOR_TRADE`: 0x276 (Decimal 630)

## Flag Storage and Extraction
In Generation 3, flags are typically stored in the save file's flag block. The byte offset for a specific flag is `flag_id / 8`, and the bit index within that byte is `flag_id % 8`.
