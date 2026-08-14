---
id: epic-340-421-pal-park-dashboard-ui
type: EPIC
title: Pal Park Migration Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on:
  - epic-340-420-pal-park-core-engine
jules_session_id: null
pr_number: null
parent: prd-132-340-gen3-pal-park-migration-planner
tags:
  - feature
  - gen3
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Pal Park Migration Dashboard UI

## Objective
Build the user interface for the Pal Park Migration Planner, including the Source Box View, Migration Queue, and Action Bar.

## Scope
- **Source Box View (Left Panel):** Display a grid mirroring the in-game Gen 3 PC Boxes. Users can select a Box from a dropdown and click individual Pokémon to flag them for migration. Flagged Pokémon will have a distinct visual border or icon.
- **Migration Queue (Right Panel):** Display a scrollable list of "Batches" (6 slots each). Populate automatically as Pokémon are flagged. Display Pokémon sprite, nickname, Box/Slot location, and icons indicating held item status and HM validation status (with tooltip for HM details).
- **Action Bar (Bottom):** Controls to "Clear Queue" and "Export Checklist".

## Acceptance Criteria
- [ ] Story Owner: Break this Epic down into detailed STORY nodes.
- [ ] Orchestrator Safeguard: You MUST enforce a process where every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.
