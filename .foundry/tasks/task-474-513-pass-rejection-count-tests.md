---
id: task-474-513-pass-rejection-count-tests
type: TASK
title: Write Unit Tests for rejection_count in DagContext
status: READY
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on:
  - task-474-512-pass-rejection-count-impl
jules_session_id: null
pr_number: null
parent: story-071-474-pass-rejection-count-context
tags:
  - data
  - dashboard
  - context
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Write Unit Tests for rejection_count in DagContext

## 1. Context & Objectives
This task implements `story-071-474-pass-rejection-count-context`. Following the "Two-Tasks-Max Anti-pattern" explicitly required by `.foundry/docs/knowledge_base/agents/core_policies.md`, unit testing must be separated into its own distinct modular TASK node. We need to verify that `DagProvider` correctly passes the `rejection_count` state to the React flow context.

## 2. Requirements
- Write unit tests in `src/components/dashboard/__tests__/DagContext.test.tsx`.
- Ensure tests verify that `node.data.rejection_count` correctly exists in the nodes returned by `useDagContext()` and matches the provided mocked data.

## 3. Acceptance Criteria
- [ ] Unit tests are written to verify `rejection_count` state mapping in `DagProvider`.
- [ ] Tests pass cleanly with `pnpm test`.
