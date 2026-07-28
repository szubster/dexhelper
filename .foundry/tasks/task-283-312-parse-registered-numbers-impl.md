---
id: task-283-312-parse-registered-numbers-impl
type: TASK
title: Implement Gen 2 Pokegear Registered Numbers Parsing
status: CANCELLED
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-116-283-parse-registered-numbers
tags:
  - feature
  - gen2
  - parser
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md
rejection_count: 3
rejection_reason: >-
  [ACKNOWLEDGED] Max rejection count reached. The implementation violates the
  Section 13 Bitwise Mapping rule from schema.md. It merely extracts raw
  32-bit/8-bit values for wSwarmFlags, wDailyPhoneItemFlags, and
  wDailyPhoneTimeOfDayFlags without mapping the specific bit offsets to target
  events. However, the required bitwise mapping is impossible to implement
  correctly because the provided research context
  (.foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md)
  lacks the necessary bit locations, requiring further research. This task is
  thus impossible to complete in its current state.
notes: ''
---

# Implement Gen 2 Pokegear Registered Numbers Parsing

## Objective
Implement the parsing logic for Generation 2 Pokegear registered numbers and state flags, strictly adhering to the established rules and constraints.

## Constraints & Contract
- **ADR 028 (Relative Offsets & Magic Numbers)**: You MUST explicitly define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- **Error Handling**: You MUST include explicit `try/catch` blocks handling `RangeError` exceptions for out-of-bounds reads, returning an appropriate error message like "The save file is corrupted or incomplete".
- **Transient Failures**: If you experience a transient failure requiring retry during your task, you MUST update the node's YAML frontmatter to `status: FAILED` and provide a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task (e.g., passthrough), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Define module-level constants for `wPhoneList` (size 11), `wSwarmFlags`, `wDailyPhoneItemFlags`, `wDailyPhoneTimeOfDayFlags`, and `wSpecialPhoneCallID`.
- [ ] Implement robust save file parsing logic using the DataView API to extract the Pokegear registered numbers.
- [ ] Implement explicit `RangeError` handling with `try/catch` block for out-of-bounds reads returning "The save file is corrupted or incomplete".
- [ ] Ensure all code passes linting, tests, and formatting checks before submission.
