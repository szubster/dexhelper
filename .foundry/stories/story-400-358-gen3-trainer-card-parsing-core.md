---
id: story-400-358-gen3-trainer-card-parsing-core
type: STORY
title: Story - Gen 3 Trainer Card Data Parsing Core
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-05'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '7407366660319062198'
pr_number: null
parent: epic-111-400-gen3-trainer-card-data-extraction
tags:
  - feature
  - gen3
  - achievements
  - completionist
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Trainer Card Data Parsing Core

## Description
Implement the core parsing logic to extract the Gen 3 Trainer Card upgrade data from the save file. This includes Hall of Fame status, Pokédex catch counts, Contest Master Ranks, and Battle Frontier Gold Symbols. Ensure strict adherence to the schema guidelines.

## Acceptance Criteria
- [x] Parse Hall of Fame flag.
- [x] Parse Hoenn Pokédex catch count (must be exactly 202).
- [x] Parse National Pokédex catch count (must be exactly 386).
- [x] Parse Contest Master Rank flags (Cool, Beauty, Cute, Smart, Tough).
- [x] Parse Battle Frontier Gold Symbols flags.
- [x] Verify the implementation's exact alignment with the documentation schemas (e.g., Section 13 of .foundry/docs/schema.md) before marking tasks complete.
- [x] research-358-406-gen3-trainer-card-offsets
- [x] task-358-424-gen3-pokedex-hof-parsing-impl
- [x] task-358-425-gen3-pokedex-hof-parsing-qa
- [x] task-358-426-gen3-contest-museum-parsing-impl
- [x] task-358-427-gen3-contest-museum-parsing-qa
- [x] task-358-428-gen3-battle-frontier-parsing-impl
- [x] task-358-429-gen3-battle-frontier-parsing-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
