---
id: task-333-364-pokemon-types-data-qa
type: TASK
title: QA Pokemon Types Data Pipeline
status: ACTIVE
owner_persona: qa
created_at: '2026-07-29'
updated_at: '2026-07-31'
depends_on:
  - task-333-363-pokemon-types-data-impl
jules_session_id: '4775895747370370773'
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - data
  - pokemon
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: QA Pokemon Types Data Pipeline

## Context
The coder has implemented typing data extraction in the Pokemon database pipeline.

## Acceptance Criteria
- [ ] Verify `POKEMON_TYPE` and `POKEMON_TYPE_MAP` are defined in `src/db/schema.ts`.
- [ ] Verify `generate-pokedata.ts` correctly reads `pData.types`, sorts by slot (if applicable), and stores integer IDs.
- [ ] Run the generation script locally or verify the source code to ensure types are correctly assigned to `pokemon.push(...)`.
- [ ] Ensure `pnpm lint` and `pnpm test` pass.

### QA Rejection Note
Rejected task-333-363-pokemon-types-data-impl. The `generate-pokedata.ts` script extracts types but fails to sort them by `slot` before pushing them into the array, which is required by the acceptance criteria.
