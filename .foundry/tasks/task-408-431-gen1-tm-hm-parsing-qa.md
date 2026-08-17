---
id: task-408-431-gen1-tm-hm-parsing-qa
type: TASK
title: Gen 1 TM/HM Parsing QA
status: PENDING
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-17'
depends_on:
  - task-408-430-gen1-tm-hm-parsing-impl
jules_session_id: null
pr_number: null
parent: story-401-408-gen1-tm-hm-parsing
tags:
  - gen1
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Gen 1 TM/HM Parsing QA

## Description
Verify the parsing of Gen 1 TM/HM inventory and event flags from the save file. Ensure item quantities are extracted correctly, event flags are checked for one-time TMs, inline magic numbers are avoided, and full PokeData property names are used as per ADR 015.

## Acceptance Criteria
- [ ] Review implementation in `src/engine/saveParser/parsers/gen1.ts` and `src/engine/saveParser/utils/gen1EventFlags.ts`.
- [ ] Ensure inline magic numbers are avoided and module-level constants are used.
- [ ] Ensure tests cover the TM/HM parsing logic and pass successfully.

### QA Rejection Note
Validation failed due to missing unit tests for `parseGen1TMFlags` in `src/engine/saveParser/utils/gen1EventFlags.test.ts`. Triggering transient rejection.
