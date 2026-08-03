---
id: research-273-393-gen3-pc-box-offsets-root-cause
type: RESEARCH
title: Research PC Box Memory Offsets for Generation 3 Root Cause
status: PENDING
owner_persona: researcher
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-133-273-living-dex-pc-mapping
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Research PC Box Memory Offsets for Generation 3 Root Cause

## Objective
Research the exact memory offsets and structure for PC Box data in Generation 3 save files to enable accurate data extraction of PC Box Pokemon and Box configurations for the Living Dex.
Additionally, investigate why the previous research task (`research-327-385-gen3-pc-box-offsets`) and implementation (`task-273-327-living-dex-pc-mapping-impl`) failed, addressing the 'impossible loop' scenario.

## Context
Task `task-273-327-living-dex-pc-mapping-impl` requires implementing backend data mapping to extract PC Box and Slot locations for owned Pokémon in Generation 3. It permanently failed because of missing information regarding Gen 3 save parsing (specifically PC Box offsets). The previous research node was spawned incorrectly or with inadequate context, leading to a cascading failure. We must late-bind this research node to gather the required context before re-attempting implementation.

## Acceptance Criteria
- [ ] Investigate the root cause of the previous failure related to Gen 3 PC Box extraction and missing offsets.
- [ ] Research and document the exact memory structure of PC Boxes in Gen 3 saves (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- [ ] Determine the exact base offset for PC Box data relative to the resolved `section` offsets.
- [ ] Determine the exact offset for the box configurations (names, wallpapers).
- [ ] Detail the structure and offsets of the Pokémon stored within the boxes.
- [ ] Document these findings in `.foundry/docs/knowledge_base/engine/save_parsing/`.
