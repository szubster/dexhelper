---
id: task-568-582-modify-shared-workflow-qa
type: TASK
title: QA Verify Shared Workflow Issue Dispatch
status: ACTIVE
owner_persona: qa
created_at: '2026-09-15T11:47:21.000Z'
updated_at: '2026-09-17'
depends_on:
  - task-568-581-modify-shared-workflow-impl
jules_session_id: '1990728781814254398'
pr_number: null
parent: adr-558-568-evaluate-scheduled-workflow-architecture
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

# QA Verify Shared Workflow Issue Dispatch

## Description
Verify that `.github/workflows/foundry-scheduled-agent.yml` successfully creates GitHub issues for scheduled workflows, and that the original batch tasks were correctly cancelled.

## Acceptance Criteria
- [ ] Confirm `.github/workflows/foundry-scheduled-agent.yml` uses `gh issue create` with the compiled prompt.
- [ ] Run `pnpm lint` and `pnpm test` to ensure workflow stability.
