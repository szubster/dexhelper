---
id: task-039-071-implement-failure-handling
type: TASK
title: Implement Failure Handling for Validation Mismatches
status: "COMPLETED"
owner_persona: coder
created_at: '2026-05-09'
updated_at: "2026-05-10"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-025-039-implement-failure-handling
tags:
  - foundry
  - dag
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Failure Handling for Validation Mismatches

## Overview
Handle the state transition when an invalid `owner_persona` mapping is detected in `foundry-orchestrator.ts`.

## Context
When `.github/scripts/foundry-orchestrator.ts` detects an invalid `owner_persona` mapping during Phase 4.8, it currently transitions the node to `BLOCKED` with `owner_persona: tpm`. The acceptance criteria dictate that we should mark the node as `FAILED` instead, and provide a `rejection_reason` explaining the failure, so that the Resurrection Loop can retry or surface it differently.

## Acceptance Criteria
- [x] Nodes with invalid mapping are transitioned to `FAILED`.
- [x] A descriptive `rejection_reason` is set (e.g. "Invalid owner_persona mapping").
- [x] The `owner_persona` should not be overridden to `tpm` for this specific failure path.
- [x] A warning/error is logged (the existing `warn()` call should be kept).
- [x] The tests in `foundry-orchestrator.test.ts` regarding mapping validation should be updated to reflect this new behaviour (expecting `FAILED` instead of `BLOCKED` and `tpm` persona).
