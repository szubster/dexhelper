---
id: epic-112-322-pokerus-strain-ui-detail-view
type: EPIC
title: Pokerus Strain UI Tracker - Detail View
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-13'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-107-112-pokerus-strain-ui-tracker
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Epic: Pokerus Strain UI Tracker - Detail View

## 1. Objective
Implement the UI presentation layer to display the specific Pokerus strain data in the detailed view of a Pokémon, allowing users to track the strain of infected or cured Pokémon.

## 2. Prerequisites
- The underlying engine must correctly parse out the "days remaining" and "strain" (0-15) of the Pokerus infection (completed via ADR 026 and `parsePokerus` in `common.ts`).

## 3. Scope
- Modify the detailed view component of a specific Pokémon to render the `pokerus.strain` value.
- The UI must only display the strain if the Pokémon is currently "Infected" or "Cured".
- Ensure the presentation adheres to the "tactical hardware" aesthetic (sharp edges `rounded-none`, dashed borders `border-dashed`, monospaced telemetry fonts) as defined by ADR 008 and ADR 024.

## 4. Dependencies
None.

## 5. Acceptance Criteria
- [x] Story Owner: Break down this Epic into actionable Stories.
- [ ] story-322-323-pokerus-strain-detail-ui
