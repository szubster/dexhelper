---
id: task-119-204-dag-context-provider-impl
type: TASK
title: Implement DagContext and Provider Impl
status: READY
owner_persona: coder
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-078-119-implement-dag-context-provider
tags:
  - architecture
  - dashboard
  - state-management
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement DagContext and Provider Impl

## Overview
Implement the `DagContext` React Context and `DagProvider` component to host the shared DAG data state globally.

**Notice for Coder**: This component is already mostly implemented in `src/components/dashboard/DagContext.tsx` but we need to ensure it meets the requirements of ADR 013 (Kanban Board State Management) and ADR 017 (Permanent Failure Dashboard). You should verify and fix the implementation if needed. Please follow the Empty PR Policy: check off all Acceptance Criteria checkboxes and submit an empty PR if the code is already correct.

## Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify that `DagContext` and `DagProvider` manage `nodes` and `edges` state.
- [ ] Verify that `DagNodeData` includes `rejection_count` (ADR 017).
- [ ] Verify that `DagProvider` provides state correctly.
