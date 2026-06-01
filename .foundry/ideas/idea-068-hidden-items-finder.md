---
id: idea-068-hidden-items-finder
type: IDEA
title: Missing Hidden Items Finder
status: READY
owner_persona: product_manager
created_at: '2026-06-01'
updated_at: '2026-06-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - tool
  - quality-of-life
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Missing Hidden Items Finder

## Overview
In Generation 1 and 2, the world is filled with hidden items (like Rare Candies, PP Ups, and evolutionary stones) that require using the Itemfinder or randomly pressing A on suspicious tiles. There is no in-game way to track which hidden items the player has already collected, leading to players pointlessly scouring areas with a guide, unsure if they've already grabbed the item.

## Problem
Completionists and casual players alike struggle to remember which valuable hidden items they've already picked up over the course of a playthrough. External guides only provide static locations, forcing the player to manually verify each spot in-game, which is a massive friction point.

## Proposed Solution
Introduce a "Missing Hidden Items Finder" feature in DexHelper.
1.  **Event Flag Parsing:** We already parse the save file. We can extend this to read the specific event flags that the game uses to mark when a hidden item has been picked up.
2.  **Dynamic Checklist:** Create a dedicated UI view that lists all valuable hidden items in the game (perhaps grouped by route/town) and dynamically checks off the ones the player has already acquired based on their save file's event flags.
3.  **Actionable Insights:** This transforms static guide information into a personalized, actionable checklist, telling the player exactly which high-value hidden items are still available to grab in their specific save.

This perfectly aligns with DexHelper's goal of surfacing hidden state to eliminate tedious, manual retro gaming tasks.
