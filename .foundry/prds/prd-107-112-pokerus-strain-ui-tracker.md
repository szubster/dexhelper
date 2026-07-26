---
id: prd-107-112-pokerus-strain-ui-tracker
type: PRD
title: Pokerus Strain Specific UI Tracker
status: READY
owner_persona: epic_planner
created_at: '2026-07-12'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: '804269472408404809'
pr_number: null
parent: idea-107-pokerus-strain-ui-tracker
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Product Requirements Document: Pokerus Strain Specific UI Tracker

## 1. Problem Statement
With the standardization of bitwise extraction for Pokerus (`parsePokerus` in `common.ts`) across all generations (Gen 2, Gen 3), our engine now accurately parses out both the "days remaining" and the specific "strain" (0-15) of the Pokerus infection.

Currently, the UI only displays whether a Pokémon is "Infected" or "Cured". It does not surface the specific strain data. By exposing the distinct strain (e.g., Strain A, Strain B, Strain 1, Strain 2, or just the raw numeric value 1-15), we can give players a fun, gamified way to track the lineage of an infection as it spreads through their party or PC boxes.

## 2. Target Audience
- Nuzlockers and hardcore players who want deep insights into their save file data.
- Completionists or curious players who want to trace the origin/spread of Pokerus.

## 3. Scope & Requirements

### 3.1. What is IN Scope
- **Data Layer Access**: Ensure the UI layer has access to the already-parsed `strain` value from the Pokémon data object (specifically, `pokerus.strain`).
- **UI Presentation (Detail View)**: In the detailed view of a specific Pokémon, display the Pokerus strain if the Pokémon is currently infected or cured.
- **UI Presentation (List/Grid View)**: Optionally, incorporate a visual indicator (like a distinct color or badge number) in the party/box view to quickly identify different strains.
- **Tactical Aesthetic**: All new UI components must adhere to the "tactical hardware" aesthetic (ADR 008, ADR 024): sharp edges (`rounded-none`), dashed borders (`border-dashed`), monospaced telemetry fonts, etc.

### 3.2. What is OUT of Scope
- Modifying the save parsing engine. The engine (`parsePokerus`) already handles the bitwise extraction correctly (as standardized by ADR 026). This is purely a UI/Presentation layer PRD.
- Tracking historical strains or "patient zero" beyond what is currently existing in the save file. The tracker only shows the current state.

## 4. Acceptance Criteria
- [x] Epic Planner: Break this PRD down into one or more Epics.
- [x] epic-112-322-pokerus-strain-ui-detail-view
- [ ] epic-112-323-pokerus-strain-ui-grid-view
- [ ] research-112-334-investigate-pokerus-ui-epic-failure
- [ ] epic-112-335-pokerus-strain-ui-detail-view-v2
