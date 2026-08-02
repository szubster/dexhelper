---
id: task-336-388-implement-orchestrator-cycle-detection
type: TASK
title: Implement Orchestrator Cycle Detection
status: ACTIVE
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '8190986103606625335'
parent: story-338-336-implement-orchestrator-cycle-detection
tags:
  - foundry
  - orchestrator
rejection_count: 0
rejection_reason: ''
---

# Task: Implement Orchestrator Cycle Detection

## Context
We need to ensure robust circular dependency detection during the MAP or RESOLVE phases of the DAG orchestrator execution in `.github/scripts/foundry-orchestrator.ts`. The orchestrator must properly evaluate all `PENDING` nodes and their `depends_on` relationships to detect cycles (e.g., using a topological sort or DFS with a recursion stack).

## Requirements
- Ensure `foundry-orchestrator.ts` detects circular dependencies.
- Involved nodes must be transitioned to `FAILED`.
- A descriptive `rejection_reason` (e.g., "Circular dependency detected") must be appended in the frontmatter of failed nodes.
- Ensure logging outputs explicit warnings/error logs detailing the detected cycle in `--dry-run` or `--strict` mode.
- Update tests in `foundry-orchestrator.test.ts` to cover these behaviors.

## Acceptance Criteria
- [ ] Orchestrator detects circular dependencies and transitions involved nodes to `FAILED`.
- [ ] Descriptive `rejection_reason` is appended in the frontmatter of failed nodes.
- [ ] Tests verify this functionality without deadlocks.
