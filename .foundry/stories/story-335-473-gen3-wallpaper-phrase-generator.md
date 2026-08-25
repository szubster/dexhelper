---
id: story-335-473-gen3-wallpaper-phrase-generator
type: STORY
title: Gen 3 Wallpaper Phrase Generator Logic
status: READY
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '3064708840409245364'
parent: epic-116-335-gen3-wallpaper-phrase-generation-engine
tags:
  - gen3
  - customization
  - algorithm
rejection_count: 0
rejection_reason: ''
---

# Gen 3 Wallpaper Phrase Generator Logic

## Objective
Implement the mathematical logic to generate the 16 custom PC Box wallpaper unlock phrases based on a Generation 3 Trainer ID (`trainerId`).

## Context
In Generation 3 games, players can unlock 16 unique PC box wallpapers by giving mathematically generated phrases to an NPC in Rustboro City. The phrase required is tied directly to the player's Trainer ID. The base Epic (`epic-116-335-gen3-wallpaper-phrase-generation-engine`) outlines the need for a pure function that takes a `trainerId` and returns these 16 phrases.

## Requirements
*   Create a pure utility function within the Gen 3 engine (e.g., `src/engine/gen3/wallpaper/phraseGenerator.ts`).
*   The function must accept a `trainerId` (number) as input.
*   Implement the specific phrase generation algorithm used by the game (involving character sets and bitwise operations on the TID).
*   Return an array or object of the 16 unlock phrases, mapped to their respective wallpaper themes.
*   Include unit tests using Vitest to verify generation against known `trainerId` / phrase pairs.

## Acceptance Criteria
- [ ] Tech Lead: Draft TASK blueprints for the implementation and testing of the phrase generator.
