---
id: adr-018-smart-route-radar
type: ADR
title: 'ADR 018: Smart Route Radar Architecture'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-25'
updated_at: '2026-05-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 018: Smart Route Radar Architecture

## Status
Accepted

## Context
DexHelper needs a "Smart Route Radar" to visually guide players to locations with uncaught Pokémon. The static map UI (`ADR 010`) needs to integrate dynamically with the `suggestionEngine`'s output based on the user's active save state.

## Decision

1. **Data Unification Strategy**:
   - The UI map components (e.g., React Flow or SVG overlays) will subscribe to the output of the `suggestionEngine`.
   - The `suggestionEngine` provides a list of recommended encounters, which includes the `areaId` (e.g., Route 1) for each missing Pokémon.
   - We will implement a `RouteRadarController` that maps these `areaId`s from the dynamic suggestion list directly onto the static `UnifiedLocation` map graph defined in Gen 1/2/3 Map Graphs.

2. **Heatmap Data Structure & Flow**:
   - The `RouteRadarController` will aggregate the suggestions by `areaId` to calculate a "density" score (e.g., number of unique missing species per area).
   - The data flow will be: `Save State -> suggestionEngine -> RouteRadarController -> Heatmap State`.
   - The Heatmap State will be passed as props to the Map UI component.
   - The UI will use this density score to apply conditional styling (e.g., varying opacity, color gradients from yellow to red, or tactical icons) to the map nodes representing those areas.

3. **Interactive Node Resolution**:
   - Map nodes on the UI will become interactive (clickable).
   - When a node with a density score > 0 is clicked, the UI will dispatch an event with the `areaId`.
   - A detail panel will resolve this `areaId` against the `suggestionEngine`'s current output array to filter and display only the missing encounters specific to that location.
   - This detail view will render the specific data (encounter rates, methods like fishing/surfing, time of day) for those Pokémon as provided by the static `PokeData` integrated with the dynamic save state.

## Consequences
- **Positive**: Provides a highly visual, gamified way to track missing Pokémon, enhancing the "Active Guide" experience.
- **Positive**: Reuses the existing `suggestionEngine` logic and map graphs without requiring duplicate data structures.
- **Negative**: The map UI components will become stateful and dependent on the suggestion engine, increasing complexity in the presentation layer.
