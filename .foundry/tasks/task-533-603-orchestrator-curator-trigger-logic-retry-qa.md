---
id: task-533-603-orchestrator-curator-trigger-logic-retry-qa
type: TASK
title: Orchestrator Curator Trigger Logic Retry QA
status: READY
owner_persona: qa
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on:
  - task-533-602-orchestrator-curator-trigger-logic-retry-impl
jules_session_id: null
parent: story-531-533-orchestrator-trigger-logic-updates
tags:
  - orchestrator
  - curator
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator Curator Trigger Logic Retry QA

## Summary
Verify the implementation of the `curator` trigger logic in the DAG Orchestrator based on the findings from the research task.

## Requirements
- Review the code changes in `.github/scripts/foundry-orchestrator.ts`.
- Ensure the trigger condition accurately fires under the conditions specified in the research task's findings.
- Verify the orchestrator accurately enqueues the `curator` persona.
- Ensure the unit tests cover the new trigger logic and all tests pass.
