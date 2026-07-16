---
id: adr-020-feebas-visualization-architecture
type: ADR
title: 'ADR 020: Feebas Route 119 Visualizer Integration Strategy'
status: COMPLETED
owner_persona: architect
created_at: '2026-06-07'
updated_at: '2026-06-07'
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
# ADR 020: Feebas Route 119 Visualizer Integration Strategy

## Date
2026-06-07

## Status
Accepted

## Context
In Generation 3 (Ruby, Sapphire, Emerald), encountering Feebas requires players to fish on exactly 6 specific water tiles on Route 119. These tiles are determined dynamically based on a hidden seed (derived from the Dewford Town trendy phrase) saved in the game's `.sav` file.

Research node `research-036-006-feebas-seed-investigation` successfully identified the save file offsets for this seed (`0x2DD6` in R/S, `0x2E66` in Emerald) and documented the custom Linear Congruential Generator (LCG) algorithm used to map this seed to 6 exact spot IDs (ranging from 4 to 447, mapped sequentially to surfable water tiles).

The goal is to eliminate this tedious manual gameplay loop by providing an interactive visual representation of Route 119 within DexHelper, explicitly highlighting the exact 6 tiles. We need a cohesive architecture to integrate this visualization into the existing UI components (like `PokemonLocations`) cleanly, maintaining the app's offline-first programmatic save access principles.

## Decision

We will implement a two-tier architecture separating the seed extraction/calculation logic from the frontend visualizer.

### 1. Backend Utilities (`src/engine/gen3/feebas.ts`)
We will create a pure utility module responsible for the mathematical extraction and calculation:
- **`extractFeebasSeed(saveData, gameVersion)`**: Reads the 16-bit seed from the parsed save file buffer, handling version offsets safely using the `DataView` API (mandated by ADR 010).
- **`calculateFeebasTiles(seed)`**: Implements the custom Gen 3 LCG algorithm `(1103515245 * seed + 12345)` to generate the 6 target spot IDs.
- **`mapSpotIdsToCoordinates(spotIds)`**: Maps the generated 1D spot IDs (4-447) into 2D coordinates `(x, y)` relative to a standardized Route 119 grid map.

### 2. Frontend Map Component (`src/components/pokemon/details/FeebasMapOverlay.tsx`)
We will build a dedicated, responsive visual component for Route 119.
- **Base Layer**: A static background image or CSS grid representing the geographical layout of Route 119's surfable water tiles.
- **Overlay Layer**: A dynamic rendering layer that takes the array of 6 `(x, y)` coordinates provided by the backend utilities and renders high-visibility tactical markers (e.g., using `Target` or `MapPin` from `lucide-react`) exactly over those positions.
- **Integration**: This component will be injected into the existing `PokemonLocations` component (`src/components/pokemon/details/PokemonLocations.tsx`) specifically when `pokemonId === 349` (Feebas) and `gameVersion` is a Gen 3 game (Ruby, Sapphire, Emerald).

## Guidelines for Map Component Overlay
- The coordinate system `(x, y)` from the backend must directly map to absolute percentage-based offsets or CSS Grid coordinates within the base map container to ensure responsive scaling across device sizes.
- Markers should pulse or use high-contrast colors (e.g., `var(--theme-primary)`) to immediately draw the player's eye against the blue water tiles.

## Consequences
- **Positive**: Abstracting the LCG math from the UI ensures the complex Gen 3 mechanics are testable in isolation.
- **Positive**: Provides tremendous immediate utility to the user, showcasing the power of programmatic save-state parsing.
- **Negative**: Requires shipping and maintaining a static asset or complex grid layout specifically for Route 119, slightly increasing bundle size and maintenance overhead if the tile logic contains edge cases.
