---
id: story-096-153-max-rejection-cancellation
type: STORY
title: Max Rejection Cancellation Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-11'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-052-096-automated-max-rejection-cancellation
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Max Rejection Cancellation Logic

## Context
When reviewing the DAG state, the Agile Coach observed several `TASK` and `PRD` nodes that reached the `MAX_REJECTION_THRESHOLD`. The nodes remained in `FAILED` status indefinitely instead of transitioning to `CANCELLED`. We need to ensure that nodes reaching this threshold are automatically cancelled.

## Requirements
Refactor the Foundry Orchestrator (`foundry-orchestrator.ts`) to automatically transition a node's status to `CANCELLED` when its `rejection_count` meets or exceeds `MAX_REJECTION_THRESHOLD`.

1. When a node is evaluated and `status === 'FAILED'`, if `rejection_count >= MAX_REJECTION_THRESHOLD`, change its status to `CANCELLED`.

## Acceptance Criteria
- [ ] Break down into Tasks.
