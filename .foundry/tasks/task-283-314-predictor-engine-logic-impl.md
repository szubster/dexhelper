---
id: task-283-314-predictor-engine-logic-impl
type: TASK
title: Implement Gen 2 Pokegear Predictor Engine Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: '4745597957508456938'
pr_number: null
parent: story-117-283-pokegear-predictor-engine
tags:
  - feature
  - gen2
  - mechanics
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Pokegear Predictor Engine Logic

## Objective
Implement the Pokegear Predictor logic covering the RNG mechanics, probability calculations, and call triggers as defined by Generation 2 mechanics.

## Constraints & Contract
- **Architecture**: Your logic should be placed in `src/engine/saveParser/parsers/` or the appropriate predictor engine directory and correctly handle Gen 2 RNG algorithms.
- **RNG Mechanics**: The implementation must include `CheckPhoneCall`, `ChooseRandomCaller`, and handle the cooling-off period/timer evaluation properly.
- **Constants**: You MUST explicitly define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- **Transient Failures**: If you experience a transient failure requiring retry during your task, you MUST update the node's YAML frontmatter to `status: FAILED` and provide a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task (e.g., passthrough), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement the `CheckPhoneCall` probability checks (timer evaluation and 50% RNG trigger).
- [x] Implement `ChooseRandomCaller` to uniformly sample registered contacts available at the current time of day.
- [x] Define reusable constants for all associated bitmasks and magic numbers at the module level.
- [x] Ensure all code passes linting, tests, and formatting checks before submission.
