---
id: epic-707-694-store-slice-decomposition
type: EPIC
title: Decompose Monolithic Store into Zustand Slices
status: PENDING
owner_persona: story_owner
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - epic-707-693-domain-logic-extraction
jules_session_id: null
pr_number: null
parent: prd-537-707-zustand-store-slice-decomposition-and-selectors
tags:
  - state-management
  - zustand
  - refactoring
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# EPIC: Decompose Monolithic Store into Zustand Slices

## Objective
Refactor `src/store.ts` by decomposing the monolithic `AppStore` into modular, domain-focused slices using Zustand's `StateCreator` pattern.

## Requirements
1. Create `SaveSlice` to manage parsed save state and related setters.
2. Create `SettingsSlice` to manage persistent user preferences.
3. Create `UiSlice` to manage transient UI state.
4. Create `HuntingSlice` to manage wild item hunting targets and notifications.
5. Create `SyncSlice` to manage R2 cloud sync, IndexedDB rehydration, and sync conflict resolution.
6. Assemble these slices into a unified Zustand store.
7. When breaking down this Epic into Stories, the Story Owner MUST generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

## Acceptance Criteria
- [ ] Break down this Epic into Stories.
