---
id: story-031-050-enforce-acceptance-criteria-completion
type: STORY
title: Enforce Acceptance Criteria Completion Logic in Heartbeat and Orchestrator
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-11'
updated_at: '2026-05-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-020-031-enforce-acceptance-criteria-completion
tags: []
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Enforce Acceptance Criteria Completion Logic in Heartbeat and Orchestrator

## Description
According to ADR 007, standard leaf tasks that are merged with unchecked acceptance criteria checkboxes are currently demoted to `PENDING` by the `foundry-heartbeat.ts` script. This leads to them being stuck indefinitely since they do not generate child nodes. We need to explicitly differentiate between a late-binding parent (which stays `PENDING`) and a regular task (which should fail).

This story focuses on updating `foundry-heartbeat.ts` to differentiate between parent nodes and leaf nodes when unchecked tasks are found. It also updates `foundry-orchestrator.ts` preflight checks to prevent promoting nodes to `READY` if they are leaf tasks with unchecked boxes.

## Acceptance Criteria
- [x] Update `foundry-heartbeat.ts` to check if a node has children via orchestrator mapping before deciding to keep it in `PENDING` due to unchecked tasks.
- [x] If it is a leaf task without children but contains unchecked boxes, transition it to `FAILED` with an appropriate journal message indicating that the PR was merged with unfulfilled acceptance criteria.
- [x] Update `foundry-orchestrator.ts` preflight logic to prevent improperly promoting nodes with unchecked boxes to `READY`.
- [x] Add unit tests in `foundry-heartbeat.test.ts` to verify the different handling of leaf tasks versus parent nodes with unchecked boxes.


## Implementation Tasks
- [Coder Task](./../tasks/task-050-083-enforce-acceptance-criteria.md)
- [QA Task](./../tasks/task-050-084-qa-enforce-acceptance-criteria.md)
