---
id: task-523-590-living-dex-state-connection-impl
type: TASK
title: Connect Living Dex Grid to Application PC/Party State
status: READY
owner_persona: coder
created_at: '2026-09-18T08:31:28Z'
updated_at: '2026-09-18T08:31:28Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-134-523-living-dex-state-overlay
tags:
  - logic
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Connect Living Dex Grid to Application PC/Party State

## Context
As part of the Living Dex Grid, we need to map the application's global PC box and Party state into a format that the UI grid can easily consume.

## Acceptance Criteria
- [ ] Implement data logic (e.g. via a hook or context wrapper) to subscribe to the application's global PC box and Party state.
- [ ] Transform the state into a map/structure that efficiently dictates which Pokemon IDs are owned and present in the PC box or Party.
