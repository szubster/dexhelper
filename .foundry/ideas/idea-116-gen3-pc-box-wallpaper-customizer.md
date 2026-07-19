---
id: idea-116-gen3-pc-box-wallpaper-customizer
type: IDEA
title: Gen 3 PC Box Wallpaper Customizer
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: '3496458588510753835'
parent: null
tags:
  - gen3
  - pc-box
  - customization
  - endgame
rejection_reason: ''
rejection_count: 1
---

# Gen 3 PC Box Wallpaper Customizer

## Description
In Generation 3 (Ruby, Sapphire, Emerald), players can unlock custom PC Box wallpapers by giving specific phrases to the "Walda's father" NPC in Rustboro City. The required phrase is uniquely mathematically tied to the player's Trainer ID, meaning players traditionally have to use external web calculators to figure out their specific phrase for each of the 16 hidden wallpapers.

By directly reading the Trainer ID from the uploaded Gen 3 save file, DexHelper can instantly calculate and display the 16 exact custom phrases the player needs to input in-game to unlock all hidden wallpapers. This perfectly embodies the "premium companion app" philosophy by turning static save data into highly actionable, personalized insights, saving the player from manually looking up algorithms and external tools.

## Problem Statement
Players want to unlock all custom PC box wallpapers in Gen 3 but the phrase generation algorithm is complex and tied to their hidden Trainer ID, forcing them to use external calculators.

## Solution
Leverage the parsed Trainer ID from the uploaded `.sav` file to automatically generate and display the 16 custom unlock phrases, creating a personalized "Custom Wallpaper Checklist" dashboard.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD to formalize the feature and assign it to an epic for tracking.
