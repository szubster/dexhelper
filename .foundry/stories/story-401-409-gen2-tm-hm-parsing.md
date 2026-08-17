---
id: story-401-409-gen2-tm-hm-parsing
type: STORY
title: Gen 2 TM/HM Parsing
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-110-401-tm-hm-save-parsing-v2
tags:
  - gen2
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 TM/HM Parsing

## Description
Implement the parsing of Gen 2 TM/HM inventory and event flags from the save file. This includes extracting item quantities and checking event flags for one-time TMs, avoiding inline magic numbers and using module-level constants.

## Acceptance Criteria
- [x] Break down into multiple TASK nodes for implementation and QA.
- [x] task-409-430-gen2-tm-hm-parsing-impl
- [x] task-409-431-gen2-tm-hm-parsing-qa
