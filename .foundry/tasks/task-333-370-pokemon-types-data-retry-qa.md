---
id: task-333-370-pokemon-types-data-retry-qa
type: TASK
title: QA Pokemon Types Data Pipeline (Retry)
status: READY
owner_persona: qa
created_at: '2026-07-30'
updated_at: '2026-07-31'
depends_on:
  - task-333-369-pokemon-types-data-retry-impl
jules_session_id: null
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - data
  - pokemon
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Pokemon Types Data Pipeline (Retry)

## Context
QA verification for `task-333-369-pokemon-types-data-retry-impl`.

## Acceptance Criteria
- [ ] Verify `POKEMON_TYPE` and `POKEMON_TYPE_MAP` are defined in `src/db/schema.ts`.
- [ ] Verify `generate-pokedata.ts` correctly extracts types, sorts by slot, and stores integer IDs.
- [ ] Run the generation script locally or verify the source code to ensure types are correctly assigned in `generate-pokedata.ts`.
- [ ] Ensure `pnpm lint` and `pnpm test` pass.
