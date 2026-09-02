---
id: task-444-518-qa-adr013-linter
type: TASK
depends_on:
  - task-444-517-implement-adr013-linter
parent: story-417-444-adr-013-state-compliance-linter
owner_persona: qa
title: QA ADR 013 State Compliance Linter
status: READY
created_at: 2026-09-02T00:00:00.000Z
updated_at: '2026-09-02'
jules_session_id: null
rejection_count: 0
rejection_reason: ''
---

# QA ADR 013 State Compliance Linter

## Description
Verify the ADR 013 linter compliance rule implemented in `scripts/verify-adr-compliance.ts`. Ensure it correctly flags violations where local state is utilized instead of shared React Context within the `src/components/dashboard/` views and exempts `DagContext.tsx` to prevent false positives.

## Acceptance Criteria
- [ ] Verify `verify-adr-compliance.ts` successfully flags ADR 013 local state violations in dashboard views.
- [ ] Verify `DagContext.tsx` does not trigger a false positive violation.
