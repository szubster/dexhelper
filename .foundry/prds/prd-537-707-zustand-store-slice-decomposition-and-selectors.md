---
id: prd-537-707-zustand-store-slice-decomposition-and-selectors
type: PRD
title: Modular Zustand Store Slice Decomposition and Memoized State Selectors
status: PENDING
owner_persona: epic_planner
created_at: "2026-10-19"
updated_at: "2026-10-19"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: idea-537-zustand-store-slice-decomposition-and-selectors
priority: 50
confidence_score: null
tags:
  - state-management
  - zustand
  - performance
  - refactoring
  - testability
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Product Requirements Document: Modular Zustand Store Slice Decomposition and Memoized State Selectors

## 1. Context & Problem Statement
DexHelper's central application state manager (`src/store.ts`) currently defines a single, monolithic 485-line `AppStore` interface and `useStore` hook. As feature capabilities have grown across Gens 1–3 (e.g., save data parsing and rehydration, UI search and filtering, wild item hunting progress detection, conflict resolution, R2 cloud synchronization, and custom PC Box wallpapers), all transient and persistent state along with domain-specific logic have been aggregated into a single store declaration.

Currently, this monolithic architecture introduces three main engineering challenges:
1. **Unnecessary Component Re-renders**: UI components frequently query multiple top-level properties (e.g. `useStore((s) => s.saveData)`, `useStore((s) => s.searchTerm)`, `useStore((s) => s.isLivingDex)`). When large nested save data state changes or unrelated UI toggles fire, subscribed components re-render because shallow comparison is not applied across multi-property subscriptions.
2. **Domain Logic Pollution in Store Action Setters**: Complex domain logic—such as scanning bag inventories, party Pokémon held items, PC box held items, and PC item storage during hunting progress detection—is embedded directly inside `setSaveData` and action handlers within `src/store.ts`. This tightly couples state persistence with domain calculations, making isolated unit testing of state transitions difficult.
3. **Reduced Code Modularity and DX**: Extending state logic for new features requires modifying a single massive store file, increasing merge conflict risks and lowering code maintainability.

## 2. Proposed Solution
Refactor `src/store.ts` into a modular, slice-based Zustand architecture:
1. **Slice Pattern Decomposition**: Decompose `AppStore` into domain-focused slices using Zustand's `StateCreator` pattern:
   - `SaveSlice`: Manages parsed save state (`saveData`, `saves`, `activeSaveId`) and save state setters.
   - `SettingsSlice`: Manages persistent user preferences (`filters`, `manualVersion`, `isLivingDex`, `globalPokeball`, `unlockedWallpapers`).
   - `UiSlice`: Manages transient UI state (`searchTerm`, `selectedLocationId`, `isSettingsOpen`, `isVersionModalOpen`).
   - `HuntingSlice`: Manages wild item hunting targets, baseline quantities, and acquired item notifications.
   - `SyncSlice`: Manages R2 cloud sync, IndexedDB rehydration, and sync conflict resolution.
2. **Domain Logic Extraction**: Extract inline business calculations (e.g., hunting baseline comparison logic in `setSaveData`) into pure, testable domain helper utilities under `src/engine/` or `src/utils/`.
3. **Typed Memoized Selectors with Shallow Equivalence**: Provide strongly typed custom hook selectors (e.g., `useSaveData()`, `useUiSettings()`, `useHuntingTargets()`) leveraging `useShallow` from `zustand/react/shallow` to prevent unnecessary component re-renders when unrelated state properties update.

## 3. Value Proposition
- **Performance Optimization**: Eliminates redundant React re-renders across Dex grids, search bars, and dashboard views when transient UI flags or save data fields update.
- **Improved Testability**: Decouples business logic from Zustand state handlers, enabling direct unit testing of domain calculations without mocking full store instances.
- **Enhanced Maintainability & DX**: Clean separation of state concerns across domain slices simplifies feature development and reduces merge conflicts for developer personas.

## Acceptance Criteria
- [ ] Break down into Epics
