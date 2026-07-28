---
id: task-070-276-001-verifying-block
type: TASK
title: Orchestrator VERIFYING Hierarchical Block Fix Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: '16023824777838054890'
pr_number: null
parent: story-070-276-orchestrator-verifying-block
tags:
  - orchestrator
  - bugfix
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Orchestrator VERIFYING Hierarchical Block Fix Implementation

## Objective
Remove the incorrect `VERIFYING` allowances in dependency and parent status checks so that a `VERIFYING` child/dependency correctly blocks or suspends the parent.

## Context
The orchestrator's `isHierarchicallyIncomplete` properly returns `true` when a node's status is `VERIFYING`. However, in `.github/scripts/foundry-orchestrator.ts`, in the Phase 3.5 (SUSPEND) and Phase 4 (RESOLVE) passes, there are direct conditional checks that explicitly treat `VERIFYING` as a "complete" state for dependencies and parents. This prevents the parent macro node from correctly staying blocked or suspending to `PENDING` when its descendant node reaches `VERIFYING`.

## Contracts and Directives
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- Intelligent Verification Protocol: This is a low-risk logic change to remove allowances. The Coder is designated to self-verify by ensuring all unit tests pass, and must document this verification in the task journal.

## Implementation Steps
1. In `.github/scripts/foundry-orchestrator.ts`, locate the dependency status check and parent status check logic. Ensure they explicitly check against `ACTIVE` and `COMPLETED` and do not include any allowance for `VERIFYING`. The story specifies finding and removing any `!== 'VERIFYING'` clauses around line 621 and line 723.
2. Update tests in `.github/scripts/foundry-orchestrator.test.ts` to ensure parent nodes correctly remain blocked or suspended when a child or dependency is in the `VERIFYING` state. Run tests locally (`pnpm test`) to ensure everything works properly.

## Acceptance Criteria
- [ ] In `.github/scripts/foundry-orchestrator.ts`, dependency checks strictly allow only `ACTIVE` and `COMPLETED` statuses.
- [ ] In `.github/scripts/foundry-orchestrator.ts`, parent status checks strictly allow only `ACTIVE` and `COMPLETED` statuses.
- [ ] Added/updated tests to verify that `VERIFYING` dependencies and children correctly block/suspend the parent.
- [ ] All tests pass successfully.
