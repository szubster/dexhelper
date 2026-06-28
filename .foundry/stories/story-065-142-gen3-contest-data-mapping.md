---
id: story-065-142-gen3-contest-data-mapping
type: STORY
title: Gen 3 Contest Data Mapping
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-16'
updated_at: '2026-06-28'
depends_on:
  - story-065-141-gen3-contest-error-handling
jules_session_id: '2210876825288442077'
pr_number: null
parent: epic-040-065-gen3-contest-data-integration
tags:
  - feature
  - gen3
  - contests
  - mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Gen 3 Contest Data Mapping

## 1. Context
Derived from `epic-040-065-gen3-contest-data-integration`, this story focuses on mapping the extracted contest data to the internal Pokémon instance structures (`PokemonInstance`).

## 2. Requirements
- Integrate the extracted `Gen3ConditionStats` and `Gen3Ribbons` into the `PokemonInstance` structure for Gen 3 saves.
- When generating the `PokemonInstance` list for the `partyDetails` and `pcDetails` in `parseGen3`, ensure the correct data extraction logic for contest stats and ribbons is invoked and assigned to the respective Pokémon instances.
- Ensure backwards compatibility: Gen 1 and Gen 2 parsing interfaces must remain unmodified and fully functional.

## 3. Acceptance Criteria
- [ ] Map the extracted Condition, Sheen, and Ribbon data to the appropriate `condition` and `ribbons` fields in the internal Pokémon data structure (`PokemonInstance`).
- [ ] Confirm all existing Gen 1 and Gen 2 save parsing tests pass without modification.
