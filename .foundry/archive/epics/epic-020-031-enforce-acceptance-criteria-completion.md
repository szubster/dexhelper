---
id: epic-020-031-enforce-acceptance-criteria-completion
type: EPIC
title: Enforce Acceptance Criteria Checkbox Completion Epic
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-11'
updated_at: '2026-05-14'
depends_on:
  - prd-020-020-enforce-acceptance-criteria-completion
jules_session_id: null
pr_number: null
parent: prd-020-020-enforce-acceptance-criteria-completion
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce Acceptance Criteria Checkbox Completion Epic

## Background
According to ADR 007, standard leaf tasks that are merged with unchecked acceptance criteria checkboxes are currently demoted to `PENDING` by the `foundry-heartbeat.ts` script. This leads to them being stuck indefinitely since they do not generate child nodes. We need to explicitly differentiate between a late-binding parent (which stays `PENDING`) and a regular task (which should fail).

## Scope
1. Update `foundry-heartbeat.ts` to check if a node has children (via `foundry-orchestrator`'s mapping) before deciding to keep it in `PENDING` due to unchecked tasks.
2. If it is a leaf task without children but contains unchecked boxes, transition it to `FAILED` with an appropriate journal message indicating that the PR was merged with unfulfilled acceptance criteria.
3. Update `foundry-orchestrator.ts` preflight and idempotent checks to ensure they don't improperly promote nodes with unchecked boxes to `READY` if they aren't supposed to be.

## Tasks Required
- [x] Investigate how `foundry-heartbeat.ts` can reliably determine if a node is a late-binding parent versus a leaf task.
- [x] Implement the `FAILED` fallback state for leaf tasks with unchecked boxes in `foundry-heartbeat.ts`.
- [x] Add unit tests in `foundry-heartbeat.test.ts` to verify the different handling of leaf tasks versus parent nodes with unchecked boxes.

### Child Nodes
- [ ] .foundry/stories/story-031-050-enforce-acceptance-criteria-completion.md
