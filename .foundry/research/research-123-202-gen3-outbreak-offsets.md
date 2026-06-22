---
id: research-123-202-gen3-outbreak-offsets
type: RESEARCH
title: Research Gen 3 Mass Outbreak Memory Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-17'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-123-gen3-active-swarm-parsing
tags:
  - research
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Gen 3 Mass Outbreak Memory Offsets
## Objective
Investigate the exact memory offsets inside the `massOutbreak` payload of the `TVShow` struct (within SaveBlock1) to extract the active swarm species, location (mapId/mapGroup), and days remaining. This is required for `task-123-183-gen3-active-swarm-parsing-impl`.

## Findings
Based on the `pret/pokeemerald` decompilation (`include/global.tv.h`), the `massOutbreak` struct within the `TVShow` union has the following memory layout:

```c
// TVSHOW_MASS_OUTBREAK
struct {
    /*0x00*/ u8 kind;
    /*0x01*/ bool8 active;
    /*0x02*/ u8 unused1;
    /*0x03*/ u8 unused3;
    /*0x04*/ u16 moves[4]; // MAX_MON_MOVES is 4
    /*0x0C*/ u16 species;
    /*0x0E*/ u16 unused2;
    /*0x10*/ u8 locationMapNum;
    /*0x11*/ u8 locationMapGroup;
    /*0x12*/ u8 unused4;
    /*0x13*/ u8 probability;
    /*0x14*/ u8 level;
    /*0x15*/ u8 unused5;
    /*0x16*/ u16 daysBeforeOutbreak;
    /*0x18*/ u8 language;
    /*0x19*/ //u8 padding;
} massOutbreak;
```

### Extracted Offsets
Within the 36-byte (0x24) `TVShow` struct size, the `massOutbreak` payload contains the following offsets for the requested data fields:

- **Active Swarm Species:** `0x0C` (12) - `u16` (2 bytes)
- **Location (MapNum):** `0x10` (16) - `u8` (1 byte)
- **Location (MapGroup):** `0x11` (17) - `u8` (1 byte)
- **Days Remaining (`daysBeforeOutbreak`):** `0x16` (22) - `u16` (2 bytes)

These offsets are relative to the start of each 36-byte TV show block within the `tvShows` array located at offset `0x27CC` in `SaveBlock1` (as documented in `.foundry/docs/knowledge_base/gen3_tv_shows_and_events.md`).

- [x] Identify memory offset for mass outbreak species ID
- [x] Identify memory offsets for mass outbreak location mapNum and mapGroup
- [x] Identify memory offset for mass outbreak days remaining
