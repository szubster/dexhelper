---
id: task-537-625-testing-style-guide-e2e-qa
type: TASK
title: QA Testing Style Guide E2E Verification
status: PENDING
owner_persona: qa
created_at: '2026-09-22'
updated_at: '2026-09-25'
depends_on:
  - task-537-624-testing-style-guide-e2e-coder
jules_session_id: null
pr_number: null
parent: story-531-537-testing-style-guide-e2e
tags:
  - testing
  - documentation
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: QA Testing Style Guide E2E Verification

## Summary
Verify the Playwright E2E tests for the Testing Style Guide.

## Description
Verify that the `coder` correctly implemented `tests/e2e/playwright_style_guide.spec.ts` to ensure it explicitly uses `locator.or()`, `isMobile`, and the new mock utilities as described in `.foundry/docs/knowledge_base/testing/playwright_style_guide.md`. Run the tests locally to ensure they pass.

## Acceptance Criteria
- [ ] Verify `tests/e2e/playwright_style_guide.spec.ts` exists.
- [ ] Verify a test uses `locator.or()` with strict mode (`.first()`).
- [ ] Verify a test conditionally adjusts locators based on the `isMobile` fixture.
- [ ] Verify a test uses `mockDagData`.
- [ ] Run `xvfb-run -a pnpm test:e2e tests/e2e/playwright_style_guide.spec.ts` and verify it passes.
