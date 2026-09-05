---
id: task-080-132-refactor-generation-exports-impl
type: TASK
title: Refactor Data Generation Pipeline to Verbose Keys - Implementation
status: READY
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-042-080-refactor-generation-exports
tags:
  - data-pipeline
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Refactor Data Generation Pipeline to Verbose Keys - Implementation

## Objective
Implement the verbose property names throughout the app and data generation script (e.g. `n` to `name`, `cr` to `captureRate`, `eto` to `evolvesTo`) as per ADR 015.

## Acceptance Criteria
- [ ] `src/db/schema.ts` is updated with verbose names in `PokemonMetadata`, `CompactChainLink`, `CompactEncounterDetail`, `UnifiedLocation`, `LocationAreaEncounters`, `CompactEncounter`.
- [ ] `scripts/generate-pokedata.ts` generates properties with verbose names.
- [ ] `src/db/PokeDB.ts` is updated to correctly hydrate from verbose names.
- [ ] Data-consuming components and engine files (like `src/components/PokemonDetails.tsx`, `src/engine/assistant/suggestionEngine.ts`) are refactored to read the new properties.
- [ ] `pnpm run data:gen` runs without issues and generates the new files.
- [ ] `pnpm lint && pnpm test && pnpm type-check` pass.
