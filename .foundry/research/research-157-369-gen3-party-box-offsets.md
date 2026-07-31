---
id: research-157-369-gen3-party-box-offsets
type: RESEARCH
title: Research Gen 3 Party and PC Box Memory Offsets
status: PENDING
owner_persona: researcher
created_at: '2026-07-31'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research Gen 3 Party and PC Box Memory Offsets

## Objective
Research the exact memory offsets and structure for Party Pokémon and PC Box Pokémon in Generation 3 save files to enable accurate data extraction of PIDs.

## Context
Task `task-099-157-gen3-extract-pokemon-pids-impl` requires implementing backend data extraction for Gen 3 Party and PC Box PIDs. The exact memory offsets and structure of this data within the save file are currently unknown in the codebase, preventing implementation without risking memory layout errors.

## Acceptance Criteria
- [ ] Research and document the memory offsets and structure for Party Pokémon in Gen 3 saves (Ruby/Sapphire, Emerald, FireRed/LeafGreen).
- [ ] Research and document the memory offsets and structure for PC Box data in Gen 3 saves (Ruby/Sapphire, Emerald, FireRed/LeafGreen).
- [ ] Detail the structure and offsets of the PIDs for Pokémon stored within the party and boxes.
- [ ] Document these findings in `.foundry/docs/knowledge_base/engine/save_parsing/`.
