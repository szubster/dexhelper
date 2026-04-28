---
id: "task-032-049-qa-lifecycle-tests"
type: "TASK"
title: "QA: Lifecycle Integration Tests"
status: "COMPLETED"
owner_persona: "qa"
created_at: "2026-04-27"
updated_at: "2026-04-28"
depends_on:
  - ".foundry/tasks/task-032-048-implement-lifecycle-tests.md"
jules_session_id: null
parent: ".foundry/stories/story-009-032-lifecycle-integration-tests.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs", "qa"]
---

# QA: Lifecycle Integration Tests

## Overview
Verify the implementation of the lifecycle integration tests to ensure they accurately and robustly simulate the full orchestrator node pipeline.

## Verification Steps
- Validate that the integration tests correctly set up the simulated `.foundry` state.
- Ensure the tests cover the end-to-end IDEA -> PRD -> EPIC -> STORY -> TASK lifecycle using atomic node interactions.
- Confirm all new and existing tests pass.
- Log verification results and critical learnings in the QA journal at `.jules/qa.md`.

## Acceptance Criteria
- [x] Tests simulate a full IDEA -> PRD -> EPIC -> STORY -> TASK lifecycle using atomic files.
- [x] Implementation passes all verification criteria.
