---
id: research-150-186-egg-groups-missing
type: RESEARCH
title: Investigate Missing Egg Groups Data for Breeding Algorithm
status: READY
owner_persona: researcher
created_at: "2026-06-15"
updated_at: "2026-06-15"
depends_on: []
jules_session_id: null
pr_number: null
parent: task-084-150-breeding-pair-algorithm-impl
tags:
  - backend
  - data
  - breeding
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Investigate Missing Egg Groups Data for Breeding Algorithm

## Context
While implementing `task-084-150-breeding-pair-algorithm-impl`, it was discovered that `PokemonMetadata` inside `src/db/schema.ts` does not include `egg_groups`.
In addition, there isn't a known utility to compute Gen 2 Pokemon gender based on Attack DV and Gender Ratio.

## Objectives
- Determine how to add Egg Groups to the DB schema (and update `scripts/generate-pokedata.ts`).
- Determine how to calculate gender using DVs and Gender Ratio (`gr`).
- Outline the necessary changes to supply this data to the Breeding Algorithm.
