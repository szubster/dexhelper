---
id: story-072-677-refactor-dashboard-views
type: STORY
title: Refactor other DAG views to consume DagContext
status: FAILED
owner_persona: tech_lead
created_at: '2026-10-14'
updated_at: '2026-11-20'
depends_on:
  - story-072-676-refactor-dag-visualizer
jules_session_id: null
pr_number: null
parent: epic-045-072-refactor-views
tags: []
rejection_count: 0
rejection_reason: >-
  Two-Tasks-Max anti-pattern detected: Complex STORY broken down into too few
  TASK nodes
notes: ''
locks: []
---

# Refactor other DAG views to consume DagContext

## Overview
Ensure other views in the DagDashboard (e.g., Kanban, Permanent Failures) consume data seamlessly from `DagContext`.

## Requirements
- Refactor Kanban and Permanent Failures views to use `DagContext`.
- Verify seamless rendering across different views.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-677-734-refactor-kanban-permanent-failures-views
- [x] task-677-735-refactor-dashboard-views-e2e-qa
