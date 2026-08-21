---
id: research-440-449-gen3-daycare-offsets
type: RESEARCH
title: Investigate Gen 3 Daycare Offsets and Structure
status: READY
owner_persona: researcher
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '15508722855891593455'
pr_number: null
parent: task-241-440-daycare-gen3-parsing-impl
tags:
  - gen3
  - daycare
  - offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Investigate Gen 3 Daycare Offsets and Structure

## Context
The task `task-241-440-daycare-gen3-parsing-impl` requires implementing Gen 3 Daycare data extraction, but exact memory offsets for Daycare across Ruby/Sapphire, Emerald, and FireRed/LeafGreen are not definitively documented in the project's knowledge base.

## Objective
- Investigate the exact offsets for the Daycare block in `SaveBlock1` across the Gen 3 versions.
- Investigate the `DaycareMon` and `DayCare` structures to know how to properly unpack `BoxPokemon`, `DaycareMail` and steps.
- Document the offsets and logic in a Markdown file in `.foundry/docs/knowledge_base/engine/save_parsing/`.

## Acceptance Criteria
- [ ] Offsets and structural layout for Gen 3 Daycare are documented.
- [ ] Add the findings to `.foundry/docs/knowledge_base/engine/save_parsing/gen3_daycare_offsets.md`.
