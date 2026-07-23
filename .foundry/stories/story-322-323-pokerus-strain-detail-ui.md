---
id: story-322-323-pokerus-strain-detail-ui
type: STORY
title: Pokerus Strain Detail UI Component
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-14'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-112-322-pokerus-strain-ui-detail-view
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Pokerus Strain Detail UI Component

## 1. Objective
Implement the UI component for displaying the specific Pokerus strain data in the detailed view of a Pokémon.

## 2. Scope
- Update the Pokémon detail view to render the `pokerus.strain` value.
- The UI must only display the strain if the Pokémon's Pokerus status is "Infected" or "Cured".
- Ensure the presentation adheres to the "tactical hardware" aesthetic (sharp edges `rounded-none`, dashed borders `border-dashed`, monospaced telemetry fonts) as defined by ADR 008 and ADR 024.

## 3. Acceptance Criteria
- [x] Tech Lead: Break down this Story into actionable Tasks.
- [x] task-323-331-pokerus-strain-ui-impl
