---
id: task-618-748-highlight-ui-presentation-retry
type: TASK
title: Multi-Box Search Highlight UI Presentation Retry
status: READY
owner_persona: coder
created_at: '2026-11-09'
updated_at: '2026-11-09'
depends_on:
  - research-618-747-highlight-ui-presentation-failure-root-cause
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

# Task: Multi-Box Search Highlight UI Presentation Retry

## Objectives
- Consume the highlight state layer in the box components.
- Apply dimming to non-matching Pokémon while preserving spatial layout.
- Strictly adhere to ADR 008 tactical aesthetics (sharp edges, dashed borders, monospaced fonts).

## Contract
- The coder must implement the presentation layer consuming the context.
