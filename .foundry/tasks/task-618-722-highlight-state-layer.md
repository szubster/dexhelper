---
id: task-618-722-highlight-state-layer
type: TASK
title: Multi-Box Search Highlight State Layer
status: PENDING
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-31'
depends_on:
  - research-618-721-highlight-failure-root-cause
jules_session_id: null
pr_number: null
parent: story-576-618-multi-box-search-visual-highlighting
tags:
  - dexhelper
  - react
  - state
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Multi-Box Search Highlight State Layer

## Objectives
- Implement the React Context layer for search highlighting to satisfy ADR 013 (no local state for shared domains).
- Define state structures and hooks for managing which Pokémon are highlighted vs dimmed based on active search/filters.
- Integrate the provider into the application root/module.

## Contract
- The coder must define the Context layer and ensure it's available for the UI components.
