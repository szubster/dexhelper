---
id: research-246-244-gen3-box-parsing
type: RESEARCH
title: Research PC Box Memory Offsets for Generation 3
status: READY
owner_persona: researcher
created_at: '2026-07-02'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-108-246-gen3-box-parsing
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Research PC Box Memory Offsets for Generation 3

## Objective
Research the exact memory offsets and structure for PC Box data in Generation 3 save files to enable accurate data extraction.

## Context
Story `story-108-246-gen3-box-parsing` requires implementing backend data extraction for Gen 3 PC Boxes. The exact offsets and structure of this data within the `SaveBlock1` or `SaveBlock2` sections (or elsewhere) are currently unknown.

## Acceptance Criteria
- [ ] Research and document the memory structure of PC Boxes in Gen 3 saves (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- [ ] Determine the exact base offset for PC Box data.
- [ ] Determine the exact offset for the `currentBoxCount` (or equivalent).
- [ ] Detail the structure and offsets of the Pokémon stored within the boxes.
- [ ] Document these findings in a new knowledge base markdown file in `.foundry/docs/knowledge_base/engine/save_parsing/`.
