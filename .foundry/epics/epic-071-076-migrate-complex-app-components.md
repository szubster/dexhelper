---
id: epic-071-076-migrate-complex-app-components
type: EPIC
title: Migrate Complex Application Components
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-11'
updated_at: '2026-06-28'
depends_on:
  - epic-071-075-migrate-core-tactical-components
jules_session_id: '8935458465003324011'
pr_number: null
parent: prd-071-040-tailwind-v4-utilities-migration
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: 'Dependency chain failed permanently. Replaced by epic-071-099-migrate-complex-app-components-retry.'
notes: ''
---

# Epic: Migrate Complex Application Components

## Objective
Refactor the more complex, composite application components and page layouts to utilize the new `@utility` classes, or to swap out raw HTML elements for the newly refactored core `Tactical*` components.

## Scope
1. **Target Components**: Focus on higher-level components that compose the application UI. Examples include:
   - `AppLayout.tsx`
   - `AppHeader.tsx`
   - `AssistantPanel.tsx`
   - `PokedexCard.tsx`
   - `PokedexGrid.tsx`
   - `PokemonDetails.tsx`
   - `SearchAndFilters.tsx`
   - `SettingsModal.tsx`
   - `SettingsRow.tsx`
   - Components under `src/components/dag/`, `src/components/pokemon/`, `src/components/run/`, etc.
2. **Refactoring Process**:
   - Replace long strings of repetitive inline Tailwind classes with the semantic `tactical-*` classes.
   - Replace standard HTML elements (e.g., `<button className="border-dashed...">`) with their corresponding core tactical components (e.g., `<TacticalButton>`) where appropriate to reduce code duplication and improve modularity.
3. **No Visual Regressions**: Ensure that the overarching UI remains visually identical and strictly adheres to the tactical hardware aesthetic.

## Acceptance Criteria
- [ ] Complex application components and layouts are updated to use the new `tactical-*` utilities or refactored to use the newly updated core `Tactical*` components.
- [ ] The overall application aesthetic is perfectly preserved without visual regressions.
- [ ] Components pass `pnpm run lint` and `pnpm test`.

### Auditor Rejection
This node has been CANCELLED because its dependency chain failed permanently. It is replaced by epic-071-099-migrate-complex-app-components-retry.
