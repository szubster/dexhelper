---
id: idea-067-visualize-implicit-dependencies
type: IDEA
title: Visualize Implicit Dependencies in UI
status: PENDING
owner_persona: product_manager
created_at: '2026-05-28'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - ui
  - dashboard
  - kanban
  - ux
research_references: []
rejection_count: 0
rejection_reason: ''
notes: 'Spawned by Auditor to capture UI updates required by orchestrator state machine changes.'
---

# Visualize Implicit Dependencies in UI

## The Problem
With the recent update to the Orchestrator to enforce hierarchical verification timing for macro nodes (parents block on children implicitly), the DAG Dashboard and Kanban Board might not visualize this dependency because it isn't explicitly listed in the `depends_on` array. This will cause confusion for users trying to understand why an Epic is stuck without explicit blockers showing on the UI.

## Goal
Update the `idea-017-dag-dashboard` and Kanban board components to visualize these implicit parent-child dependencies. This could be done through a special styling for parent-child edges or a distinct visual grouping so that the blocking nature is clear.
