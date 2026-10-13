---
id: research-403-673-investigate-e2e-timeout-v4
type: RESEARCH
title: Investigate Playwright E2E Session Timeout V4
status: READY
owner_persona: researcher
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-112-403-integration-e2e
tags:
  - dexhelper
  - e2e
  - testing
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Playwright E2E Session Timeout V4

## Context
The research node `research-403-668-investigate-e2e-timeout-v3` failed permanently due to missing or malformed session ID. We are launching a new research node to investigate why the retry implementation for Playwright E2E tests (`task-403-535-playwright-e2e-retry-impl-v2`) failed previously, taking into account proper session initialization.

## Execution Blueprint
- Investigate the root cause of the previous failure for E2E tests.
- Provide actionable recommendations for `coder` and `qa` to prevent Playwright session timeouts and to properly target the E2E execution tests.
- Document the findings.

## Acceptance Criteria
- [x] Investigate the root cause of the failure of `task-403-535-playwright-e2e-retry-impl-v2`.
- [x] Document findings and recommendations in the researcher journal and node body.

## Findings and Recommendations

### Root Cause Analysis
The failed task `task-403-535-playwright-e2e-retry-impl-v2` still had the acceptance criterion `- [ ] Tests execute successfully via \`xvfb-run -a pnpm test:e2e\``. This command executes the full E2E suite which takes longer than the 400-second session timeout, directly causing the permanent failure again. The retry task incorrectly copied the original task's acceptance criteria instead of updating it to target specific test files as recommended by `research-403-534-investigate-playwright-timeout`.

### Recommendations
When generating or updating retry tasks, personas must actively modify the acceptance criteria to remove full-suite test commands (`xvfb-run -a pnpm test:e2e`) and replace them with targeted file execution (e.g., `xvfb-run -a pnpm test:e2e tests/e2e/<file>.spec.ts`).
