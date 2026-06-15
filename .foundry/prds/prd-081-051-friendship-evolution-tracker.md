---
id: prd-081-051-friendship-evolution-tracker
type: PRD
title: Exact Friendship & Evolution Tracker
status: READY
owner_persona: epic_planner
created_at: '2026-06-15'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
parent: idea-081-friendship-evolution-tracker
tags:
  - gen2
  - gen3
  - companion-app
rejection_reason: ''
---

# Exact Friendship & Evolution Tracker

## Target Users
Pokémon players playing Generation 2 or Generation 3 who are trying to evolve Pokémon that require high Friendship (Happiness), or maximize the power of the moves Return and Frustration.

## Value Proposition
Removes the guesswork and tedious NPC checking from the Friendship mechanic. By reading the save file, we can give players the exact number (0-255) and tell them precisely how many more actions (steps, vitamins, etc.) they need, saving them time and frustration.

## Requirements

### 1. Data Extraction
- Must accurately read the Friendship value (0-255) for all Pokémon in the player's active Party.
- Must accurately read the Friendship value (0-255) for all Pokémon stored in the PC Boxes.
- Support both Generation 2 (Gold, Silver, Crystal) and Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen) save formats.

### 2. Friendship Tracker UI
- **Numeric Display:** Show the exact Friendship value (e.g., "195 / 255").
- **Progress Bar:** Visually represent progress towards the key threshold of 220 (the minimum required for Friendship evolution).
- **Return/Frustration Power:** Display the calculated base power for the moves Return and Frustration based on the current Friendship value.
- **Filtering & Sorting:** Allow users to filter their collection to show *only* Pokémon that evolve via Friendship (e.g., Eevee, Togepi, Golbat, Chansey). Sort this list by how close they are to evolving.

### 3. Actionable Insights ("Actions Needed")
- Provide concrete estimates for how to reach 220 Friendship from the current value.
- Example: "Needs ~25 more Vitamins" or "Needs ~2,500 more steps (with Soothe Bell)".

## Out of Scope
- Modifying the save file to artificially increase Friendship.
- Tracking Friendship in Generation 1 (as the mechanic did not exist in the same way, except for Pikachu in Yellow, which is tracked separately).

## Acceptance Criteria
- [ ] Read Friendship data from Generation 2 save files (Party and PC).
- [ ] Read Friendship data from Generation 3 save files (Party and PC).
- [ ] Implement UI to display exact Friendship value and progress bar.
- [ ] Implement UI to calculate and display Return/Frustration base power.
- [ ] Implement filtering for Pokémon that evolve via Friendship.
- [ ] Provide estimated "actions needed" to reach the 220 threshold.
