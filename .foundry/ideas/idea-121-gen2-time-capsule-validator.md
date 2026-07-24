---
id: idea-121-gen2-time-capsule-validator
type: IDEA
title: Gen 2 Time Capsule Compatibility Validator
status: CANCELLED
owner_persona: product_manager
created_at: '2026-07-23'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: "Time Capsule is already supported, idea is obsolete."
notes: ""
---

# Idea: Gen 2 Time Capsule Compatibility Validator

## Problem
In Generation 2 games (Gold, Silver, Crystal), the "Time Capsule" allows players to trade Pokémon back to Generation 1 (Red, Blue, Yellow). However, this feature is highly restrictive: Pokémon must not exist exclusively in Gen 2, and they cannot know any moves introduced in Gen 2. Players often spend hours manually cross-referencing Pokédex entries and move lists to figure out which of their Pokémon are eligible to trade back.

## Proposed Solution
Create a "Time Capsule Compatibility Validator" dashboard in DexHelper.
1. The app parses the player's Gen 2 save file (party and PC boxes) to extract Pokémon species and their current movesets.
2. It compares each Pokémon against a static dataset of Gen 1 species IDs and Gen 1 move IDs.
3. The UI will display a list of all Pokémon, highlighting which ones are "Time Capsule Ready", which ones have invalid moves (with actionable suggestions to use the Move Deleter), and which ones are entirely ineligible (Gen 2 exclusive species).

This perfectly aligns with DexHelper's vision as a premium companion app by turning a complex, opaque cross-generation mechanic into a clear, actionable UI dashboard, saving players significant manual effort.
