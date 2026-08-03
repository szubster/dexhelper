---
id: story-343-352-lift-rejection-constant-impl
type: STORY
title: Extract MAX_REJECTION_THRESHOLD Constant
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-02'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: '17146971052426948681'
pr_number: null
parent: epic-107-343-lift-rejection-count-state
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract MAX_REJECTION_THRESHOLD Constant

## Objective
Extract the `MAX_REJECTION_THRESHOLD` constant (value: 3) from local file scopes into `DagContext.tsx` or a dedicated shared constants utility.

## Context
Required by ADR 017. The value is currently hardcoded in multiple files.

## Requirements
1. Extract `MAX_REJECTION_THRESHOLD` to a shared context/constants file.
2. Update usages in `DagDashboard.tsx`, `DagNode.tsx`, etc., to use the lifted constant.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-352-388-lift-rejection-constant-impl
- [ ] task-352-389-lift-rejection-constant-qa
