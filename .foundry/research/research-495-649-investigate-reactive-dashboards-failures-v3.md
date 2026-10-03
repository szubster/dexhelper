---
id: research-495-649-investigate-reactive-dashboards-failures-v3
type: RESEARCH
title: Investigate Reactive Dashboards Failures V3
status: READY
owner_persona: researcher
created_at: '2026-10-02'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-425-495-reactive-ui-components
tags:
  - ui
  - emulator
  - components
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Reactive Dashboards Failures V3

## Context
The previous task `task-495-630-reactive-dashboards-impl-retry-v2` failed permanently. We need to investigate why the dashboard components are failing to become reactive properly when consuming the live memory context.

## Acceptance Criteria
- [x] Investigate root cause of the permanent failure in task-495-630-reactive-dashboards-impl-retry-v2.
- [x] Document the findings and propose a solution.

## Findings
The previous attempt failed because while individual components inside `src/components/dashboard/` (like `Gen2NpcTrades`, `Gen2SavingsDashboard`, etc.) were refactored to use `useParsedSaveData()`, the root layout component `DashboardPage` inside `src/routes/dashboard.tsx` is still statically injecting `saveData` via props.

`DashboardPage` relies on:
```tsx
const saveData = useStore((s) => s.saveData);
```
and passes it down:
```tsx
<BattleFrontierDashboard saveData={saveData} />
```

Because `useStore` only holds the static saved state, none of these child components receive live memory updates, rendering them non-reactive.

### Proposed Solution
1. Update `DashboardPage` in `src/routes/dashboard.tsx` to use the `useParsedSaveData()` hook from `EmulatorContext` instead of `useStore`. This will ensure it retrieves the live reactivity context.
2. (Important Note for Coder): Ensure `DashboardPage` is running within the bounds of `EmulatorProvider`. If `DashboardPage` crashes after this change (e.g. throwing `useEmulatorState must be used within an EmulatorProvider`), it implies the route hierarchy is not wrapped in `EmulatorProvider` or the provider is bypassed.
   - However, since `src/routes/__root.tsx` renders `EmulatorProvider` wrapping `AppLayout` and `Outlet`, `DashboardPage` (rendered via `Outlet`) should have access to the context.
   - Coder should implement the fix and verify that the application still renders without a black screen.
