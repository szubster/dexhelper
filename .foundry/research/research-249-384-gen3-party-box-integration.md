---
id: research-249-384-gen3-party-box-integration
type: RESEARCH
title: Investigate Gen 3 Party and Box Parsing Integration
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-02'
updated_at: '2026-08-26'
depends_on:
  - research-157-369-gen3-party-box-offsets
jules_session_id: '15060255682761425927'
pr_number: null
parent: null
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Party and Box Parsing Integration

## Objective
Investigate how to integrate Gen 3 Party and PC Box parsing into `parseGen3` so that downstream features like contest data mapping can be applied.

## Context
The Gen 3 Contest Data Mapping task requires mapping contest stats and ribbons to `PokemonInstance` objects in `parseGen3`. However, the Party and PC Box parsing logic is currently stubbed out (returning `[]`). This research node should determine how to properly integrate the pending party/pc extraction logic (once the memory offsets are known from the Gen 3 memory offsets research) into the main parser.

## Acceptance Criteria
- [ ] Document the integration strategy for iterating through Gen 3 Party and PC Box Pokémon within `parseGen3`.
