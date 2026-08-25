---
id: epic-116-335-gen3-wallpaper-phrase-generation-engine
type: EPIC
title: Gen 3 Wallpaper Phrase Generation Engine
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-19'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '3064708840409245364'
parent: prd-116-049-gen3-pc-box-wallpaper-customizer
tags:
  - gen3
  - customization
  - algorithm
rejection_count: 0
rejection_reason: ''
---

# Gen 3 Wallpaper Phrase Generation Engine

## Objective
Implement the algorithm necessary to generate the 16 custom PC Box wallpaper unlock phrases based on a Generation 3 Trainer ID (`trainerId`).

## Context
In Generation 3 games, a player can unlock up to 16 unique PC box wallpapers by giving specific, mathematically generated phrases to the "Walda's father" NPC in Rustboro City. The phrase required for each wallpaper is determined by the player's Trainer ID. The save parsing engine already successfully extracts the `trainerId` (found in `src/engine/saveParser/parsers/common.ts` as `trainerId`). This epic focuses solely on the mathematical logic needed to convert that `trainerId` into the 16 specific phrases.

## Requirements
*   Create a pure function/utility within the Gen 3 engine (e.g., `src/engine/gen3/wallpaper/phraseGenerator.ts`).
*   The function should accept a `trainerId` (number) as input.
*   The function should return an array or object containing the 16 unique unlock phrases, ideally associated with their respective in-game wallpaper names/themes.
*   The logic must accurately replicate the in-game algorithm for phrase generation (which typically involves specific character sets and bitwise operations based on the TID).
*   Add comprehensive unit tests verifying the generated phrases against known TID/Phrase combinations to ensure accuracy.

## Dependencies
*   No strict downstream code dependencies, but requires the extracted `trainerId` from the parsed save data to function correctly when integrated.

## Acceptance Criteria
- [x] Story Owner: Break this EPIC down into actionable STORY nodes.
- [ ] story-335-473-gen3-wallpaper-phrase-generator
- [ ] story-335-474-gen3-wallpaper-phrase-generator-e2e
