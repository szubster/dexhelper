---
id: task-563-579-implement-complexity-validation
type: TASK
title: Implement complexity validation for STORY to TASK breakdown
status: READY
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on:
  - task-563-578-complexity-validation-tests
jules_session_id: null
parent: story-552-563-story-to-task-complexity-validation
tags: []
rejection_reason: ''
locks: []
---

# TASK: Implement complexity validation for STORY to TASK breakdown

## Description
This task involves implementing an automated validation step in the Foundry Orchestrator (`.github/scripts/foundry-orchestrator.ts`). The goal is to analyze the breakdown of a `STORY` into `TASK` nodes, identifying and flagging instances of the "Two-Tasks-Max" anti-pattern.

## Context
The Tech Lead persona is responsible for breaking down a `STORY` into `TASK` nodes. We want to enforce modular decomposition and prevent complex stories from being split into only 1 or 2 monolithic tasks.

This task requires modifying the dag evaluation logic in `.github/scripts/foundry-orchestrator.ts`. When a `STORY` transitions or has its generated child links validated, the orchestrator should check the number of generated `TASK` nodes against the complexity of the story. If a violation is detected, it should log warnings or promote the task breakdown generation to `FAILED`.

## Acceptance Criteria
- [ ] Implement logic in `.github/scripts/foundry-orchestrator.ts` to analyze the generated child `TASK` nodes for a `STORY`.
- [ ] Add a heuristic to flag the "Two-Tasks-Max" anti-pattern (e.g., checking the number of tasks vs number of acceptance criteria).
- [ ] Ensure violations are handled by failing the `STORY` node verification.
