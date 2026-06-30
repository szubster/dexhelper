---
id: idea-097-gen1-safari-zone-step-counter
type: IDEA
title: "Gen 1 Safari Zone Step & Safari Ball Tracker"
status: PENDING
owner_persona: "product_manager"
created_at: "2026-07-02"
updated_at: "2026-07-02"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen1
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 1 Safari Zone Step & Safari Ball Tracker

## Problem
In Generation 1 (Red/Blue/Yellow), the Safari Zone is a high-stress area. Players pay to enter and are given 30 Safari Balls and a strict limit of 500 steps. The game only displays your remaining steps and balls on a pause menu or when you throw a ball, making it stressful to optimize your pathing to reach rare items (like the Gold Teeth or Surf HM) or rare Pokémon encounters (Chansey, Tauros) before time runs out.

## Solution
Leverage DexHelper's save parsing to create a real-time Safari Zone Tracker.

By identifying the memory offsets for the Safari Zone step counter and Safari Ball inventory in the Gen 1 save structure, we can extract these exact values whenever the save file updates.

We can build a dashboard (or a small overlay in the UI) that:
1.  **Live Countdown:** If running in "live sync" mode, it displays the exact number of steps remaining and Safari Balls left without the player needing to pause the game.
2.  **Path Optimization Warning:** Warns the player if their remaining steps are dangerously low to safely exit or reach a known required item location.

## Why it matters
The Safari Zone is notorious for being anxiety-inducing due to the hidden limitations. By surfacing these critical numbers directly in the companion app, we remove the friction of constantly checking the menu, allowing players to focus entirely on their pathing and encounters. This aligns perfectly with DexHelper's vision of turning opaque game data into actionable, premium QoL features for retro players.
