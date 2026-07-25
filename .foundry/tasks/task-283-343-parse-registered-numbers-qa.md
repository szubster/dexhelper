---
id: task-283-343-parse-registered-numbers-qa
type: TASK
title: QA Gen 2 Pokegear Registered Numbers Parsing
status: PENDING
owner_persona: qa
created_at: '2026-07-23'
updated_at: '2026-07-23'
depends_on:
  - task-283-342-parse-registered-numbers-impl
jules_session_id: null
pr_number: null
parent: story-116-283-parse-registered-numbers
tags:
  - qa
  - gen2
  - parser
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Pokegear Registered Numbers Parsing

## Objective
Verify the parsing logic for Generation 2 Pokegear registered numbers and state flags.

## Acceptance Criteria
- [ ] Verify the parsing logic extracts `wPhoneList` correctly.
- [ ] Verify error handling correctly throws "The save file is corrupted or incomplete" on out-of-bounds reads.
- [ ] Ensure full test coverage is provided.
