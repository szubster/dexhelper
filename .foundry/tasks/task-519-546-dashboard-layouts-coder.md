---
id: task-519-546-dashboard-layouts-coder
type: TASK
title: Refactor Dashboard Layout Components
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03T13:29:59.884Z'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '12876304656360962418'
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

# Task: Refactor Dashboard Layout Components

## Context
Refactor components in `src/components/dashboard/` to use the new Tailwind v4 `@utility` classes.

## Objectives
- Replace redundant inline classes (e.g., `border border-dashed rounded-none bg-zinc-900/50 text-zinc-100 font-mono`) with `tactical-panel`.
- Update text styling using `tactical-text`.
- Maintain the tactical hardware aesthetic.

## Acceptance Criteria
- [ ] Components in `src/components/dashboard/` are updated to use semantic `@utility` classes.
