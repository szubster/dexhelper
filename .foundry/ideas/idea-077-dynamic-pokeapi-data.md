---
id: idea-077-dynamic-pokeapi-data
type: IDEA
title: Dynamically pull items and moveset PPs from PokeAPI during build
status: DRAFT
owner_persona: product_manager
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Dynamically pull items and moveset PPs from PokeAPI during build

## Context
Currently, memory offsets, base move PPs, and authoritative item lists are manually compiled in `RESEARCH` nodes or hardcoded. These lists can be long and maintenance-heavy. We can use the open PokeAPI to dynamically pull move parameters and item data.

## Proposal
- During the build time, dynamically fetch required data (e.g., move PPs, valid items) from PokeAPI.
- Store this standard data structure directly in `indexeddb` for fast client-side access.
- Reduce hardcoded tables in the codebase, ensuring data remains authoritative without manual updates.

## Benefits
- Removes large static data tables from the repository.
- Leverages community-maintained open APIs.
- Improves scalability for future generations of Pokémon data.

## Risks
- Build process relies on external API availability. (Can be mitigated by caching or fallback data).
