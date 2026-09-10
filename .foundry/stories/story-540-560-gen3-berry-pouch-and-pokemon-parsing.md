---
id: story-540-560-gen3-berry-pouch-and-pokemon-parsing
type: STORY
title: Gen 3 Berry Pouch and Pokémon Parsing Logic
status: READY
owner_persona: tech_lead
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-518-540-gen3-pokeblock-recipe-optimizer
tags:
  - dexhelper
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Berry Pouch and Pokémon Parsing Logic

## 1. Context & Problem Statement
To build the Pokéblock Recipe Optimizer, we first need to extract the current state from the Gen 3 save file. We need the player's Berry inventory, the target Pokémon's current condition stats (Cool, Beauty, Cute, Smart, Tough, Feel), and the Pokémon's Nature.

## 2. Solution Overview
Implement backend save parsing logic to accurately read the Gen 3 berry pouch inventory and extract a Pokémon's current condition stats and Nature.

## Acceptance Criteria
- [ ] Implement backend save parsing logic to accurately read the Gen 3 berry pouch inventory.
- [ ] Implement backend save parsing logic to accurately read a Pokémon's current condition stats and Nature.
