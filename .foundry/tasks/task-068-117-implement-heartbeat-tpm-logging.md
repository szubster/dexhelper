---
id: task-068-117-implement-heartbeat-tpm-logging
type: TASK
title: Add TPM Logging for PR-less Completions
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: '1799873409026325558'
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

# TASK: Add TPM Logging for PR-less Completions

## Objective
Update the `foundry-heartbeat.ts` script to log appropriate messages to the TPM journal for PR-less `COMPLETED` session transitions.

## Context
When a PR-less session is handled and a state transition occurs (e.g., to `COMPLETED` or `FAILED`), these events must be audited. We log them into `.foundry/journals/tpm.md`.

## Acceptance Criteria
- [ ] Write tech lead blueprint for logging PR-less completions to TPM journal.
