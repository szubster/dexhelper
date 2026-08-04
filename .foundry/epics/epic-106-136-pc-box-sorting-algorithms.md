---
id: epic-106-136-pc-box-sorting-algorithms
type: EPIC
title: PC Box Sorting Algorithms
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-06'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '3643361663995110553'
pr_number: null
parent: prd-101-106-pc-box-organization-assistant
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - sorting
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Epic: PC Box Sorting Algorithms

## Objective
Implement reusable sorting strategies (e.g., National Dex order, Type, Level, etc.) that will output the proposed optimal layout for PC Boxes across Generation 1, 2, and 3 games. These algorithms will form the target state for the diff engine.

## Features
1. **Sorting Logic Interface:** Define a standard interface or pattern for sorting Pokémon.
2. **Standard Strategies:** Implement basic sorting (National Dex, Regional Dex, Level ascending/descending, Primary Type).
3. **Cross-Generation Compatibility:** Ensure the sorting logic works correctly with Gen 1, Gen 2, and Gen 3 `PokeData` structures.

## Acceptance Criteria
- [x] Break down epic into stories for the standard interface and base implementations.
- [x] Break down epic into stories for standard strategies (Dex, Level, Type).
- [x] Break down epic into stories for Gen 1, Gen 2, and Gen 3 specific considerations and tests.
- [x] story-136-294-sorting-interface-base
- [x] story-136-295-sorting-standard-strategies
- [x] story-136-296-sorting-cross-gen-considerations

- [ ] research-136-330-investigate-sorting-strategies-failure
- [ ] story-136-333-sorting-standard-strategies-retry
- [ ] story-136-334-sorting-cross-gen-considerations-retry
