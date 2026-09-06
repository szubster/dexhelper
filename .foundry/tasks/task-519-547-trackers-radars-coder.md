---
id: task-519-547-trackers-radars-coder
type: TASK
title: Refactor Specialized Tracker and Radar Components
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03T13:29:59.884Z'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '6561075636704123336'
pr_number: null
parent: story-125-519-refactor-complex-dashboard
tags:
  - styling
  - refactor
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Refactor Specialized Tracker and Radar Components

## Context
Refactor specialized tracker UIs (e.g., `PokerusBadge.tsx`) in `src/components/` to use the new Tailwind v4 `@utility` classes.

## Objectives
- Replace redundant inline classes with appropriate `tactical-*` classes (e.g., `tactical-panel`, `tactical-badge`).
- Update text styling using `tactical-text`.
- Maintain the tactical hardware aesthetic.

## Acceptance Criteria
- [ ] Specialized tracker and radar components are updated to use semantic `@utility` classes.
