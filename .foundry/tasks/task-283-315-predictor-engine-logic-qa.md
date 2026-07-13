---
id: task-283-315-predictor-engine-logic-qa
type: TASK
title: Verify Gen 2 Pokegear Predictor Engine Logic
status: ACTIVE
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on:
  - .foundry/tasks/task-283-314-predictor-engine-logic-impl.md
jules_session_id: '13890730659565611312'
pr_number: null
parent: story-117-283-pokegear-predictor-engine
tags:
  - feature
  - gen2
  - mechanics
  - qa
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify Gen 2 Pokegear Predictor Engine Logic

## Objective
Verify the implementation of the Pokegear Predictor engine logic against the Gen 2 mechanics requirements.

## Constraints & Contract
- **Architecture**: Validate that all RNG probability checks, `ChooseRandomCaller`, and timer evaluations function as described in the mechanics specification.
- **Constants Validation**: Ensure that ALL memory offsets, lengths, bit locations, and shifts have been defined as reusable module-level constants. If inline magic numbers are found in the implementation, you MUST reject the target task.
- **Rejection Protocol**: If you reject the implementation, you MUST update the TARGET task's YAML frontmatter (`status: FAILED`, increment `rejection_count`, add `rejection_reason`) and uncheck its Acceptance Criteria. Do NOT modify this QA task's YAML; instead, note the failure in its markdown body and document it in your QA journal.
- **Transient Failures**: If you experience a transient failure requiring retry during your task, you MUST update the node's YAML frontmatter to `status: FAILED` and provide a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task (e.g., passthrough), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Review code for correct implementation of `CheckPhoneCall` probability checks (timer evaluation and 50% RNG trigger).
- [ ] Review code for correct implementation of `ChooseRandomCaller` to sample available contacts based on time of day.
- [ ] Ensure that no magic numbers are used and all required constants are defined at the module level.
- [ ] Run all relevant unit tests and end-to-end tests to verify functional correctness.
