---
id: task-618-723-highlight-ui-presentation
type: TASK
title: Multi-Box Search Highlight UI Presentation
status: READY
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on:
  - task-618-722-highlight-state-layer
jules_session_id: null
pr_number: null
parent: story-576-618-multi-box-search-visual-highlighting
tags:
  - dexhelper
  - react
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Multi-Box Search Highlight UI Presentation

## Objectives
- Consume the highlight state layer in the box components.
- Apply dimming to non-matching Pokémon while preserving spatial layout.
- Strictly adhere to ADR 008 tactical aesthetics (sharp edges, dashed borders, monospaced fonts).

## Contract
- The coder must implement the presentation layer consuming the context.
