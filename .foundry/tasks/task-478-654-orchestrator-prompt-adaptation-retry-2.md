---
id: task-478-654-orchestrator-prompt-adaptation-retry-2
type: TASK
title: Implement Dynamic Prompt Adaptation for Cloned Nodes (Retry 2)
status: PENDING
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on:
  - task-478-653-orchestrator-cloning-logic-retry-2
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

# Task: Implement Dynamic Prompt Adaptation for Cloned Nodes (Retry 2)

## Objective
Inject variant-specific context into prompts for cloned nodes.

## Scope
1. Update orchestrator logic to read variant contexts.
2. Inject contexts into compiled prompts before agent dispatch.

## Acceptance Criteria
- [ ] Prompts correctly include variant specifics.
