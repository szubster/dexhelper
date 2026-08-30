---
id: idea-431-gen2-unown-tracker
type: IDEA
title: Gen 2 Unown Dex Tracker & Ruins of Alph Guide
status: READY
owner_persona: product_manager
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - unown
  - ruins-of-alph
  - tracker
  - gen2
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 2 Unown Dex Tracker & Ruins of Alph Guide

## Context
In Generation 2 (Gold, Silver, Crystal), catching all 26 Unown forms is a major side quest in the Ruins of Alph that unlocks the Unown Dex upgrade and a Game Boy Printer feature.
However, the game provides very little guidance. To spawn specific groups of Unown letters, players must solve four distinct slide puzzles hidden in different chambers. Often, players catch a few Unown, forget which puzzles they've solved, and wander aimlessly trying to find the missing letters, unaware that those specific letters haven't even been unlocked in the spawn tables yet.

## Proposal
Introduce a "Gen 2 Unown Dex Tracker" dashboard in DexHelper to completely demystify the Ruins of Alph sidequest.

1. **Unown Collection Status:**
   - Parse the player's PC Boxes and Party to determine exactly which of the 26 Unown forms they have already secured.
   - Display a visual grid of all 26 letters, highlighting the missing ones.

2. **Ruins of Alph Puzzle Radar:**
   - Read the save file event flags for the four slide puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte).
   - If a player is missing a specific Unown letter (e.g., 'A'), cross-reference it with the unlock requirements. If the required puzzle hasn't been solved, explicitly prompt the player: "To find Unown A, you must first solve the Kabuto puzzle in the Northeast chamber."

## Value Proposition
- **Removes Guesswork:** Prevents players from grinding encounters in the Ruins of Alph for letters that physically cannot spawn yet.
- **Actionable Guidance:** Turns a passive checklist into an active guide by pointing the player directly to the required puzzles they missed.
- **Premium Utility:** Solves a highly specific, notoriously opaque retro game mechanic, perfectly aligning with DexHelper's vision.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD specifying the dashboard layout, the specific event flags for the 4 slide puzzles, and the mapping of Unown letters to their required puzzle unlocks.
