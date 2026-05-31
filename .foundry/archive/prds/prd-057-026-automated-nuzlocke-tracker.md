---
id: prd-057-026-automated-nuzlocke-tracker
type: PRD
title: Automated Nuzlocke Verification and Run Tracker
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-057-automated-nuzlocke-tracker
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Automated Nuzlocke Verification and Run Tracker

## Objective
Provide a built-in "Nuzlocke Tracker" mode in DexHelper to automate the tracking of encounters and deaths for players doing Nuzlocke challenge runs, leveraging existing save file parsing capabilities to eliminate manual data entry.

## Background
The Nuzlocke challenge is a popular self-imposed rule set for playing Pokémon games. The two fundamental rules are:
1. A player may only catch the *first* Pokémon encountered in each area/route.
2. If a Pokémon faints (reaches 0 HP), it is considered "dead" and must be released or placed in a designated "Graveyard" PC box.
Currently, players track this information manually using spreadsheets or third-party web apps. DexHelper, with its deep save file introspection, can automate this process.

## Core Features

1. **Automated Route Tracking:**
   - DexHelper must iterate over all caught Pokémon in the save file (Party and PC) and aggregate them by their `met_location`.
   - It should identify the first catch for every distinct location.
   - It should flag a violation if multiple Pokémon share the same `met_location`, indicating the player caught more than one Pokémon in that area.

2. **Automated Death Tracking:**
   - Detect Pokémon currently at 0 HP (fainted in the party).
   - Allow users to designate a specific PC Box as the "Graveyard". Any Pokémon placed in this box is permanently considered dead, regardless of its HP.
   - Display these Pokémon visually distinct (e.g., greyscale or with a tombstone icon) in the UI.

3. **Run Dashboard UI:**
   - A dedicated dashboard view showing:
     - The current "Alive" team.
     - A checklist of visited routes and what was caught there.
     - A list of unvisited available routes (based on story progress/game).
     - The Graveyard (list of dead Pokémon).

## Out of Scope
- Enforcing the rules in-game (we cannot edit the game ROM or save to prevent actions).
- "Species Clause" tracking (ignoring duplicate species across different routes) in the initial v1.
- Randomizer tracking (assuming vanilla game routes).

## Next Steps
- [x] Architect: Produce an Architecture Decision Record (ADR) detailing the technical implementation of this feature.
- ADR: .foundry/docs/adrs/012-automated-nuzlocke-tracker.md

- Epic: .foundry/epics/epic-026-034-automated-nuzlocke-tracker.md
