---
id: idea-081-friendship-evolution-tracker
type: IDEA
title: Exact Friendship & Evolution Tracker
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-15'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: '2026436305007940227'
parent: null
tags:
  - gen2
  - gen3
  - companion-app
rejection_reason: ''
---

# Exact Friendship & Evolution Tracker

## The Problem
In Generation 2 and Generation 3, Friendship (also known as Happiness) is a hidden value ranging from 0 to 255. It is required for several iconic and powerful Pokémon to evolve (e.g., Togepi, Golbat, Chansey, Eevee, Pichu). In-game, the only way to check this value is by talking to specific NPCs who provide vague, tiered dialogue lines. Players often waste significant time walking around or using items, unsure exactly how close they are to the required threshold of 220.

## The Solution
Leverage DexHelper's offline-first programmatic save file parsing to extract the exact Friendship value (0-255) for all Pokémon in the player's Party and PC.

Create a dedicated "Friendship Tracker" view or overlay that:
1. Surfaces the exact numeric Friendship value and a progress bar towards the evolution threshold (220) or Return/Frustration max damage thresholds.
2. Specifically highlights Pokémon in the player's collection that evolve via Friendship, sorting them by how close they are to evolving.
3. Provides an estimated "actions needed" metric (e.g., "Needs ~1500 more steps" or "Needs 2 more vitamins").

## Why It Matters
This perfectly aligns with DexHelper's vision as a premium companion app. It takes an obtuse, high-friction, hidden mechanic and surfaces it into actionable, exact data. This eliminates the guesswork from one of the most common mid-game progression blockers, directly improving the player's experience.
