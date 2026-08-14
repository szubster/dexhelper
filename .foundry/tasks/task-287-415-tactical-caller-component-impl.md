---
id: task-287-415-tactical-caller-component-impl
type: TASK
title: Implement Tactical Caller Card Component
status: READY
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-118-287-highlight-high-value-calls-ui
tags:
  - feature
  - gen2
  - ui
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Implement Tactical Caller Card Component

## Objective
Implement a reusable `TacticalCallerCard` UI component to visually differentiate callers based on their `CallerType` (e.g., SWARM, ITEM, STANDARD), adhering to the tactical hardware aesthetic.

## Context
We need to visually highlight high-value callers (those offering swarms or items) in the Active Callers Dashboard. This task focuses purely on building the underlying reusable React component for an individual caller card, ensuring it encapsulates the styling logic. A subsequent task will integrate this component into the dashboard.

## Acceptance Criteria
- [ ] Create `src/components/dashboard/pokegear/TacticalCallerCard.tsx`.
- [ ] The component must accept props for a `Contact` (id, name), its `CallerType` (or `HighValueContact` data), and `probability`.
- [ ] Implement conditional styling based on `CallerType`:
  - E.g., `SWARM` uses a specific color scheme (like fuchsia or purple).
  - E.g., `ITEM` uses another specific color scheme (like amber or orange).
  - Standard/null types use the default cyan aesthetic.
- [ ] The card must strictly adhere to ADR 008 (tactical hardware aesthetic):
  - Must use `rounded-none`.
  - Must use `border-dashed` (where applicable).
  - Must use monospaced fonts (`font-mono` / `tactical-text`).
- [ ] Render a badge indicating the caller's type (e.g., `[ SWARM ]` or `[ ITEM ]`) and any associated `details` (e.g., 'Dunsparce' or 'Leaf Stone') if it is a high-value contact.
- [ ] Include the `HoverScanner`, `CornerCrosshairs`, and `LcdGrid` components within the card layout to maintain consistency with the existing dashboard items.
- [ ] Write Vitest unit tests in `src/components/dashboard/pokegear/__tests__/TacticalCallerCard.test.tsx` to verify correct rendering of SWARM, ITEM, and STANDARD variants.
