---
id: task-566-683-qa-blocked-diagnosis-retry-v3
type: TASK
title: QA Verification for Orchestrator BLOCKED Diagnosis (Retry v3)
status: PENDING
owner_persona: qa
created_at: '2026-10-15T18:29:01.995Z'
updated_at: '2026-10-15'
depends_on:
  - task-566-682-orchestrator-diagnosis-tests-retry-v3
jules_session_id: null
pr_number: null
parent: story-552-566-orchestrator-diagnosis-artifact
tags:
  - foundry
  - orchestrator
  - dag
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Verification for Orchestrator BLOCKED Diagnosis (Retry v3)

## Description
Verify that the orchestrator correctly detects `BLOCKED` states and generates the diagnosis artifact without regressions. Run orchestrator test suite locally to verify tests are actually passing.

## Acceptance Criteria
- [ ] Verify BLOCKED diagnosis artifact generation is correctly implemented in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Verify tests in `.github/scripts/foundry-orchestrator.test.ts` cover the new logic.
- [ ] Run `cd packages/foundry && npx vitest` to confirm tests pass.
