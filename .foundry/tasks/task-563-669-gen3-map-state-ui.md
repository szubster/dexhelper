---
id: task-563-669-gen3-map-state-ui
type: TASK
title: Connect Gen 3 Map State to UI
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-563-668-gen3-map-state-store
jules_session_id: null
pr_number: null
parent: story-552-563-gen3-map-state-management
tags:
  - dexhelper
  - gen3
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Connect Gen 3 Map State to UI

## Objective
Connect the Zustand state store to the sidebar/topbar control panel.

## Context
The state store created in the previous task needs to be wired up to the UI components.

## Scope
- Update the Gen 3 Map control panel UI components to consume and update the Zustand store.
- Follow tactical hardware/snooping aesthetic (ADR 008).

## Acceptance Criteria
- [ ] UI components are successfully connected to the Zustand store.
- [ ] Toggling layers updates the state.
- [ ] Selecting features updates the state.
- [ ] Unit tests for the UI components are written and pass.
