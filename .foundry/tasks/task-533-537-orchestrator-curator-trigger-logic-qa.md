---
id: task-533-537-orchestrator-curator-trigger-logic-qa
type: TASK
title: Orchestrator Curator Trigger Logic QA
status: PENDING
owner_persona: qa
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on:
  - task-533-536-orchestrator-curator-trigger-logic-impl
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

# Orchestrator Curator Trigger Logic QA

## Summary
Verify the implementation of the \`curator\` trigger logic in the DAG Orchestrator.

## Requirements
- Review the code changes in \`.github/scripts/foundry-orchestrator.ts\`.
- Ensure the trigger condition accurately fires under the specified conditions (when a feature is fully "implemented" but before final archival/verification).
- Verify the orchestrator accurately enqueues the \`curator\` persona.
- Ensure the unit tests cover the new trigger logic and all tests pass.
