---
id: research-403-668-investigate-e2e-timeout-v3
type: RESEARCH
title: Investigate Playwright E2E Session Timeout V3
status: READY
owner_persona: researcher
created_at: '2026-10-06'
updated_at: '2026-10-09'
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
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Playwright E2E Session Timeout V3

## Context
The task `task-403-535-playwright-e2e-retry-impl-v2` failed permanently. We need to investigate why this happened again, especially since `research-403-534` already provided recommendations that were supposed to prevent this.

## Execution Blueprint
- Investigate the acceptance criteria of `task-403-535-playwright-e2e-retry-impl-v2` and determine why it failed.
- Document the findings and ensure they are clearly communicated.

## Acceptance Criteria
- [x] Investigate the root cause of the failure of `task-403-535-playwright-e2e-retry-impl-v2`.
- [x] Document findings and recommendations in the researcher journal and node body.

## Findings and Recommendations

### Root Cause Analysis
The failed task `task-403-535-playwright-e2e-retry-impl-v2` still had the acceptance criterion `- [ ] Tests execute successfully via \`xvfb-run -a pnpm test:e2e\``. This command executes the full E2E suite which takes longer than the 400-second session timeout, directly causing the permanent failure again. The retry task incorrectly copied the original task`s acceptance criteria instead of updating it to target specific test files as recommended by `research-403-534-investigate-playwright-timeout`.

### Recommendations
When generating or updating retry tasks, personas must actively modify the acceptance criteria to remove full-suite test commands (`xvfb-run -a pnpm test:e2e`) and replace them with targeted file execution (e.g., `xvfb-run -a pnpm test:e2e tests/e2e/<file>.spec.ts`).



### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
