---
id: task-478-718-orchestrator-prompt-adaptation-retry-5
type: TASK
title: Orchestrator Prompt Adaptation (Retry 5)
status: READY
owner_persona: coder
created_at: '2026-10-23'
updated_at: '2026-10-23'
depends_on:
  - research-478-716-investigate-cloning-logic-failure-retry-4
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

# Task: Orchestrator Prompt Adaptation (Retry 5)

## Objective
Implement logic to inject variant-specific context into prompts for cloned nodes.

## Scope
1. Adapt system and user prompts to include context for the specific variant the cloned node represents.
2. Ensure the adaptations are correctly propagated to the LLM during execution.

## Acceptance Criteria
- [ ] Implement prompt adaptation logic.
- [ ] Ensure variant context is injected correctly.
