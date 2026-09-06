---
id: task-516-531-prompt-resolution-qa
type: TASK
title: QA Verification of Prompt Resolution Logic
status: PENDING
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-516-530-prompt-resolution-tests
jules_session_id: null
pr_number: null
parent: story-418-516-orchestrator-prompt-resolution
tags:
  - foundry
  - orchestrator
  - prompt-resolution
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# QA Verification of Prompt Resolution Logic

## Description
Perform QA verification of the Orchestrator's prompt resolution logic, ensuring it correctly constructs composite prompts according to the established policies and architectures.

## Acceptance Criteria
- [ ] Verify that the `owner_persona` base prompt is loaded correctly.
- [ ] Verify that tags correctly load specific context layers.
- [ ] Verify that the core system policies are appended as the final section.
- [ ] Ensure unit tests cover the new logic and all tests pass.
