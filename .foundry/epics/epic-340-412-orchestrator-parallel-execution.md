---
id: epic-340-412-orchestrator-parallel-execution
type: EPIC
title: Orchestrator Parallel Variant Execution
status: READY
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-17'
depends_on:
  - epic-340-411-experiment-schema-updates
jules_session_id: null
pr_number: null
parent: prd-135-340-automated-agent-ab-testing-framework
tags:
  - orchestrator
  - parallelization
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Orchestrator Parallel Variant Execution

## Objective
Modify the Foundry orchestrator (`.github/scripts/foundry-orchestrator.ts`) to dynamically clone nodes that specify variants, dispatching them into parallel DAG execution paths.

## Scope
1. Detect experiment metadata during orchestrator parsing.
2. Clone nodes with distinct IDs and adjusted prompts/configurations.
3. Handle concurrency without DAG deadlocks or violating the single-owner invariant.

## Acceptance Criteria
- [x] Story Owner: Break down into Stories. Ensure that a final STORY dedicated exclusively to Integration and E2E Verification is generated and appropriately tagged with `e2e` or `integration`.
- [ ] story-412-477-detect-experiment-metadata
- [ ] story-412-478-node-cloning-logic
- [ ] story-412-479-dag-concurrency-management
- [ ] story-412-480-orchestrator-parallel-execution-e2e
