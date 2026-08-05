---
id: prd-117-337-split-bundles-and-data
type: PRD
title: Split bundles and data by game generation
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-25'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '12307440415948650009'
pr_number: null
parent: idea-117-split-bundles-and-data
tags:
  - performance
  - architecture
  - bundles
research_references:
  - research-117-325-bundle-splitting-analysis
rejection_count: 0
rejection_reason: ''
---
# PRD: Split bundles and data by game generation

## Context
As analyzed in research-117-325-bundle-splitting-analysis and ADR-117-029, the application bundle and data are growing linearly. We need to implement generation-based splitting for JavaScript engine logic, UI components, and static Pokedex data.

## Requirements
- Move generation-specific logic behind dynamic imports (Save Parsers, Assistant Strategies).
- UI components exclusively used for specific generations must be loaded via `React.lazy`.
- Split monolithic `pokedata.msgpack` into a core bundle and generation-specific extension bundles.
- Refactor synchronization logic to load extensions and code on demand based on detected generation.

## Acceptance Criteria
- [ ] Epic for Engine Code Splitting generated
- [ ] Epic for UI Component Splitting generated
- [ ] Epic for Data Splitting generated
- [ ] Epic for Synchronization Flow generated
