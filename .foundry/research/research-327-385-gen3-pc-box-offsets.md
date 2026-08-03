---
id: research-327-385-gen3-pc-box-offsets
type: RESEARCH
title: Research PC Box Memory Offsets for Generation 3
status: PENDING
owner_persona: researcher
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-273-327-living-dex-pc-mapping-impl
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research PC Box Memory Offsets for Generation 3

## Objective
Research the exact memory offsets and structure for PC Box data in Generation 3 save files to enable accurate data extraction of PC Box Pokemon and Box configurations for the Living Dex.

## Context
Task `task-273-327-living-dex-pc-mapping-impl` requires implementing backend data mapping to extract PC Box and Slot locations for owned Pokémon in Generation 3. The exact offsets and structure of this data within the `SaveBlock1` or `SaveBlock2` sections are currently missing in the codebase.

## Acceptance Criteria
- [ ] Research and document the memory structure of PC Boxes in Gen 3 saves (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- [ ] Determine the exact base offset for PC Box data.
- [ ] Determine the exact offset for the box configurations (names, wallpapers).
- [ ] Detail the structure and offsets of the Pokémon stored within the boxes.
- [ ] Document these findings in `.foundry/docs/knowledge_base/engine/save_parsing/`.