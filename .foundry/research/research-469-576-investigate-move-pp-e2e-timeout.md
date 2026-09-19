---
id: research-469-576-investigate-move-pp-e2e-timeout
type: RESEARCH
title: Investigate Move PP E2E Test Timeout
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-14'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: '12700119063402812957'
pr_number: null
parent: story-086-469-dynamic-move-pp-parsing-e2e
tags:
  - e2e
  - debugging
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Move PP E2E Test Timeout

## Objective
Investigate the root cause of the previous E2E implementation timing out after 7 days without a PR, to prevent the retry from facing the same issue.

## Context
The previous task `task-469-473-dynamic-move-pp-parsing-e2e-impl` was aborted because it timed out (`[ACKNOWLEDGED] Session timed out (>7 days without PR)`).

## Research Findings
- According to `coder` journal notes, the Playwright E2E test suite can take over 400 seconds to run in full, which exceeds the bash session timeout limits for automated agents.

## Recommendations for Implementation Retry
1. When running the verification step in the bash session, the developer MUST explicitly target only the affected test files (e.g. `xvfb-run -a pnpm test:e2e tests/e2e/<filename>.spec.ts`) instead of running the entire suite.
2. The developer MUST use non-blocking commands when possible.

## Acceptance Criteria
- [x] Research is complete and root cause for timeout is identified.
- [x] Recommendations are provided for the implementation retry task.
