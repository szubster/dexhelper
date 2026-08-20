---
id: epic-071-124-migrate-core-tactical-components-v2
type: EPIC
title: Migrate Core Tactical Components V2
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-08-19'
depends_on:
  - epic-071-123-define-tailwind-v4-utilities-v2
jules_session_id: '7125355397537957084'
pr_number: null
parent: prd-071-040-tailwind-v4-utilities-migration
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Migrate Core Tactical Components V2

## Objective
Refactor the fundamental tactical UI components within the `src/components/` directory to utilize the new `@utility` classes defined in `src/index.css`.

## Scope
1. **Target Components**: Focus on foundational, reusable UI building blocks. Examples include, but are not limited to:
   - `TacticalPanel.tsx`
   - `TacticalButton.tsx`
   - `TacticalCard.tsx`
   - `TacticalInput.tsx`
   - `TacticalSelect.tsx`
   - `TacticalBadge.tsx`
   - `TacticalSegmentedControl.tsx`
   - `TacticalMultiSelectControl.tsx`
2. **Refactoring Process**: Replace long strings of repetitive inline Tailwind classes (like `border-dashed`, `rounded-none`, etc.) with their equivalent semantic `tactical-*` classes (e.g., `tactical-panel`, `tactical-button`).
3. **No Visual Regressions**: Ensure that the migration accurately preserves the pre-existing visual appearance.
4. **Clean up Specificity and Overrides**: Ensure that any component-specific overrides (like changing padding or colors via props) still function correctly alongside the new base utility classes.

## Acceptance Criteria
- [ ] Core tactical components are updated to use the new `tactical-*` utilities.
- [ ] Component aesthetics remain strictly consistent with the tactical hardware style (no visual regressions).
- [ ] Components pass `pnpm run lint` and `pnpm test`.
