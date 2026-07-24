---
id: task-283-342-parse-registered-numbers-impl
type: TASK
title: Implement Gen 2 Pokegear Registered Numbers Parsing
status: READY
owner_persona: coder
created_at: '2026-07-23'
updated_at: '2026-07-24'
depends_on:
  - research-283-336-gen2-phone-memory-offsets
jules_session_id: null
pr_number: null
parent: story-116-283-parse-registered-numbers
tags:
  - feature
  - gen2
  - parser
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Pokegear Registered Numbers Parsing

## Objective
Implement the parsing logic for Generation 2 Pokegear registered numbers and state flags, strictly adhering to the established rules and constraints, using the specific offsets identified by research.

## Constraints & Contract
- **ADR 028 (Relative Offsets & Magic Numbers)**: You MUST explicitly define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- **Error Handling**: You MUST include explicit `try/catch` blocks handling `RangeError` exceptions for out-of-bounds reads, returning an appropriate error message like "The save file is corrupted or incomplete".

## Acceptance Criteria
- [ ] Define module-level constants for `wPhoneList` (size 11), `wSwarmFlags`, `wDailyPhoneItemFlags`, `wDailyPhoneTimeOfDayFlags`, and `wSpecialPhoneCallID`.
- [ ] Implement robust save file parsing logic using the DataView API to extract the Pokegear registered numbers.
- [ ] Implement explicit `RangeError` handling with `try/catch` block for out-of-bounds reads returning "The save file is corrupted or incomplete".
- [ ] Ensure all code passes linting, tests, and formatting checks before submission.
