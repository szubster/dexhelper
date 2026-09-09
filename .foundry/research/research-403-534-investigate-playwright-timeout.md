---
id: research-403-534-investigate-playwright-timeout
type: RESEARCH
title: Investigate Playwright E2E Session Timeout
status: COMPLETED
owner_persona: researcher
created_at: '2026-09-04'
updated_at: '2026-09-09'
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

# Investigate Playwright E2E Session Timeout

## Context
The task `task-403-486-playwright-e2e-retry-impl` failed permanently due to a session timeout (>7 days without PR). We need to investigate the root cause of this timeout.

## Acceptance Criteria
- [x] Investigate the root cause of the session timeout.
- [x] Document findings and recommendations.

## Findings and Recommendations

### Root Cause Analysis
1. **Full Suite Execution:** The acceptance criteria for the failed task `task-403-486-playwright-e2e-retry-impl` explicitly mandated running `xvfb-run -a pnpm test:e2e`. This command executes the entire Playwright test suite, which takes longer than the 400-second session timeout limit of the bash session environment, leading to a permanent failure.

### Recommendations
1. **Target Specific Files:** When instructing the coder persona to run E2E tests locally to verify code changes, execution plans and task acceptance criteria must specify targeting only the affected test files (e.g., `xvfb-run -a pnpm test:e2e tests/e2e/<file>.spec.ts`) rather than the entire suite. Full E2E suite execution should be deferred entirely to GitHub CI.
