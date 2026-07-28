---
id: task-260-352-egg-move-multi-step-chains-impl
type: TASK
title: Implement Multi-Step Breeding Chains Support
status: PENDING
owner_persona: coder
created_at: '2026-07-27'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-113-260-egg-move-multi-step-chains
tags:
  - feature
  - mechanics
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Multi-Step Breeding Chains Support

## Overview
Implement the logic to evaluate complex multi-step breeding chains. Currently, `generateBreedingSuggestions` in `src/engine/assistant/generators/breedGenerator.ts` only looks at the previous step in the breeding chain. We need to expand this to traverse back through the entire chain until we find an ancestor the player already owns, and then provide a suggestion to breed that ancestor to progress down the chain.

## Context
When a Pokémon requires an egg move, the static data (`p.em[moveId]`) provides an array representing the breeding chain (e.g. `[1, 4, 7]`, meaning breed species 1 to get species 4 with the move, then breed species 4 to get species 7 with the move). If the player doesn't have species 4, but has species 1, the engine should suggest breeding species 1 to get species 4 with the egg move. Currently it only seems to look 1 step back. If the chain is 4 steps long, and the player only has the 1st step, we should suggest breeding the 1st step to get the 2nd step, prioritizing the completion of the chain.

## Contracts
- Modify `src/engine/assistant/generators/breedGenerator.ts` to traverse the `chain` array backwards completely, not just 1 step, to find the earliest ancestor the player owns.
- The suggestion should encourage breeding the owned ancestor to produce the next step in the chain.

## Acceptance Criteria
- [ ] Multi-step chains are fully traversed to find an owned ancestor.
- [ ] Suggestions indicate which owned Pokémon to breed and what the resulting intermediate offspring will be.
- [ ] Ensure O(1) in-place array mutation is maintained for performance as per Architecture Notes.
