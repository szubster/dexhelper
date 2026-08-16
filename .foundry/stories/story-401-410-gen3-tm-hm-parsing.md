---
id: story-401-410-gen3-tm-hm-parsing
type: STORY
title: Gen 3 TM/HM Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: '1271783771049020181'
pr_number: null
parent: epic-110-401-tm-hm-save-parsing-v2
tags:
  - gen3
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 TM/HM Parsing

## Description
Implement the parsing of Gen 3 TM/HM inventory from the A/B bank flash memory save blocks. Must pass and utilize resolved section offsets (e.g. section1Offset) for relative memory offsets instead of hardcoded absolute ones, catch RangeErrors, and avoid inline magic numbers.

## Acceptance Criteria
- [x] Break down into multiple TASK nodes for implementation and QA.
- [ ] task-410-430-gen3-tm-hm-parsing-impl
- [ ] task-410-431-gen3-tm-hm-parsing-qa
