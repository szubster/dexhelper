---
id: task-544-551-dynamic-node-spawning-heartbeat-tests
type: TASK
title: Tests for Dynamic Node Spawning in foundry-heartbeat
status: PENDING
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-544-549-dynamic-node-spawning-heartbeat
jules_session_id: null
pr_number: null
parent: story-539-544-implement-dynamic-node-spawning
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Tests for Dynamic Node Spawning in foundry-heartbeat

## Description
Write and update unit tests in `foundry-heartbeat.test.ts` to cover the new late-binding demotion logic implemented in `foundry-heartbeat.ts`.
Ensure that the tests correctly mock nodes with and without spawned children, and verify that macro nodes and parents transition to `PENDING` instead of `FAILED` when they have unchecked acceptance criteria. Verify that leaf nodes transition to `FAILED` with a proper rejection reason.

## Acceptance Criteria
- [ ] Update `foundry-heartbeat.test.ts` to cover scenarios for late-binding nodes.
- [ ] Ensure tests cover the macro node condition.
- [ ] Ensure tests cover the spawned children condition.
- [ ] Ensure tests cover the leaf node failure condition.
