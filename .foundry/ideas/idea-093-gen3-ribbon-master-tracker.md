---
id: idea-093-gen3-ribbon-master-tracker
type: IDEA
title: Gen 3 Ribbon Master Challenge Tracker
status: READY
owner_persona: product_manager
created_at: '2026-06-30'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: null
parent: null
tags:
  - gen3
  - save-engine
  - endgame
  - completionist
rejection_reason: ''
---

# Gen 3 Ribbon Master Challenge Tracker

## Problem
A popular and incredibly demanding challenge in the hardcore Pokémon community is the "Ribbon Master" challenge, where a player attempts to collect every single obtainable Ribbon on a single Pokémon. In Generation 3, this includes 27 different Ribbons (League, Contests, Battle Tower, Mt. Battle in GC games, etc.). Tracking this across the in-game UI is extremely tedious, as players must manually flip through the summary screens of their Pokémon. Furthermore, it's very easy to accidentally miss a Ribbon before migrating the Pokémon to a newer generation, permanently failing the challenge.

## Proposed Solution
Create a dedicated "Ribbon Master Dashboard" that leverages our programmatic save parsing engine.

Features should include:
- A clear, visual checklist for any Pokémon in the PC or party, showing which of the Gen 3 Ribbons they have obtained and which are missing.
- "Challenge Ready" indicators that cross-reference the Pokémon's current stats (e.g., Level, Contest Condition) to see if they meet the prerequisites for the missing Ribbons (like the Level 50 Battle Tower Ribbon).
- Warnings for "point of no return" actions, such as preventing a player from assuming a Pokémon is ready to transfer out of Gen 3 if it is still missing available Ribbons.

This aligns perfectly with DexHelper's vision as a premium companion app by taking an obtuse, multi-faceted endgame goal and turning it into an actionable, tracked dashboard that prevents high-friction failures.
