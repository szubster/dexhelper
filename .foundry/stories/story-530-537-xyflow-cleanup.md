---
id: story-530-537-xyflow-cleanup
type: STORY
title: "Remove xyflow dependencies and cleanup Vite config"
status: PENDING
owner_persona: "tech_lead"
created_at: "2026-09-05"
updated_at: "2026-09-05"
depends_on:
  - story-530-536-dagtree-ui-logic
jules_session_id: null
locks: []
pr_number: null
parent: epic-516-530-replace-xyflow-core
tags:
  - performance
  - bundle-size
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Story: Remove xyflow dependencies and cleanup Vite config

## Objective
Remove the `@xyflow/react`, `dagre`, and associated chunking configurations from the build after replacing it with a custom lightweight tree UI component.

## Scope
1. Remove `@xyflow/react` and `dagre` from dependencies.
2. Clean up associated chunking configurations in `vite.config.ts`.
3. Clean up any related application logic or store data specifically used for xyflow.

## Acceptance Criteria
- [ ] Break down into Tasks to cleanup dependencies and config.
- [ ] `@xyflow/react` and `dagre` removed from `package.json`.
- [ ] `vite.config.ts` cleanup applied.
- [ ] Stale data logic removed from the DAG store.
