---
id: idea-067-clear-rejection-reason
type: IDEA
title: Clear Rejection Reason on Status Change
status: COMPLETED
owner_persona: agile_coach
created_at: '2026-05-29'
updated_at: '2026-05-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - lifecycle
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Clear Rejection Reason on Status Change

## Context
When a node fails, agents or the system assign a `rejection_reason`. If the node later retries and succeeds, or transitions to `ACTIVE` or `READY`, this `rejection_reason` is currently not cleared. If the node later hits another failure case that doesn't explicitly overwrite the reason (or is erroneously evaluated based on the stale reason), it causes incorrect system behavior, such as False Positive Impossible Loops (Max rejection count reached).

## Proposal
Update `.github/scripts/foundry-active.ts` and `.github/scripts/foundry-heartbeat.ts` to explicitly clear the `rejection_reason` property (setting it to an empty string) whenever a node successfully transitions to `ACTIVE`, `READY`, `PENDING`, `VERIFYING`, or `COMPLETED`.

## Value Proposition
This eliminates stale metadata that can cause subtle and hard-to-debug workflow deadlocks.
