---
id: epic-340-412-orchestrator-resource-locking
type: EPIC
title: Orchestrator Logic for Resource Locking
status: PENDING
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-29'
depends_on:
  - epic-340-411-schema-resource-locking
jules_session_id: null
pr_number: null
parent: prd-131-340-orchestrator-resource-locking-mutex
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Orchestrator Logic for Resource Locking

## Overview
This EPIC covers the implementation of the core orchestrator logic (`.github/scripts/foundry-orchestrator.ts`) required to parse, aggregate, and evaluate node `locks` during the RESOLVE phase, temporarily holding nodes in `PENDING` status if lock intersections occur with currently `ACTIVE` nodes.

## Objectives
- Update the orchestrator script to parse the new `locks` field.
- In the `RESOLVE` phase (Phase 4), aggregate all `locks` declared by currently `ACTIVE` nodes.
- For every `PENDING` node eligible to transition to `READY`, check its declared `locks` against aggregated active locks.
- Block the `PENDING` node if there's an intersection.
- Ensure deadlocks are prevented and locks are released appropriately when a node transitions from `ACTIVE` to `COMPLETED` or `FAILED`.

## Acceptance Criteria
- [x] Story Owner completes EPIC decomposition.
- [ ] story-412-477-parse-locks-orchestrator
- [ ] story-412-478-implement-resolve-phase-locking
- [x] Story Owner generates a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-412-479-orchestrator-locking-e2e-verification
