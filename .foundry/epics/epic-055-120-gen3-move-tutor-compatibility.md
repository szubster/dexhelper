---
id: epic-055-120-gen3-move-tutor-compatibility
type: EPIC
title: Gen 3 Move Tutor Compatibility Cross-Referencing
status: CANCELLED
owner_persona: story_owner
created_at: 2026-06-30T00:00:00.000Z
updated_at: '2026-07-30'
depends_on:
  - epic-055-119-gen3-move-tutor-save-parsing
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - gen3
  - data
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-055-119-gen3-move-tutor-save-parsing
notes: ''
---

# Epic: Gen 3 Move Tutor Compatibility Cross-Referencing

## Objective
Develop the logic to cross-reference available Gen 3 Move Tutors with the Pokémon currently residing in the player's save file (Party and PC boxes), determining which Pokémon are compatible with which available moves.

## Scope
- Leverage the existing MsgPack `PokeData` architecture (ADR 015) to access learnsets and move compatibility data.
- Iterate through the parsed PC boxes and Party to identify all owned Pokémon.
- For each available tutor (data provided by `epic-055-119`), filter the list of owned Pokémon to find those that can legally learn the taught move in that specific game version.
- Ensure the matching logic is performant and non-blocking, capable of handling full PC boxes efficiently.

## Prerequisites
- Save parsing for Move Tutors (`epic-055-119`) must be implemented to provide the list of available tutors.
- PC Box and Party parsing must be fully operational.

## Acceptance Criteria
- [ ] A performant utility function is created that cross-references a specific move against a list of Pokémon entities.
- [ ] The cross-referencing logic correctly utilizes the MsgPack `PokeData` to determine compatibility, respecting version differences where applicable.
- [ ] The process can efficiently handle checking a full Gen 3 PC storage system without significant UI blocking.
