---
id: epic-114-401-gen3-pokeblock-dashboard-ui-retry
type: EPIC
title: Gen 3 Pokéblock Exact Stats Viewer Dashboard UI
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-05'
updated_at: '2026-10-19'
depends_on:
  - epic-114-400-gen3-pokeblock-case-parsing-retry
jules_session_id: null
pr_number: null
parent: prd-113-114-gen3-pokeblock-stats-viewer
tags:
  - gen3
  - contests
  - pokeblocks
  - frontend
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Pokéblock Exact Stats Viewer Dashboard UI

## Context
As defined in `prd-113-114-gen3-pokeblock-stats-viewer`, we need a dedicated dashboard to visualize the exact flavor and feel stats of Pokéblocks extracted from the player's save file. This epic depends on the successful parsing of the Pokéblock Case (`epic-114-400-gen3-pokeblock-case-parsing-retry`).

## Acceptance Criteria
- [x] Create a new dashboard route and main component for the Pokéblock Viewer.
- [x] Design and implement UI components adhering to the tactical hardware/snooping aesthetic (ADR 024, ADR 008).
- [x] Display a comprehensive list of all Pokéblocks in the inventory.
- [x] For each Pokéblock, clearly display the exact level for all five flavors (Cool, Beauty, Cute, Smart, Tough) and its Feel value.
- [x] Ensure responsive design and accessibility for the new views.
- [ ] story-401-679-pokeblock-viewer-route
- [ ] story-401-680-pokeblock-viewer-components
- [ ] story-401-681-pokeblock-viewer-e2e
