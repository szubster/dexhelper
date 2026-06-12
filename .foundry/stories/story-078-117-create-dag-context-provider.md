---
id: story-078-117-create-dag-context-provider
type: STORY
title: Create DagContext and Provider
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on:
  - story-078-116-parse-rejection-count
jules_session_id: null
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

# Create DagContext and Provider

## Objective
Implement the `DagContext` React context and its provider component to serve as the single source of truth for DAG data across all dashboard views.

## Context
Following ADR 013 and ADR 017, the React Flow visualization and future Kanban/Failure views must not maintain their own parsed node state. This story creates the shared React Context (`DagContext`) and a Provider component that will fetch/parse the DAG data (now including `rejection_count` from the previous story) and expose it globally to child components. We will use the types defined in `story-070-108-create-dag-context-interfaces.md`.

## Acceptance Criteria
- [ ] Break down into Tasks
