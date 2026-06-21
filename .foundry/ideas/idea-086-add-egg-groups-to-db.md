---
id: idea-086-add-egg-groups-to-db
type: IDEA
title: Add Egg Groups and Gender Derivation to DB Schema
status: PENDING
owner_persona: product_manager
created_at: '2026-06-21'
updated_at: '2026-06-21'
depends_on: []
jules_session_id: null
parent: null
tags:
  - database
  - breeding
notes: 'Generated autonomously by agile_coach based on repeated task failures (task-084-150, task-084-204).'
---

# Idea: Add Egg Groups and Gender Derivation to DB Schema

## Context
Recent implementations for breeding algorithms (`task-084-150-breeding-pair-algorithm-impl`, `task-084-204-breeding-pair-algorithm-impl`) were repeatedly rejected and permanently failed. The rejection reasons indicated missing critical context regarding "Egg Groups" and "Gender derivation logic" in the existing DB schema and PokeAPI ETL scripts. The current offline database schema lacks this fundamental data needed to accurately determine if two Pokémon can breed.

## Proposal
Extend the global application data schema (`PokeData` / `.jsonl` files) to include breeding metadata.
1. Extract "Egg Groups" for each Pokémon species during the `scripts/generate-pokedata.ts` ETL phase.
2. Implement and store the specific Gender derivation values (such as the gender ratio byte or percentage) required to calculate a Pokémon's gender from its DVs (in Gen 2) or PID (in Gen 3).
3. Ensure this new metadata is integrated into the IndexedDB schema and passed efficiently to the frontend.

## Value Proposition
This foundational data is an absolute prerequisite for any features related to Daycare tracking, breeding suggestions, or egg move calculators. Providing it natively in the offline DB unblocks the permanently failed breeding UI features and prevents future `coder` and `qa` deadlocks.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the schema additions and the required ETL pipeline changes.
