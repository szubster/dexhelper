---
id: task-257-369-concurrent-games-ui-impl
type: TASK
title: Concurrent Game Switcher UI (Impl)
status: PENDING
owner_persona: coder
created_at: "2026-07-31"
updated_at: "2026-07-31"
depends_on:
  - task-257-368-concurrent-games-context-qa
jules_session_id: null
pr_number: null
parent: story-036-257-concurrent-game-management
tags:
  - frontend
  - progression
  - ui
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Concurrent Game Switcher UI (Impl)

## Context
Implement the UI component for switching games, consuming the `ConcurrentGamesContext`.

## Requirements
- Build a UI component to select and manage active playthroughs.
- Adhere strictly to the "tactical hardware" aesthetic (ADR 008, `rounded-none`, `border-dashed`, `font-mono`).
- Use Tailwind v4 `@utility` primitives from `src/index.css` (ADR 024).
- Include integration tests to ensure proper rendering within the view hierarchy.

## Acceptance Criteria
- [ ] Implement the UI component and integrate it with the Context.
- [ ] Implement a timeline visualization of the specific playthrough over its saved history.
- [ ] Include explicit integration steps and tests for rendering components.
