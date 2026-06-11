---
id: adr-010-gen3-map-graph-design
type: ADR
title: 'ADR 010: Gen 3 Map Graph Design'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-17'
updated_at: '2026-05-17'
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
# ADR 010: Gen 3 Map Graph Design

## Date
2026-05-17

## Status
Accepted

## Context
Generation 3 encompasses games set in two different regions: Hoenn (Ruby, Sapphire, Emerald) and Kanto (FireRed, LeafGreen). To provide accurate traversal, location resolution, and distance calculations for Gen 3 encounters, we must design a unified map graph architecture that supports both regions while maintaining compatibility with the existing `getDistanceToMap` and `resolveOutdoorMapId` patterns established in `gen1Graph.ts` and `gen2Graph.ts`.

## Decision
We will create a unified `gen3Graph.ts` file within `src/engine/mapGraph/`.
This module will:
1.  **Implement `getDistanceToMap`**: This function will take a `startMapId` and `targetAid`. It will use a precomputed Floyd-Warshall distance lookup stored on the `UnifiedLocation` objects (via the `dist` array), ensuring O(1) performance during strategy evaluation.
2.  **Implement `resolveOutdoorMapId`**: This function will map indoor locations (like houses or caves) to their outdoor parent hubs by recursively traversing the `prnt` property on the location objects, just as in previous generations.
3.  **Define Map Connectivity Constants**: We will export structural definitions (e.g., `gen3HoennMapGraph` and `gen3KantoMapGraph` if needed) that define the logical connections between map nodes (routes, cities, landmarks) for both the Hoenn region and the revamped Kanto region (including the Sevii Islands if applicable). Note that the real-time pathfinding is skipped in favor of the build-time distance matrix, but these definitions are critical for visual dashboard rendering and fallback resolution logic.

## Consequences
-   **Positive**: Adheres to the established architecture for O(1) distance lookups, keeping the suggestion engine performant.
-   **Positive**: Consolidates Gen 3 map logic into a single cohesive module, simplifying strategy development for RSE and FRLG.
-   **Negative**: FRLG uses a different Kanto map layout (with Sevii Islands) than Gen 1 (RBY) or Gen 2 (GSC), meaning the Kanto graph definition within Gen 3 will be distinct from the others, slightly increasing the maintenance overhead of map topologies.
