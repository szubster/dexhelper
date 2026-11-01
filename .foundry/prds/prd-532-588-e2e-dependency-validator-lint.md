---
id: prd-532-588-e2e-dependency-validator-lint
type: PRD
title: >-
  PRD - Automated E2E Task Dependency Linter Guard in Orchestrator DAG
  Validation
status: PENDING
owner_persona: auditor
created_at: '2026-10-17T20:29:56.382Z'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-532-e2e-dependency-validator-lint
tags:
  - foundry
  - process
  - dag
  - lint
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Product Requirements Document: Automated E2E Task Dependency Linter Guard

## 1. Introduction & Context
Generative personas break down features into stories, which are then split into code implementation and E2E testing tasks. A major issue observed is that when an E2E test task is missing an explicit `depends_on` requirement linking it to its corresponding implementation task, the Orchestrator prematurely executes the E2E task. This leads to immediate test failures, triggering retry loops, and eventually maxing out the rejection count, permanently failing the task or upstream stories. This PRD outlines the requirements for enforcing a strict linter guard during the Orchestrator DAG validation to ensure E2E tasks are properly linked.

## 2. Objectives
- Ensure that no `TASK` node designated for E2E testing enters the `READY` state without an explicit dependency on an implementation task.
- Improve system stability by eliminating failure loops caused by premature E2E test execution.
- Strengthen DAG integrity and enforce strict sequence validation in the Orchestrator heartbeat.

## 3. Product Requirements
1. **DAG Script Extension**: The existing DAG validation script (`.github/scripts/verify-dag-refs.ts`) must identify E2E tasks and verify that they have a non-empty `depends_on` array containing at least one valid implementation task. E2E tasks are identifiable by having the `e2e` tag or the string "e2e" in the title or slug.
2. **Orchestrator Integration**: The Orchestrator (`packages/foundry/foundry-orchestrator.ts`) dispatch logic must incorporate the same dependency check, blocking node dispatch and marking the node as invalid if it fails the E2E dependency rule.
3. **Automated Testing**: Robust unit testing must be added to cover the new linter rules, ensuring that tasks missing dependencies fail the verification steps locally via `pnpm test`.

## 4. Acceptance Criteria
- [ ] epic-588-693-dag-validation-script-extension
- [ ] epic-588-694-orchestrator-dispatch-integration
- [ ] epic-588-695-dependency-validation-test-suite
- [ ] Implement the E2E dependency linter rule in `.github/scripts/verify-dag-refs.ts`.
- [ ] Add the dependency validation rule to the Orchestrator's node dispatch validation step.
- [ ] Write unit tests to cover passing and failing E2E dependency scenarios.
- [ ] Ensure that `pnpm test` executes these validations and they perform as expected.
