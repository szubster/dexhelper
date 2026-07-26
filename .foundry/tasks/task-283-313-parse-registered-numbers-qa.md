---
id: task-283-313-parse-registered-numbers-qa
type: TASK
title: QA Gen 2 Pokegear Registered Numbers Parsing
status: READY
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-07-26'
depends_on:
  - task-283-312-parse-registered-numbers-impl
jules_session_id: null
pr_number: null
parent: story-116-283-parse-registered-numbers
tags:
  - qa
  - gen2
  - parser
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Pokegear Registered Numbers Parsing

## Objective
Verify the implementation of the Generation 2 Pokegear registered numbers parser against architectural guidelines and requirements.

## Constraints & Contract
- **ADR 028 Validation**: You MUST verify that the coder has explicitly defined all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level. Ensure there are NO inline magic numbers for memory operations.
- **Error Handling Validation**: You MUST verify that the implementation includes explicit `try/catch` blocks handling `RangeError` exceptions for out-of-bounds reads.
- **Transient Failures**: If you experience a transient failure requiring retry during your task, you MUST update the node's YAML frontmatter to `status: FAILED` and provide a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Rejection Protocol**: If you reject the implementation, you MUST update the TARGET task's (`task-283-312-parse-registered-numbers-impl.md`) YAML frontmatter (`status: FAILED`, increment `rejection_count`, add `rejection_reason`) and uncheck its Acceptance Criteria. Do NOT modify your own QA task's YAML status; instead note it in the markdown and journal.

## Acceptance Criteria
- [ ] Verify ADR 028 compliance (no magic numbers, constants at module level).
- [ ] Verify explicit `RangeError` handling.
- [ ] Verify the parsing logic extracts `wPhoneList` correctly based on the docs.
- [ ] Ensure the test suite passes.
