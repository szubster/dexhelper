---
id: idea-521-gen2-alph-ruins-puzzle-tracker
type: IDEA
title: Gen 2 Ruins of Alph Puzzle Tracker
status: READY
owner_persona: product_manager
created_at: "2026-09-11"
updated_at: "2026-09-11"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen2
  - unown
  - ruins-of-alph
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---

# Idea: Gen 2 Ruins of Alph Puzzle Tracker

## Context
In Generation 2 (Gold, Silver, Crystal), the Ruins of Alph contain four separate slide puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte). Solving these puzzles unlocks different groups of Unown in the main ruins chamber. Additionally, behind each puzzle room is a secret hidden chamber that requires a specific item/action (Escape Rope, Flash, Water Stone, Ho-Oh in party) to open, rewarding the player with rare items.

While `idea-119-gen2-unown-dex-tracker` proposes tracking the Unown caught, there is currently no feature that surfaces which of the four puzzle chambers have been solved, and more importantly, which of the four hidden item rooms have been opened and looted.

## Proposal
Create a "Ruins of Alph Puzzle Tracker" for Gen 2 saves.
1. **Event Flag Parsing:** DexHelper will read the specific event flags in the save file associated with solving each of the four slide puzzles.
2. **Hidden Room Tracking:** DexHelper will also check the flags for the four secret chambers behind the puzzles, indicating whether the player has unlocked them.
3. **Interactive UI:** Present a visual map or checklist of the four puzzle chambers.
   - For unsolved puzzles, display the requirement to access them (e.g., "Requires Surf to reach the Aerodactyl puzzle").
   - For solved puzzles with locked secret rooms, hint at the required action to open them (e.g., "Hint: Bring a Water Stone to the Omanyte chamber").

## Value Proposition
The secret rooms in the Ruins of Alph are highly obscure, and players often forget which ones they have completed or lack the specific HM/item to unlock them when they first discover the puzzles. This feature directly helps completionists by parsing the hidden state flags and guiding them to missed rare items and puzzle milestones.

## Acceptance Criteria
- [ ] prd-521-522-gen2-alph-ruins-puzzle-tracker
