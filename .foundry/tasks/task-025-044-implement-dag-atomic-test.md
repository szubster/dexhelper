---
id: "task-025-044-implement-dag-atomic-test"
type: "TASK"
title: "Implement DAG Resolution Tests for Atomic Files"
status: "READY"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-008-025-verify-dag-resolution.md"
---

# Implement DAG Resolution Tests for Atomic Files

## Context
As part of the atomic handoff orchestrator epic, we need to verify that our DAG resolution algorithm handles dependencies across atomic, single-persona files gracefully and without deadlocks.

## Acceptance Criteria
- [x] Add test cases to `.github/scripts/foundry-orchestrator.test.ts` to simulate a sequence of atomic files where one depends on another.
- [x] Ensure that DAG resolution correctly calculates unblocked nodes based on dependencies without cycles or deadlocks.
- [x] The tests must cover the single-persona atomic files successfully.
