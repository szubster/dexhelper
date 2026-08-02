---
id: task-336-389-orchestrator-cycle-detection-qa
type: TASK
title: QA Orchestrator Cycle Detection
status: ACTIVE
owner_persona: qa
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on:
  - task-336-388-implement-orchestrator-cycle-detection
jules_session_id: '6607903321732293864'
parent: story-338-336-implement-orchestrator-cycle-detection
tags:
  - qa
rejection_count: 0
rejection_reason: ''
---

# Task: QA Orchestrator Cycle Detection

## Context
Verify the implementation of circular dependency detection in `.github/scripts/foundry-orchestrator.ts`.

## Acceptance Criteria
- [x] Orchestrator detects circular dependencies and transitions involved nodes to `FAILED`.
- [x] Descriptive `rejection_reason` is appended in the frontmatter of failed nodes.
- [x] Tests verify this functionality without deadlocks.