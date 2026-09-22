---
id: task-533-602-orchestrator-curator-trigger-logic-retry-impl
type: TASK
title: Orchestrator Curator Trigger Logic Retry Implementation
status: PENDING
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-21'
depends_on:
  - research-533-601-investigate-curator-trigger-logic-failure
jules_session_id: null
parent: story-531-533-orchestrator-trigger-logic-updates
tags:
  - orchestrator
  - curator
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator Curator Trigger Logic Retry Implementation

## Summary
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to trigger the `curator` persona when a feature is considered fully "implemented" based on the findings from the research task.

## Requirements
- Review the findings and recommendations from `research-533-601-investigate-curator-trigger-logic-failure`.
- Update the DAG processing logic in `.github/scripts/foundry-orchestrator.ts` to trigger the `curator` persona under the exact conditions identified in the research.
- Ensure the orchestrator accurately enqueues the `curator` execution when these conditions are met.
- Write unit tests for this new trigger logic in `.github/scripts/tests/foundry-orchestrator.test.ts`.
