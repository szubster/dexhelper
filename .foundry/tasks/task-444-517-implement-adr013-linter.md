---
id: task-444-517-implement-adr013-linter
type: TASK
depends_on: []
parent: story-417-444-adr-013-state-compliance-linter
owner_persona: coder
title: Implement ADR 013 State Compliance Linter
status: READY
created_at: 2026-09-02T00:00:00.000Z
updated_at: '2026-09-02'
jules_session_id: null
rejection_count: 0
rejection_reason: ''
---

# Implement ADR 013 State Compliance Linter

## Description
Extend `scripts/verify-adr-compliance.ts` to implement ADR 013 constraints. The script should analyze `src/components/dashboard/` to ensure Kanban and DAG visualizations utilize shared React Context instead of direct local state for data fetching. Specifically, flag the usage of `useState` imports and hooks related to maintaining data state within dashboard views, while appropriately exempting `DagContext.tsx` itself.

## Acceptance Criteria
- [x] Extend `verify-adr-compliance.ts` logic to include ADR 013 checks.
- [x] Parse `src/components/dashboard/` and flag prohibited `useState` instances.
- [x] Skip `src/components/dashboard/DagContext.tsx` during validation.
- [x] Run `pnpm lint && pnpm test` to verify no regressions.
