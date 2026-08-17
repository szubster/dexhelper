---
id: epic-107-344-update-dashboard-rejection-count
type: EPIC
title: Update UI Views with Lifted Constant
status: READY
owner_persona: story_owner
created_at: '2026-07-22'
updated_at: '2026-08-17'
depends_on:
  - epic-107-343-lift-rejection-count-state
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

# Update UI Views with Lifted Constant

## Objective
Update UI components and related tests to use the `MAX_REJECTION_THRESHOLD` constant exposed by `DagContext` instead of a hardcoded value.

## Context
With the threshold for permanent failures extracted to the React Context, the UI components need to be refactored to consume this value.

## Requirements
1. Update `DagDashboard.tsx` to use the exposed threshold when filtering nodes for the "Permanent Failures" view.
2. Update `DagNode.tsx` to use the exposed threshold when applying permanent failure styles.
3. Update any other related test files to use the shared constant.

## Acceptance Criteria
- [ ] Break down into Stories
