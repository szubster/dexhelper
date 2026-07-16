---
id: adr-012-automated-nuzlocke-tracker
type: ADR
title: Automated Nuzlocke Tracker Architecture
status: COMPLETED
owner_persona: architect
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 012: Automated Nuzlocke Tracker Architecture

## Status
Accepted

## Context
We need to implement an Automated Nuzlocke Tracker within DexHelper to automate the tracking of encounters and deaths for players doing Nuzlocke challenge runs.

## Decision
1. **Automated Route Tracking**: We will aggregate caught Pokémon in the save file (both Party and PC) by their `met_location`.
2. **First Encounter Identification**: We will identify the first catch for every distinct location.
3. **Violation Flagging**: We will flag a violation if multiple Pokémon share the same `met_location` (excluding in-game gifts or static encounters if applicable).
4. **Death Tracking**: Pokémon in the party with 0 HP will be considered "dead". Additionally, we will introduce a UI setting to designate a specific PC Box as the "Graveyard". Any Pokémon in this box will be permanently marked as dead.
5. **Run Dashboard UI**: A dashboard view will show the alive team, visited routes, unvisited routes, and the graveyard.
6. **Out of Scope**: In-game rule enforcement, Species Clause, and Randomizer tracking are excluded for v1.

## Consequences
- **Positive**: Automates manual entry for Nuzlocke players.
- **Negative**: Relies entirely on save data post-catch, meaning players must check the app to see if they've already encountered something on a route.
