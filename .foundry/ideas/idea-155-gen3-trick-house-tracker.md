---
id: idea-155-gen3-trick-house-tracker
type: IDEA
title: Gen 3 Trick House Tracker Dashboard
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-16'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '13459690091314135888'
pr_number: null
parent: null
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Trick House Tracker Dashboard

## Context & Vision
The Trick House on Route 110 is a major recurring side-quest in Generation 3 games (Ruby, Sapphire, Emerald), consisting of eight unique puzzles that unlock progressively as the player earns Gym Badges.
Players often forget which puzzle they are currently on, whether they have picked up the prize, or if they need to fetch specific HMs/items (like Cut, Rock Smash, Strength, or Secret Power) before entering to complete the current puzzle.

We have already reverse-engineered the memory offsets for the Trick House variables in `.foundry/docs/knowledge_base/gen3_trick_house_offsets.md`.

We can build a dedicated "Trick House Tracker" component in DexHelper. It will parse the player's save file, extract the current `VAR_TRICK_HOUSE_LEVEL` and puzzle state variables, and display a helpful dashboard.

## Value Proposition
- **Convenience:** Players instantly know their Trick House progress without traveling there.
- **Preparation:** The UI can dynamically suggest which Pokémon/HMs to bring based on the current puzzle level (e.g., Level 1 requires Cut, Level 3 requires Rock Smash, etc.).
- **Completionism:** Helps players ensure they haven't missed the final Tent/Rare Candy rewards.

## Acceptance Criteria
- [ ] prd-155-524-trick-house-tracker
- [x] Product Manager: Convert this IDEA into a PRD detailing the UI layout for the Trick House Tracker and mapping the puzzle levels to the required HMs.
- [ ] Tech Lead: Define the technical tasks to extract the variables from `SaveBlock1` using the `DataView` API as per ADR 010.
