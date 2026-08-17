---
id: task-408-430-gen1-tm-hm-parsing-impl
type: TASK
title: Gen 1 TM/HM Parsing Implementation
status: FAILED
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-401-408-gen1-tm-hm-parsing
tags:
  - gen1
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 1
rejection_reason: 'QA validation failed: Missing unit tests for parseGen1TMFlags in gen1EventFlags.test.ts'
notes: ''
locks: []
---

# Gen 1 TM/HM Parsing Implementation

## Description
Implement the parsing of Gen 1 TM/HM inventory and event flags from the save file. This includes extracting item quantities and checking event flags for one-time TMs, while strictly avoiding inline magic numbers and using module-level constants. Use full PokeData property names as per ADR 015.

## Acceptance Criteria
- [x] Implement parsing of Gen 1 TM/HM inventory in `src/engine/saveParser/parsers/gen1.ts`.
- [x] Extract item quantities and check event flags for one-time TMs using constants defined in `src/engine/saveParser/utils/gen1EventFlags.ts`.
- [x] Avoid inline magic numbers and use module-level constants.
- [x] Write unit tests for the parsing logic.
