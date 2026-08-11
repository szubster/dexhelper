---
id: epic-340-413-qa-automated-evaluation
type: EPIC
title: QA Evaluation and Variant Selection Logic
status: READY
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-11'
depends_on:
  - epic-340-412-orchestrator-parallel-execution
jules_session_id: null
pr_number: null
parent: prd-135-340-automated-agent-ab-testing-framework
tags:
  - qa
  - orchestrator
  - evaluation
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: QA Evaluation and Variant Selection Logic

## Objective
Introduce logic for evaluating parallel variant outcomes, selecting the "winner", and logging the experiment results.

## Scope
1. Update `qa` persona prompt/guidelines to instruct it on how to evaluate parallel output objectively based on `rejection_count`, execution time, and correctness.
2. Implement orchestration logic to select the winning variant, merge its final PR, and cancel the losers.
3. Automatically log experiment findings to `.foundry/docs/knowledge_base/prompt-learnings.md`.

## Acceptance Criteria
- [ ] Story Owner: Break down into Stories. Ensure that a final STORY dedicated exclusively to Integration and E2E Verification is generated and appropriately tagged with `e2e` or `integration`.
