---
id: story-130-440-extract-gen3-party-data-structure
type: STORY
title: Extract Gen 3 Party Data Structure
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-19'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-097-130-gen3-data-structure-extraction
tags:
  - gen3
  - save-engine
research_references:
  - .foundry/archive/research/research-175-176-gen3-pokerus-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract Gen 3 Party Data Structure

## Objective
Implement functionality to extract the raw 100-byte Pokémon data structure for each party Pokémon from an active Gen 3 save file section. This includes ensuring correct offset parsing across all Gen 3 games using the DataView API.

## Description
To support features like Pokérus extraction, we first need a robust way to extract the 100-byte structure for a given Pokémon from Gen 3 save files. The core details are stored within a 48-byte encrypted Data block inside this 100-byte structure.

This story should implement the foundational Gen 3 Pokémon extraction and decryption logic, including:
1. Extracting the 100-byte structure.
2. Using the `DataView` API exclusively.
3. Handling Gracefully and parsing across Ruby, Sapphire, Emerald, FireRed, and LeafGreen.

## Technical Details
- Follow `src/engine/saveParser/parsers/gen3.ts` constraints.
- Do not implement specific stat/attribute extraction (like Pokérus) yet, this story is strictly about scaffolding the 100-byte data block structure and managing decryption.

## Acceptance Criteria
- [ ] task-440-450-gen3-pokemon-extraction-impl
- [ ] task-440-451-gen3-pokemon-extraction-qa
