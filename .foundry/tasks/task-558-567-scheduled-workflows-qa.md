---
id: task-558-567-scheduled-workflows-qa
type: TASK
title: QA Verify Scheduled Workflows Issue Dispatch
status: PENDING
owner_persona: qa
created_at: '2026-09-08'
updated_at: '2026-09-12'
depends_on:
  - task-558-564-scheduled-workflows-batch1-impl
  - task-558-565-scheduled-workflows-batch2-impl
  - task-558-566-scheduled-workflows-batch3-impl
jules_session_id: null
pr_number: null
parent: story-531-558-modify-scheduled-workflows-impl
tags:
  - foundry
  - scheduled-agents
  - github-issues
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verify Scheduled Workflows Issue Dispatch

## Description
Verify that all 19 `.github/workflows/schedule-*.yml` files have been correctly modified to use GitHub Issues for dispatching Jules agents.

Verification steps:
1. Ensure the direct call to `foundry-scheduled-agent.yml` is removed from all `schedule-*.yml` files.
2. Ensure each file now contains a valid job to check out the code, setup Node.js, and compile the prompt via `node --experimental-strip-types .github/scripts/foundry-orchestrator.ts --compile-scheduled "<persona>"`.
3. Verify the `gh issue create` command is present and correctly injects the compiled prompt.
4. Verify that workflow syntax is fully valid.

## Acceptance Criteria
- [ ] All 19 scheduled workflows are verified to dispatch issues successfully per requirements.
- [ ] Run `pnpm lint` and `pnpm test` to ensure the system is clean.
