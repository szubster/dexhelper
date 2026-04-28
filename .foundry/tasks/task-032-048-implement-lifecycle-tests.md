---
id: "task-032-048-implement-lifecycle-tests"
type: "TASK"
title: "Implement Lifecycle Integration Tests"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-27"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: "6436071748205500985"
parent: ".foundry/stories/story-009-032-lifecycle-integration-tests.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Implement Lifecycle Integration Tests

## Overview
Write integration tests that simulate a complete lifecycle using atomic nodes to ensure the orchestrator handles realistic end-to-end scenarios without failure.

## Technical Blueprint
- Set up a mock `.foundry` directory structure or use virtual file system for tests.
- Create mock atomic files representing an `IDEA`, `PRD`, `EPIC`, `STORY`, and `TASK` following the project schema.
- Run the orchestrator logic against these files to simulate promotion and lifecycle transitions.
- Assert that the nodes correctly transition through statuses as dependencies are met and that the DAG resolves without deadlocks.

## Acceptance Criteria
- [ ] Integration tests simulate a full IDEA -> PRD -> EPIC -> STORY -> TASK lifecycle using atomic files.
