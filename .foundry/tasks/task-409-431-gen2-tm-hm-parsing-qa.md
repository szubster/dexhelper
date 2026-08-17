---
id: task-409-431-gen2-tm-hm-parsing-qa
type: TASK
title: QA Gen 2 TM/HM Parsing
status: COMPLETED
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-17'
depends_on:
  - task-409-430-gen2-tm-hm-parsing-impl
jules_session_id: null
pr_number: null
parent: story-401-409-gen2-tm-hm-parsing
tags:
  - gen2
  - save-parsing
  - qa
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 TM/HM Parsing

## Description
Verify the implementation of Gen 2 TM/HM parsing, ensuring it strictly adheres to the technical contract.

## Acceptance Criteria
- [x] Verify that all memory offsets and magic numbers are extracted to module-level constants.
- [x] Verify that `RangeError` is properly caught and re-thrown with the correct message.
- [x] Verify that bitwise mapping is explicit and correct.
- [x] Verify unit tests cover edge cases.
