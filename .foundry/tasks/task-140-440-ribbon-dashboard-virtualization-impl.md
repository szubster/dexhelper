---
id: task-140-440-ribbon-dashboard-virtualization-impl
type: TASK
title: Implement Virtualization for GlobalRibbonChecklistDashboard
status: COMPLETED
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-066-140-ribbon-dashboard-performance
tags:
  - feature
  - gen3
  - contests
  - ui
  - performance
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---
# Task: Implement Virtualization for GlobalRibbonChecklistDashboard

## 1. Context
The `GlobalRibbonChecklistDashboard` is experiencing rendering lag with large datasets, particularly when displaying a full Living Dex where hundreds of Pokémon might possess ribbons simultaneously. While previous optimizations addressed intermediate object allocations and iterations, rendering all elements to the DOM concurrently remains a bottleneck. The target is to employ virtualization for the checklist container.

## 2. Constraints & Patterns
- Maintain the exact `tactical hardware` aesthetic (ADR 008: `rounded-none`, `border-dashed`, monospaced font).
- The project already has `@tanstack/react-virtual` available in the `package.json` for managing virtualization. Use it.
- Ensure the virtualization integration strictly handles windowed scroll bounds without clipping content prematurely.
- Existing tests located in `src/components/dashboard/ribbons/__tests__/GlobalRibbonChecklistDashboard.test.tsx` must be updated/verified.

## 3. Implementation Steps
1. Refactor `src/components/dashboard/ribbons/GlobalRibbonChecklistDashboard.tsx` to use the `useVirtualizer` hook from `@tanstack/react-virtual`.
2. Wrap the `pokemonList.map` rendering block in the virtualization list container context, calculating heights and absolute positioning correctly.
3. Ensure no regression to existing functional layout parameters.
4. Update/run component integration tests in `GlobalRibbonChecklistDashboard.test.tsx` ensuring it works correctly.

## 4. Acceptance Criteria
- [x] Virtualization using `@tanstack/react-virtual` is integrated in `GlobalRibbonChecklistDashboard`.
- [x] Large dataset rendering no longer blocks the main thread.
- [x] Component integration tests for the dashboard pass.
