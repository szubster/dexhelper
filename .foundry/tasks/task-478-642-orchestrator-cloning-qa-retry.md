---
id: task-478-642-orchestrator-cloning-qa-retry
type: TASK
title: QA - Dynamic Node Cloning and Prompt Adaptation (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-09-16'
updated_at: '2026-09-16'
depends_on:
  - task-478-641-orchestrator-cloning-tests-retry
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA - Dynamic Node Cloning and Prompt Adaptation (Retry)

## Objective
Verify the implementation of dynamic node cloning and prompt adaptation for the Foundry Orchestrator.

## Scope
1. Verify that the node cloning logic correctly duplicates nodes for specified variants.
2. Verify that cloned node IDs are distinct, collision-free, and follow the correct ID schema.
3. Verify that variant-specific context is correctly injected into agent prompts.
4. Review unit tests for thoroughness and correctness.

## Acceptance Criteria
- [ ] Ensure unit tests are passing and cover the core cloning logic.
- [ ] Verify that cloned nodes maintain the structure and properties of the original nodes.
- [ ] Verify that prompts include the correct variant metadata.