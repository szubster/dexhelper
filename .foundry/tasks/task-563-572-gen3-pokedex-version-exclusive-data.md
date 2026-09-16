---
id: task-563-572-gen3-pokedex-version-exclusive-data
type: TASK
title: Gen 3 Pokédex Version Exclusive Data Definitions
status: READY
owner_persona: coder
created_at: '2026-09-13'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-563-gen3-pokedex-version-exclusive-mapping
tags:
  - dexhelper
  - gen3
  - pokedex
  - typescript
research_references: []
rejection_reason: ''
locks: []
---

# Gen 3 Pokédex Version Exclusive Data Definitions

## Description
Define the data structures and constants mapping the version exclusives for Ruby, Sapphire, Emerald, FireRed, and LeafGreen.

## Context & Technical Specifications
- Adhere to the PokeData Property Naming Schema.
- Create static arrays or objects that hold the species IDs exclusive to each of the 5 Gen 3 game versions.
- Ensure types are strict and prefer explicit union types.
- These definitions will be used by the mapper utility in a subsequent task.

## Acceptance Criteria
- [ ] Implement data structures mapping version exclusives for R/S/E and FR/LG.
- [ ] Export these constants for use in mapping utilities.
