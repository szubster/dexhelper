---
id: task-568-581-modify-shared-workflow-impl
type: TASK
title: Update Shared Scheduled Workflow for Issue Dispatch
status: ACTIVE
owner_persona: coder
created_at: 2026-09-15T11:46:57.000Z
updated_at: '2026-09-17'
depends_on: []
jules_session_id: '4210221288611012650'
pr_number: null
parent: adr-558-568-evaluate-scheduled-workflow-architecture
tags:
  - foundry
  - scheduled-agents
  - github-issues
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Shared Scheduled Workflow for Issue Dispatch

## Description
Modify `.github/workflows/foundry-scheduled-agent.yml` to dispatch GitHub issues instead of directly invoking Jules via the API. This single change will apply to all scheduled agents, avoiding duplication across the 19 cron files.
The job must check out the code, setup Node.js, compile the prompt for the persona via `foundry-orchestrator.ts --compile-scheduled "<persona>"`, and use `gh issue create` to create the issue.

## Acceptance Criteria
- [x] `.github/workflows/foundry-scheduled-agent.yml` is updated to create a GitHub issue.
- [x] Jules invocation via API is replaced by the issue creation logic.
