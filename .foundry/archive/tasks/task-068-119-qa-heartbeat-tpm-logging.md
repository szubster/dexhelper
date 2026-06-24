---
id: task-068-119-qa-heartbeat-tpm-logging
type: TASK
title: QA TPM Logging for PR-less Completions
status: COMPLETED
owner_persona: qa
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on: []jules_session_id: null
pr_number: null
parent: story-033-068-heartbeat-tpm-logging
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA TPM Logging for PR-less Completions

## Objective
Verify the changes made in `task-068-118-implement-heartbeat-tpm-logging`.

## Context
When a PR-less session is handled and a state transition occurs (e.g., to `COMPLETED` or `FAILED`), these events must be audited. We log them into `.foundry/journals/tpm.md`.

## Acceptance Criteria
- [x] Verify that `transitionNodeToCompleted` in `.github/scripts/foundry-heartbeat.ts` logs correctly for empty PRs.
- [x] Run test suite with `cd .github/scripts && pnpm install && npx vitest run`.
