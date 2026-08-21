---
id: story-071-431-migrate-tactical-panel
type: STORY
title: 'Migrate TacticalPanel, TacticalCard, TacticalBadge to Utility Classes'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-19'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-071-124-migrate-core-tactical-components-v2
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Migrate TacticalPanel, TacticalCard, TacticalBadge to Utility Classes

## Objective
Refactor `TacticalPanel.tsx`, `TacticalCard.tsx`, and `TacticalBadge.tsx` to utilize the new `@utility` classes (e.g., `tactical-panel`, `tactical-card`, `tactical-badge`) defined in `src/index.css`.

## Scope
1. **Target Components**:
   - `src/components/TacticalPanel.tsx`
   - `src/components/TacticalCard.tsx`
   - `src/components/TacticalBadge.tsx`
2. **Refactoring Process**: Replace long strings of repetitive inline Tailwind classes with their equivalent semantic `tactical-*` classes. Ensure variant styles still properly apply and specificity is correct.
3. **No Visual Regressions**: Ensure that the migration accurately preserves the pre-existing visual appearance.

## Acceptance Criteria
- [x] `TacticalPanel`, `TacticalCard`, and `TacticalBadge` use the new utility classes instead of inline classes where applicable.
- [x] No visual regressions in the affected components.
- [x] Components pass `pnpm run lint` and `pnpm test`.
- [x] task-431-447-migrate-tactical-components
