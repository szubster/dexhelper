---
id: task-478-670-orchestrator-prompt-adaptation-retry-3
type: TASK
title: Implement Dynamic Prompt Adaptation for Cloned Nodes (Retry 3)
status: PENDING
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - task-478-669-orchestrator-cloning-logic-retry-3
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - generation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Dynamic Prompt Adaptation for Cloned Nodes (Retry 3)

## Objective
Inject variant-specific context into prompts for cloned nodes.

## Scope
1. Update orchestrator logic to read variant contexts.
2. Inject contexts into compiled prompts before agent dispatch.

## Acceptance Criteria
- [ ] Prompts correctly include variant specifics.
