---
id: task-560-583-gen3-berry-pouch-parsing-impl
type: TASK
title: Implement Gen 3 Berry Pouch Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-09-16T19:32:29Z'
updated_at: '2026-09-23'
depends_on: []
jules_session_id: '358631191991424086'
pr_number: null
parent: story-540-560-gen3-berry-pouch-and-pokemon-parsing
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

# Implement Gen 3 Berry Pouch Parsing

## 1. Context & Problem Statement
To build the Pokéblock Recipe Optimizer, we first need to extract the current state from the Gen 3 save file. We need the player's Berry inventory. This task focuses specifically on the berry pouch parsing logic.

## 2. Solution Overview
Implement backend save parsing logic to accurately read the Gen 3 berry pouch inventory.

## Acceptance Criteria
- [ ] Implement backend save parsing logic to accurately read the Gen 3 berry pouch inventory.
- [ ] Adhere to the PokeData Property Naming Schema (full, readable property names).
- [ ] Pass and utilize the resolved section offset (e.g., `section1Offset`) to support A/B bank flash memory architecture.
