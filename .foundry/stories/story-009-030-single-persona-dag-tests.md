---
id: "story-009-030-single-persona-dag-tests"
type: "STORY"
title: "Story: Single-Persona DAG Resolution Unit Tests"
status: READY
owner_persona: "tech_lead"
created_at: "2026-04-27"
updated_at: "2026-04-28"
depends_on:
  - .foundry/tasks/task-030-048-implement-single-persona-dag-tests.md
jules_session_id: null
parent: ".foundry/epics/epic-009-atomic-handoff-testing.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Story: Single-Persona DAG Resolution Unit Tests

## Overview
Implement unit tests to verify that the orchestrator's DAG resolution logic properly handles strictly single-persona nodes and errors out on multiple personas.

## Acceptance Criteria
- [x] Unit tests cover single-persona node parsing and resolution without errors.
- [x] Unit tests verify rejection of nodes with invalid `owner_persona` definitions.

### Tasks
- `.foundry/tasks/task-030-048-implement-single-persona-dag-tests.md`
