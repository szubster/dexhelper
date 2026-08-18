---
id: epic-107-343-lift-rejection-count-state
type: EPIC
title: Lift Constant and Update Context
status: COMPLETED
owner_persona: story_owner
created_at: '2026-07-22'
updated_at: '2026-08-17'
depends_on:
  - research-107-342-investigate-lift-rejection-count-failure
jules_session_id: null
pr_number: null
parent: prd-085-107-lift-rejection-count-state
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Lift Constant and Update Context

## Objective
Extract the `MAX_REJECTION_THRESHOLD` constant (value: 3) from local file scopes into `DagContext.tsx` or a dedicated shared constants utility.

## Context
Currently, the threshold for determining if a node has permanently failed (`rejection_count >= 3`) is hardcoded in several components. Lifting this state is required by ADR 017.

## Requirements
1. Extract `MAX_REJECTION_THRESHOLD = 3` to `DagContext.tsx` or a shared constants file.

## Acceptance Criteria
- [x] Break down into Stories
- [x] story-343-352-lift-rejection-constant-impl
- [x] story-343-353-lift-rejection-constant-e2e
