---
id: adr-558-568-evaluate-scheduled-workflow-architecture
type: ADR
title: Evaluate Changing Underlying Scheduled Agent Workflow
status: PENDING
owner_persona: architect
created_at: '2026-09-08'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '3826766012827372355'
pr_number: null
parent: story-531-558-modify-scheduled-workflows-impl
tags:
  - foundry
  - scheduled-agents
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Evaluate Changing Underlying Scheduled Agent Workflow

## Context
During the implementation of STORY-558 (Implement Issue Dispatch for Scheduled Workflows), it was proposed to modify 19 different `schedule-*.yml` files to independently create GitHub Issues. A review comment suggested: "Maybe it's better to change the underlying workflow, then repeat the same code multiple times?"

Currently, the workflows call a shared `foundry-scheduled-agent.yml` workflow.

## Acceptance Criteria
- [ ] task-568-581-modify-shared-workflow-impl
- [ ] task-568-582-modify-shared-workflow-qa
- [x] Evaluate the architectural trade-offs of modifying the shared `foundry-scheduled-agent.yml` to dispatch issues vs. duplicating issue-creation logic across 19 cron files.
- [x] Determine the optimal approach and document the decision here.
- [x] If changing the underlying workflow is preferred, spawn replacement TASK nodes for implementation.

## Decision
Based on the evaluation, we have decided to modify the underlying `foundry-scheduled-agent.yml` workflow instead of duplicating the logic across the 19 cron files. This adheres to DRY principles, greatly improves maintainability, and keeps the schedule files focused on their cron timing and persona inputs.
