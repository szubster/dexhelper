---
id: task-526-555-pokegear-active-callers-e2e-qa
type: TASK
title: QA Pokegear Active Callers E2E Tests
status: PENDING
owner_persona: qa
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on:
  - task-526-553-pokegear-predictor-e2e-coder
  - task-526-554-pokegear-alerts-e2e-coder
jules_session_id: null
parent: story-116-526-pokegear-active-callers-e2e
rejection_count: 0
rejection_reason: ''
locks: []
---

# QA Pokegear Active Callers E2E Tests

## Acceptance Criteria
- [ ] Verify that `tests/e2e/dashboard/pokegear_predictor.spec.ts` correctly verifies the base predictor view with `crystal.sav`.
- [ ] Verify that `tests/e2e/dashboard/pokegear_alerts.spec.ts` correctly verifies the high-value caller cards and badges with `crystal_pokegear.sav`.
- [ ] Execute `xvfb-run -a pnpm test:e2e tests/e2e/dashboard/pokegear_alerts.spec.ts tests/e2e/dashboard/pokegear_predictor.spec.ts` and ensure it passes successfully.