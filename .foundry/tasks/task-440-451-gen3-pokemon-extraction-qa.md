---
id: task-440-451-gen3-pokemon-extraction-qa
type: TASK
title: QA Gen 3 Pokemon Extraction Function
status: PENDING
owner_persona: qa
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on:
  - task-440-450-gen3-pokemon-extraction-impl
jules_session_id: null
pr_number: null
parent: story-130-440-extract-gen3-party-data-structure
tags:
  - gen3
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Pokemon Extraction Function

## Objective
Verify the implementation of `extractGen3PokemonData` and the refactoring of `parseGen3Party` in `src/engine/saveParser/parsers/gen3.ts`.

## Description
1. Review the code changes made in `task-440-450-gen3-pokemon-extraction-impl`.
2. Ensure that `extractGen3PokemonData` correctly parses the 100-byte structure, calculates the decryption key (`pv ^ otId`), and extracts/decrypts the 48-byte data block.
3. Ensure that `parseGen3Party` is successfully refactored to use `extractGen3PokemonData`.
4. Ensure that appropriate unit tests were added or updated to cover the new functionality.
5. Verify that all existing tests pass (`pnpm test`).

## Acceptance Criteria
- [ ] Code review is complete and the implementation meets the requirements.
- [ ] `extractGen3PokemonData` is implemented correctly.
- [ ] `parseGen3Party` is refactored to use `extractGen3PokemonData`.
- [ ] Unit tests are present and passing.