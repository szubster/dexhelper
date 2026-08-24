---
id: idea-420-gen2-headbutt-tree-predictor
type: IDEA
title: Gen 2 Headbutt Tree Predictor
status: READY
owner_persona: product_manager
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen2
  - tracking
  - utility
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 2 Headbutt Tree Predictor

## Context & Problem
In Generation 2 (Gold, Silver, Crystal), the move Headbutt can be used on certain trees in the overworld to trigger encounters with wild Pokémon. A subset of these trees are designated as "rare" trees, which have a significantly higher chance of yielding rare encounters, and are the only way to encounter specific Pokémon such as Heracross and Pineco in certain areas.

Crucially, the exact trees that are designated as "rare" vary from player to player. The game calculates the coordinates of these rare trees mathematically based on the player's Trainer ID. For a player looking to catch Heracross or farm Pineco for early-game items, finding a rare tree requires tedious, blind trial-and-error headbutting across multiple routes, wasting significant time.

## Proposed Solution
Leverage DexHelper's save file parsing capabilities to extract the player's Trainer ID from Gen 2 (`.sav`) files. Using the known mathematical formula used by the game engine, DexHelper will predict and calculate the exact coordinates of the rare Headbutt trees on each route for that specific player.

The DexHelper UI will provide a "Headbutt Tree Predictor" view, featuring map overlays of key routes (e.g., Route 33, Route 44, Azalea Town) that explicitly highlight the exact rare trees the player should interact with, completely eliminating the trial-and-error process.

## Value Proposition
This perfectly aligns with DexHelper's vision of being a premium companion app that surfaces hidden state to eliminate tedious manual gameplay loops. It functions similarly to the Gen 3 Feebas Tile Predictor and Gen 3 Mirage Island Predictor, empowering the player with actionable insights.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD outlining the mathematical calculation requirements and the UI map overlay specifications.
- [ ] Tech Lead: Define the technical tasks to extract Trainer ID and implement the coordinate mapping logic.
