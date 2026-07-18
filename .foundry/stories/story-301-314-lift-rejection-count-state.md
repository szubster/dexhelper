---
id: story-301-314-lift-rejection-count-state
type: STORY
title: Lift MAX_REJECTION_THRESHOLD Constant to Context
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-12'
updated_at: '2026-07-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-107-301-lift-rejection-count-state
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Lift MAX_REJECTION_THRESHOLD Constant to Context

## Objective
Extract the `MAX_REJECTION_THRESHOLD` constant (value: 3) from local file scopes into `DagContext.tsx` or a dedicated shared constants utility, and expose it through the React context layer.

## Requirements
1. Define `MAX_REJECTION_THRESHOLD = 3` in `DagContext.tsx`.
2. Expose this value through the `DagContextState` interface.
3. Provide the value in the `DagProvider`.

## Acceptance Criteria
- [x] Break down this STORY into TASK nodes
- [x] task-301-314-lift-rejection-count-state-impl
