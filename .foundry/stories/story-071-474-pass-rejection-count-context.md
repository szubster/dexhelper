---
id: story-071-474-pass-rejection-count-context
type: STORY
title: Pass Rejection Count to DagContext
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-09-03'
depends_on:
  - story-071-473-extract-rejection-count
jules_session_id: null
pr_number: null
parent: epic-045-071-refactor-data-parsing-layer
tags:
  - data
  - dashboard
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pass Rejection Count to DagContext

## Overview
Once extracted, the `rejection_count` must be passed along with the rest of the node data to the `DagContext` so it can be consumed by the UI components.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-474-512-pass-rejection-count-impl
- [x] task-474-513-pass-rejection-count-tests
- [x] task-474-514-pass-rejection-count-qa
