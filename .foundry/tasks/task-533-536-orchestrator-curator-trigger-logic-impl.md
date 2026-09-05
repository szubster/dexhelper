---
id: task-533-536-orchestrator-curator-trigger-logic-impl
type: TASK
title: Orchestrator Curator Trigger Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
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

# Orchestrator Curator Trigger Logic Implementation

## Summary
Implement the logic in \`.github/scripts/foundry-orchestrator.ts\` to trigger the \`curator\` persona when a feature is considered fully "implemented" but before final archival/verification.

## Requirements
- Update the DAG processing logic in \`.github/scripts/foundry-orchestrator.ts\` to recognize the state where a feature is fully "implemented" (e.g. \`COMPLETED\` state of an IDEA or EPIC node before it gets fully verified/archived, or before transitioning to \`VERIFYING\`).
- Specifically, the \`curator\` should be triggered on \`IDEA\` nodes when they transition to \`VERIFYING\` or \`COMPLETED\` state to allow for a holistic review.
- Define the exact trigger condition.
- Ensure the orchestrator can enqueue the \`curator\` execution when this condition is met.
- Write unit tests for this new trigger logic in \`.github/scripts/tests/foundry-orchestrator.test.ts\` (or similar test file).
