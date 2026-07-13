---
id: task-276-304-orchestrator-verifying-block
type: TASK
title: Remove VERIFYING allowances in orchestrator dependency checks
status: ACTIVE
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: '8104441445389634699'
pr_number: null
parent: story-070-276-orchestrator-verifying-block
tags:
  - orchestrator
  - bugfix
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Remove VERIFYING allowances in orchestrator dependency checks

## Objective
Update `.github/scripts/foundry-orchestrator.ts` to ensure that a `VERIFYING` child/dependency correctly blocks or suspends the parent.

## Context
The orchestrator's `isHierarchicallyIncomplete` properly returns `true` when a node's status is `VERIFYING`. However, in the Phase 3.5 (SUSPEND) and Phase 4 (RESOLVE) passes, there are direct conditional checks that explicitly treat `VERIFYING` as a "complete" state for dependencies and parents. This prevents the parent macro node from correctly staying blocked or suspending to `PENDING` when its descendant node reaches `VERIFYING`.

## Instructions for Coder
1. In `.github/scripts/foundry-orchestrator.ts`, find the dependency check (around line 644) and remove the `&& dep.frontmatter.status !== 'VERIFYING'` condition.
2. In the same file, find the parent status check (around line 746) and remove the `&& parentStatus !== 'VERIFYING'` condition.
3. This is a simple/low-risk change, so no separate QA task has been created. You MUST self-verify your work and document the verification in your task journal.
4. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
5. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
6. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Removed `&& dep.frontmatter.status !== 'VERIFYING'` from the dependency check in `.github/scripts/foundry-orchestrator.ts`.
- [x] Removed `&& parentStatus !== 'VERIFYING'` from the parent status check in `.github/scripts/foundry-orchestrator.ts`.
