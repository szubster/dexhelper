---
id: idea-097-gen3-nuzlocke-route-tracker
type: IDEA
title: "Gen 3 Nuzlocke Route Tracker"
status: PENDING
owner_persona: "product_manager"
created_at: "2026-07-01"
updated_at: "2026-07-01"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - nuzlocke
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Nuzlocke Route Tracker

## Problem
The Nuzlocke challenge is the most popular community-driven way to play retro Pokémon games. A core rule is "you can only catch the first Pokémon encountered on each route/area." Currently, players track this manually in spreadsheets or external web apps, which is tedious, error-prone, and breaks immersion. If a player forgets to log an encounter or misremembers, their run's integrity is compromised.

## Solution
Leverage DexHelper's programmatic save parsing to create an automated Nuzlocke Route Tracker.

The `PokemonInstance` data structure in our save parser explicitly extracts `caughtData.location` (the met location) for every Pokémon. By scanning all Pokémon in the player's active Party (`partyDetails`) and PC Boxes (`pcDetails`), we can compile a comprehensive list of all locations where a Pokémon has successfully been obtained on that save file.

We can then present a unified Nuzlocke Dashboard that:
1. Lists all valid encounter locations in the game (based on our static `PokeData` mapping).
2. Automatically crosses off or marks as "Caught" any location that appears in the aggregated `caughtData.location` list.
3. Highlights remaining available routes.
4. (Optional) Handles edge cases like "Fainted/Failed" encounters with a manual toggle stored in IndexedDB or a separate state file, while keeping the "Caught" status 100% automated from the save.

## Why it matters
This transitions DexHelper from a simple viewer into a specialized, state-aware companion app for the largest segment of the hardcore playerbase. It replaces tedious manual tracking with absolute programmatic certainty.
