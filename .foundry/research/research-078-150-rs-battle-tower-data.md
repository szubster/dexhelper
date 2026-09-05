---
id: research-078-150-rs-battle-tower-data
type: RESEARCH
title: Ruby/Sapphire Battle Tower Data Investigation
status: READY
owner_persona: researcher
created_at: '2026-07-03'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - research
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Ruby/Sapphire Battle Tower Data Investigation

## Context
During the audit of `epic-046-078-gen3-battle-frontier-data-extraction`, it was observed that the Gen 3 save parser explicitly restricts Battle Frontier data extraction to Emerald saves only (`_forcedVersion === 'emerald'`). While the full Battle Frontier was introduced in Emerald, Pokémon Ruby and Sapphire do feature a Battle Tower.

It is currently unresolved whether Ruby and Sapphire save files contain a different structural representation for their Battle Tower win streaks and records, or if the data simply lives at different offsets compared to Emerald's `BattleFrontier` struct.

## Requirements
We need to investigate the Ruby/Sapphire save file structure to determine:
- Where (and if) Battle Tower win streaks and max win records are stored in Ruby/Sapphire.
- The precise byte offsets for these metrics within `SaveBlock1` or `SaveBlock2` for Ruby/Sapphire.
- Whether the logic developed for Emerald's Battle Tower can be adapted, or if a completely separate parser block is needed.

## Acceptance Criteria
- [ ] Investigate the Ruby/Sapphire memory map for Battle Tower data.
- [ ] Document the precise memory offsets and structures in this file.
- [ ] Determine how to extract this data using `DataView` natively.
