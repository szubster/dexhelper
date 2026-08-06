---
id: idea-136-automated-boss-level-cap-tracker
type: IDEA
title: Automated Boss Level Cap Tracker
status: READY
owner_persona: product_manager
created_at: '2026-08-06'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - nuzlocke
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Automated Boss Level Cap Tracker

## Context
A ubiquitous rule in the Nuzlocke community is "Level Caps"—players restrict themselves from leveling their Pokémon higher than the ace Pokémon of the next Gym Leader or major boss fight before the battle begins. If a Pokémon accidentally exceeds this level, it is often considered unusable for that fight. Tracking this requires constantly cross-referencing external resources like wikis to check what the next boss's level cap is and diligently watching EXP gains in battle.

## Proposal
Leverage DexHelper's capability to read event flags and current party state to build an "Automated Boss Level Cap Tracker".
- **Dynamic Progression Detection:** Parse the save file's event flags (e.g., badges earned, specific story events completed) to automatically determine the player's current progression state and identify the upcoming boss fight.
- **Level Warning System:** Cross-reference the identified next boss's level cap against the exact EXP points of the player's current party members.
- **UI Dashboard:** Create an overlay or dashboard that clearly displays the next boss's level cap, the player's current party levels, and visual warnings (e.g., yellow, red) when a Pokémon in the party is dangerously close to exceeding the cap.

## Value Proposition
This directly complements the existing Automated Nuzlocke Tracker (IDEA-057) by addressing another major pain point in challenge runs. By surfacing this hidden progression context and cross-referencing it with the player's current party, DexHelper eliminates the need for manual tracking and external wikis, providing significant value and peace of mind for the hardcore player base.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD defining the event flag mapping for Gen 1-3 boss progression and the UI for level cap warnings.
