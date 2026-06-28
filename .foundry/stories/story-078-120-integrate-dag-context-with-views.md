---
id: story-078-120-integrate-dag-context-with-views
type: STORY
title: Integrate DagContext with Dashboard Views
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-28'
depends_on:
  - story-078-119-implement-dag-context-provider
jules_session_id: '8617718184112593029'
pr_number: null
parent: epic-046-078-shared-dag-context-foundation
tags:
  - architecture
  - dashboard
  - state-management
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate DagContext with Dashboard Views

## Objective
Update the existing DAG views (e.g., the React Flow DAG visualizer) to consume the shared `DagContext` data instead of managing state locally.

## Context
Following the creation of `DagProvider` (ADR 013), existing visualization components must be refactored to consume the unified DAG data (nodes, edges, and `rejection_count`). This ensures consistent state across the UI.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-120-236-refactor-dagdashboard-context-impl
- [ ] task-120-237-refactor-dagdashboard-context-qa
