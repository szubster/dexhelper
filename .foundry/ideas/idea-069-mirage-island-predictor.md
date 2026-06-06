---
id: idea-069-mirage-island-predictor
type: IDEA
title: Gen 3 Mirage Island Predictor
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-02'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: '4766839389400114325'
parent: null
tags:
  - gen3
  - mirage-island
  - rng
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Mirage Island Predictor

## Problem
In Pokémon Ruby, Sapphire, and Emerald (Gen 3), accessing Mirage Island requires the lower two bytes of a Pokémon's Personality Value (PID) in the player's party to match a random 2-byte value generated daily. Because the daily value is completely hidden and players typically have hundreds of Pokémon sitting in their PC boxes, manually checking each Pokémon by moving them to the party and speaking to the old man in Pacifidlog Town is an extremely tedious, high-friction process. As a result, most players never experience this rare event.

## Proposed Solution
Leverage DexHelper's programmatic offline-first save file parsing to automatically cross-reference the daily Mirage Island random value against the PIDs of **all** Pokémon currently owned by the player (both in the active party and across all PC storage boxes).

The application would instantly surface a notification or dedicated tracker view indicating whether the player currently possesses a "Mirage Island Key" Pokémon for the current day. If a match is found, it would highlight exactly which Pokémon it is and which PC Box it resides in, transforming a frustrating brute-force mechanic into a rewarding, seamless discovery.

This aligns perfectly with DexHelper's vision as a premium companion app that surfaces hidden state to eliminate tedious manual gameplay loops, similarly to the Gen 3 Feebas Tile Predictor and Gen 2 Shiny Carrier ideas.

## Generated Nodes
- .foundry/prds/prd-069-038-mirage-island-predictor.md
