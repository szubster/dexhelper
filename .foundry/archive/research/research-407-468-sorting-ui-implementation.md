---
id: research-407-468-sorting-ui-implementation
type: RESEARCH
title: Investigate and Blueprint UI for PC Box Sorting
status: CANCELLED
owner_persona: researcher
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
parent: task-361-407-sorting-algorithms-e2e-impl
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Research: Investigate and Blueprint UI for PC Box Sorting

## Objective
Investigate and blueprint the missing frontend UI components required for triggering PC Box sorting strategies (DexNumber, Level, Type, Alpha) within the Storage Grid view.

## Context
During the implementation of E2E verification for PC Box sorting algorithms, it was discovered that while the underlying engine (`SortingStrategy`, `DexNumberSorter`, `LevelSorter`, `TypeSorter`, `AlphaSorter`) is fully implemented and unit-tested, there are no user-facing UI controls (e.g., buttons, dropdowns) in the `StorageGrid` or `SearchAndFilters` components to actually trigger these sorts.

## Requirements
- Review `src/components/StorageGrid.tsx`, `src/components/SearchAndFilters.tsx`, and `src/store.ts` to identify the best architectural approach for injecting sorting logic into the frontend.
- Propose a new UI design for a sorting dropdown or button group that adheres to the project's Tactical UI aesthetic (ADR 008).
- Determine how the selected sorting strategy will be integrated with the global Zustand store and the local component state.
- Output an actionable blueprint or an ADR outlining the integration steps for the `coder` persona to implement the UI before the E2E tests can be written.

## Acceptance Criteria
- [ ] Determine the optimal location for the sorting UI controls (e.g., in `SearchAndFilters` or directly above the `StorageGrid`).
- [ ] Blueprint the required state updates for `src/store.ts` to track the active sorting strategy.
- [ ] Detail the exact React component structure and Tailwind classes needed to build the sorting controls.
- [ ] Spawn downstream implementation `TASK` nodes based on the research findings.
