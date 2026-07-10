---
id: research-084-209-egg-groups-missing
type: RESEARCH
title: Investigate Missing Egg Groups Data for Breeding Algorithm
status: CANCELLED
owner_persona: researcher
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - backend
  - data
  - breeding
research_references: []
rejection_count: 0
rejection_reason: 'Researched already, creating implementation tasks directly'
notes: ''
---

# Investigate Missing Egg Groups Data for Breeding Algorithm

## Context
While attempting to implement `task-084-204-breeding-pair-algorithm-impl`, the previous task `task-084-150-breeding-pair-algorithm-impl` and its associated research `research-150-186-egg-groups-missing` indicated that `PokemonMetadata` inside `src/db/schema.ts` does not currently include `egg_groups` data. In addition, there isn't a known utility to compute Gen 2 Pokemon gender based on Attack DV and Gender Ratio.

## Objectives
- Determine how to add Egg Groups to the DB schema (and update `scripts/generate-pokedata.ts`).
- Determine how to calculate gender using DVs and Gender Ratio (`gr`).
- Outline the necessary changes to supply this data to the Breeding Algorithm.
While attempting to implement the Shiny Carrier Breeding Pair Algorithm, it was discovered that `PokemonMetadata` inside `src/db/schema.ts` does not currently include `egg_groups` data. In addition, there isn't a documented utility to accurately compute Gen 2 Pokemon gender based on Attack DV and Gender Ratio.

## Objectives
- Determine how to extract and add Egg Groups to the DB schema (e.g., updating `scripts/generate-pokedata.ts`).
- Determine how to calculate gender mathematically using Gen 2 DVs and the Gender Ratio (`gr`).
- Outline the necessary data model changes required to unblock the Breeding Algorithm.
