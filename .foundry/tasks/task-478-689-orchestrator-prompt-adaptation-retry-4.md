---
id: task-478-689-orchestrator-prompt-adaptation-retry-4
type: TASK
title: Implement DAG Node Prompt Adaptation Logic (Retry 4)
status: PENDING
owner_persona: coder
created_at: '2026-10-15'
updated_at: '2026-10-17'
depends_on:
  - task-478-688-orchestrator-cloning-logic-retry-4
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

# Task: Implement DAG Node Prompt Adaptation Logic (Retry 4)

## Objective
Inject variant-specific context into prompts when generating cloned nodes.

## Scope
1. Update orchestrator logic to allow specific prompts or context adjustments for generated nodes.
2. Ensure prompt modification relies on provided tags and variant criteria.

## Acceptance Criteria
- [ ] Implement prompt injection logic.
- [ ] Ensure adaptation does not overwrite global system policies.
