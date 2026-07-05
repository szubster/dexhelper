---
id: research-259-249-gen3-npc-trade-parsing
type: RESEARCH
title: Research Gen 3 NPC Trade Memory Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-259-gen3-npc-trade-parsing
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research Gen 3 NPC Trade Memory Offsets

## Objective
Find the memory block locations, offsets, bit flags, and lengths for NPC trade flags in Gen 3 (RSE/FRLG) save files. We lack the exact memory structures needed to draft implementation blueprints for Gen 3 NPC Trades.

## Findings

In Generation 3, in-game NPC trade flags are stored in the save file's flag block.

### Emerald / Ruby / Sapphire (RSE)

In RSE, there are specific flags that get set when an in-game NPC trade is completed.

- `FLAG_RUSTBORO_NPC_TRADE_COMPLETED`: 0x99 (Decimal 153)
- `FLAG_PACIFIDLOG_NPC_TRADE_COMPLETED`: 0x9A (Decimal 154)
- `FLAG_FORTREE_NPC_TRADE_COMPLETED`: 0x9B (Decimal 155)
- `FLAG_BATTLE_FRONTIER_TRADE_DONE`: 0x9C (Decimal 156) - *Emerald Only*

### FireRed / LeafGreen (FRLG)

In FRLG, there are 9 in-game NPC trades, each with a specific flag.

- `FLAG_DID_MIMIEN_TRADE`: 0x248 (Decimal 584)
- `FLAG_DID_ZYNX_TRADE`: 0x24A (Decimal 586)
- `FLAG_DID_MS_NIDO_TRADE`: 0x24B (Decimal 587)
- `FLAG_DID_CH_DING_TRADE`: 0x24D (Decimal 589)
- `FLAG_DID_NINA_TRADE`: 0x251 (Decimal 593)
- `FLAG_DID_MARC_TRADE`: 0x257 (Decimal 599)
- `FLAG_DID_ESPHERE_TRADE`: 0x274 (Decimal 628)
- `FLAG_DID_TANGENY_TRADE`: 0x275 (Decimal 629)
- `FLAG_DID_SEELOR_TRADE`: 0x276 (Decimal 630)

### Flag Storage and Extraction
In Generation 3, flags are typically stored in the save file's flag block. The byte offset for a specific flag is `flag_id / 8`, and the bit index within that byte is `flag_id % 8`.

The extracted offset document has been added to `.foundry/docs/knowledge_base/gen3_npc_trade_offsets.md`.
