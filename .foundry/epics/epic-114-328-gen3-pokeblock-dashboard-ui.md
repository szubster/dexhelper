---
id: epic-114-328-gen3-pokeblock-dashboard-ui
type: EPIC
title: Gen 3 Pokéblock Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-04'
depends_on:
  - epic-114-327-gen3-pokeblock-case-parsing
jules_session_id: null
pr_number: null
parent: prd-113-114-gen3-pokeblock-stats-viewer
tags:
  - gen3
  - contests
  - pokeblocks
  - frontend
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Pokéblock Dashboard UI

## Overview
This Epic handles the creation of a frontend dashboard to visualize the player's Pokéblock inventory, revealing exact flavor and feel values to help optimize Contest strategy.

## Goals
- Create a dashboard UI listing all Pokéblocks currently in the player's Pokéblock Case.
- Display exact levels for Cool, Beauty, Cute, Smart, Tough, and exact Feel values for each block.
- Ensure the UI components adhere to the tactical hardware aesthetic constraints (ADR 024, ADR 008).
- Consume the parsed Pokéblock data from the backend.

## Acceptance Criteria
- [ ] Break down this Epic into STORY nodes for frontend components and state integration.
- [ ] Create a STORY node dedicated exclusively to Integration and E2E Verification of the dashboard UI.
