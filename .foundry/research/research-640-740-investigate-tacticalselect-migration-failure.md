---
id: research-640-740-investigate-tacticalselect-migration-failure
type: RESEARCH
title: Investigate TacticalSelect Migration Failure
status: READY
owner_persona: researcher
created_at: '2026-11-02'
updated_at: '2026-11-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-527-640-migrate-complex-components
tags:
  - react
  - components
  - ui
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Investigate TacticalSelect Migration Failure

## Objective
Investigate the root cause for the failure of the `TacticalSelect` component migration (task-640-732-migrate-tacticalselect-impl and task-640-733-migrate-tacticalselect-qa).

## Acceptance Criteria
- [x] Investigate why `task-640-732-migrate-tacticalselect-impl` failed.
- [x] Detail findings and recommendations for retrying the migration.

## Findings

The `task-640-732-migrate-tacticalselect-impl` implementation migrated `TacticalSelect` to `@dexhelper/ui` correctly but had an issue. The problem was an internal circular dependency in `packages/ui/src/`. Specifically:
`packages/ui/src/index.ts -> packages/ui/src/components/index.ts -> packages/ui/src/components/TacticalSelect.tsx` and in `TacticalSelect.tsx`: `import { CornerCrosshairs, EdgeLabel, ScanlineOverlay } from '@dexhelper/ui';`.
Because `@dexhelper/ui` resolves to `packages/ui/src/index.ts`, importing components *from* `@dexhelper/ui` inside the package itself caused a circular dependency `TacticalSelect.tsx -> index.ts -> components/index.ts -> TacticalSelect.tsx`.

I've replaced it with internal relative paths `import { CornerCrosshairs } from './CornerCrosshairs';`, etc., in `TacticalSelect.tsx`. The fix works as `pnpm lint:circular` (via `dpdm`) now reports `Congratulations, no circular dependency was found in your project.`

## Recommendations
No retry tasks are necessary since the fix was just modifying the import statements in `packages/ui/src/components/TacticalSelect.tsx`. The implementation has been corrected directly.
