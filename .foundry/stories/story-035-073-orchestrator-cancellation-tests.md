---
id: story-035-073-orchestrator-cancellation-tests
type: STORY
title: Add Unit Tests for DAG Auto-Cancellation
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-20'
updated_at: '2026-05-23'
depends_on:
jules_session_id: null
pr_number: null
parent: epic-028-035-orchestrator-auto-cancel-orphaned-nodes
tags:
  - orchestrator
  - testing
  - auto-cancel
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Add Unit Tests for DAG Auto-Cancellation

## Objective
Add specific unit tests in `.github/scripts/foundry-orchestrator.test.ts` to verify the functionality of auto-canceling `PENDING` nodes that depend on permanently `FAILED` nodes.

## Acceptance Criteria
- [x] Add unit tests verifying that dependent `PENDING` nodes are correctly transitioned to `CANCELLED` when their dependency hits the max rejection count.
- [x] Add unit tests verifying the exact `rejection_reason` string formatting.
- [x] Test the anti-loop / cycle prevention mechanisms of the cancellation logic.


## Tasks
- .foundry/archive/.foundry/archive/tasks/task-073-140-impl-cancellation-unit-tests.md
- .foundry/tasks/task-073-141-qa-cancellation-unit-tests.md
