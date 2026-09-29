---
id: idea-532-e2e-dependency-validator-lint
title: Automated E2E Task Dependency Linter Guard in Orchestrator DAG Validation
type: IDEA
status: READY
owner_persona: product_manager
created_at: '2026-09-29T06:00:00.000Z'
updated_at: '2026-09-29T06:00:00.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - process
  - dag
  - lint
research_references: []
notes: ''
locks: []
priority: 50
rejection_reason: ''
---

# Automated E2E Task Dependency Linter Guard in Orchestrator DAG Validation

## Executive Summary
Generative personas (Tech Lead, Story Owner) decompose stories into implementation tasks and E2E verification tasks. If an E2E verification task is created without an explicit `depends_on` array referencing its corresponding code implementation task, the Orchestrator dispatches the E2E task prematurely. Because the implementation is not yet built, the E2E test fails, triggering retry loops that cause upstream or peer tasks to exceed their Max Rejection Count and permanently fail.

This proposal introduces an automated linter guard within `.github/scripts/verify-dag-refs.ts` and the Orchestrator heartbeat validation step. The linter will inspect all `TASK` nodes tagged with `e2e` or containing `e2e` in their title/slug and verify that they have an explicit `depends_on` link pointing to an implementation task before allowing the node to enter `READY` state.

## Value Proposition
- **Eliminates Premature E2E Execution**: Prevents E2E verification tasks from running prior to feature code implementation.
- **Prevents Cascade Failures**: Stops retry loop cascades that hit Max Rejection Count and permanently fail parent stories/tasks.
- **Enforces DAG Integrity**: Ensures deterministic task sequencing across generated feature sub-trees.

## Acceptance Criteria
- [ ] Extend `.github/scripts/verify-dag-refs.ts` to inspect E2E tasks for mandatory `depends_on` implementation task linkages.
- [ ] Add unit tests verifying that unlinked E2E tasks fail DAG verification during `pnpm test`.
- [ ] Integrate E2E dependency assertions into Orchestrator node dispatch logic.
