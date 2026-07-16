---
id: idea-115-gen3-fame-checker-assistant
type: IDEA
title: Gen 3 Fame Checker Progress & Assistant
status: PENDING
owner_persona: product_manager
created_at: '2026-07-13'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - firered
  - leafgreen
  - fame-checker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Fame Checker Progress & Assistant

## Problem
In Pokémon FireRed and LeafGreen, the Fame Checker is a unique Key Item used to record information and lore about prominent NPCs (Gym Leaders, Elite Four members, etc.). Unlocking all the entries is required to fully complete the game, but tracking progress is incredibly tedious. Each NPC has exactly 6 lore entries, and unlocking them requires talking to obscure NPCs scattered across the entire map, interacting with random bookshelves or objects, or winning specific battles. Because the in-game UI only shows you what you *have* found, players who are missing 1 or 2 entries for a character often have to resort to reading dense external wikis and physically revisiting every single location to guess which one they missed.

## Solution
Leverage the DexHelper save parsing engine to read the hidden event flags associated with the Fame Checker progress. By extracting exactly which entries the player has unlocked for each NPC, we can create an actionable dashboard. Instead of showing the player what they already know, the dashboard will explicitly tell them *what* they are missing and *exactly where* to go in their specific save file to find it. This perfectly aligns with our vision of a premium companion app: replacing tedious backtracking and wiki lookups with targeted, dynamically generated to-do lists based on their actual save state.

## Acceptance Criteria
- [x] Create PRD
- [ ] prd-115-115-gen3-fame-checker-assistant
