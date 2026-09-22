---
id: task-563-578-complexity-validation-tests
type: TASK
title: Write unit tests for complexity validation in Foundry Orchestrator
status: READY
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
parent: story-552-563-story-to-task-complexity-validation
tags: []
rejection_count: 2
rejection_reason: ''
locks: []
---

# TASK: Write unit tests for complexity validation in Foundry Orchestrator

## Description
This task focuses on writing the unit tests for the complexity validation heuristic before or alongside its implementation. The heuristic aims to prevent the "Two-Tasks-Max" anti-pattern when a `STORY` is broken down into `TASK` nodes by the `tech_lead`.

## Context
The Tech Lead persona breaks down a `STORY` into `TASK` nodes. A common anti-pattern, "Two-Tasks-Max", occurs when a complex story is simply broken down into exactly two tasks (e.g., one monolithic coder task and one QA task). As detailed in `.foundry/docs/knowledge_base/agents/task_breakdown.md`, we want to enforce modular decomposition.

Tests should be added to `.github/scripts/foundry-orchestrator.test.ts` (or equivalent test file) to ensure that if a `STORY` node spawns `TASK` children and the count is low (e.g., <= 2) and the `STORY` is deemed complex (e.g., multiple acceptance criteria), the orchestrator flags it, likely promoting the node to `FAILED` with a specific reason.

## Acceptance Criteria
- [ ] Add unit tests in `.github/scripts/foundry-orchestrator.test.ts` for the "Two-Tasks-Max" anti-pattern validation.
- [ ] Ensure tests cover both positive cases (valid breakdown) and negative cases (anti-pattern).
