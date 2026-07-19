---
id: prd-116-049-gen3-pc-box-wallpaper-customizer
type: PRD
title: Gen 3 PC Box Wallpaper Customizer
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
parent: idea-116-gen3-pc-box-wallpaper-customizer
tags:
  - gen3
  - pc-box
  - customization
  - endgame
rejection_reason: ''
rejection_count: 0
---

# Gen 3 PC Box Wallpaper Customizer

## Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald), players can unlock custom PC Box wallpapers by giving specific phrases to the "Walda's father" NPC in Rustboro City. The required phrase is uniquely mathematically tied to the player's Trainer ID, meaning players traditionally have to use external web calculators to figure out their specific phrase for each of the 16 hidden wallpapers.

## Target Audience
Gen 3 endgame players seeking full customization and completionism without relying on clunky third-party external tools to reverse-engineer their save file's hidden secrets.

## Feature Description
Leverage the parsed Trainer ID from the uploaded `.sav` file to automatically generate and display the 16 custom unlock phrases, creating a personalized "Custom Wallpaper Checklist" dashboard. By reading the Trainer ID directly from the save, DexHelper bypasses the need for manual inputs and instantly provides the precise, game-ready unlock codes to the user.

## Core Use Cases
- Generate the correct 16 phrases specific to the loaded save file's Trainer ID.
- Provide a clear, checklist-style UI to track which wallpapers the user has successfully unlocked.
- Group phrases logically by theme/category as presented in-game.

## Out of Scope
- Actually unlocking the wallpapers directly within the `.sav` file (the user must still talk to the NPC in-game; this feature strictly provides the codes).

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into actionable EPIC nodes outlining the architectural, data extraction, and UI components required to build the Customizer dashboard.
