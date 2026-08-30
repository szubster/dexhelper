---
id: research-361-494-sorting-algorithms-e2e-root-cause
type: RESEARCH
title: Investigate Root Cause of E2E Sorting Algorithms Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-26'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
parent: story-136-361-sorting-algorithms-e2e
rejection_reason: ''
---

# Research: Investigate Root Cause of E2E Sorting Algorithms Failure

## Objective
Investigate the root cause of the permanent failure of the E2E verification implementation for PC Box Sorting Algorithms.

## Context
The previous implementation task reached its maximum rejection count and was cancelled due to missing user-facing UI controls to trigger the sorting logic in the frontend.

## Requirements
- Blueprint the required UI components or state updates necessary to unblock the E2E tests, ensuring adherence to the Tactical UI aesthetic.
- Output an actionable blueprint outlining the integration steps for the coder to implement the UI and write the E2E tests.

## Findings

### Root Cause
The previous E2E test implementation for PC Box Sorting Algorithms failed because `StandardSorters` (Alpha, DexNumber, Level, Type) are implemented in `src/engine/sorting/StandardSorters.ts`, but there is no state or UI component in the frontend to trigger them. `StorageGrid.tsx` groups Pokémon by location but displays them in their raw, unsorted order. E2E tests cannot verify sorting if Playwright has no UI elements to interact with to change the sort order.

### Blueprint: UI Controls for Sorting
1.  **State Management (`src/store.ts`)**:
    *   Add `sortCriterion` (`'id' | 'level' | 'alpha' | 'type' | 'ribbons'` or similar) and `sortDirection` (`'asc' | 'desc'`) to `AppStore`.
    *   Include setter methods: `setSortCriterion` and `setSortDirection`.
    *   Add these new fields to the persisted state via `partialize`.
2.  **UI Component (`src/components/SearchAndFilters.tsx`)**:
    *   Within the `PARAMETER_ROUTING` section (or alongside it), add a `TacticalSelect` to allow users to select the `sortCriterion`.
    *   Add a toggle button (e.g., using `TacticalButton` with an arrow icon) to switch between `asc` and `desc` for `sortDirection`.
    *   Ensure styling adheres strictly to the Tactical UI aesthetic (e.g., `rounded-none`, `border-dashed`, monospaced fonts).
3.  **Application Logic (`src/components/StorageGrid.tsx`)**:
    *   Read `sortCriterion` and `sortDirection` from the store.
    *   Before mapping `pokemonInLocation` to `StorageCard`s, apply the corresponding `SortingStrategy` from `StandardSorters.ts` based on the user's selection and the active save data configuration (e.g., game version, generation).
    *   *Note: Since standard sorters expect `SortablePokemon`, you'll need to map the raw instances, sort them, and map them back, or adapt the items passed into the sorters.*

### Integration Steps for Playwright E2E Tests
1.  **Test File Creation**: Create or update `tests/e2e/storage_sorting.spec.ts`.
2.  **Setup**: Use `initializeWithSave(page)` to load a known save fixture with diverse Pokémon data.
3.  **Navigation**: Navigate to `/storage` and wait for the UI to settle (`waitForSync`).
4.  **Interaction**:
    *   Locate the sort dropdown (e.g., `page.locator('select[aria-label="Sort by"]')`).
    *   Select a criterion (e.g., `'level'`).
    *   Locate and toggle the sort direction button if testing descending order.
5.  **Verification**:
    *   Target the generated `StorageCard` elements within a specific PC Box or Party.
    *   Extract the displayed text for sorting metrics (e.g., Level numbers `LV.005`, `LV.010`, or Names).
    *   Assert that the extracted array of strings or numbers matches the expected sorted order (ascending or descending).

## Acceptance Criteria
- [x] Determine the root cause of the E2E test implementation failure.
- [x] Blueprint the required UI controls to trigger sorting.
- [x] Document the integration steps necessary to unblock the Playwright E2E tests.
