---
id: story-401-408-gen1-tm-hm-parsing
type: STORY
title: Gen 1 TM/HM Parsing
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-110-401-tm-hm-save-parsing-v2
tags:
  - gen1
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 TM/HM Parsing

## Description
Implement the parsing of Gen 1 TM/HM inventory and event flags from the save file. This includes extracting item quantities and checking event flags for one-time TMs, while strictly avoiding inline magic numbers and using module-level constants. Use full PokeData property names as per ADR 015.

## Acceptance Criteria
- [x] Break down into multiple TASK nodes for implementation and QA.
- [x] task-408-430-gen1-tm-hm-parsing-impl
- [x] task-408-431-gen1-tm-hm-parsing-qa
