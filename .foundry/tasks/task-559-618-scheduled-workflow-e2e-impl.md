---
id: task-559-618-scheduled-workflow-e2e-impl
type: TASK
title: Scheduled Workflow E2E - Implementation
status: PENDING
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on:
  - task-559-617-scheduled-workflow-e2e-fixtures
jules_session_id: null
pr_number: null
parent: story-531-559-modify-scheduled-workflows-e2e
tags:
  - foundry
  - scheduled-agents
  - github-issues
  - e2e
  - integration
---
# Scheduled Workflow E2E - Implementation

## Context
Following the implementation of issue-based dispatching for scheduled agent workflows, we need to implement the E2E tests for the new mechanisms.

## Acceptance Criteria
- [ ] Validate that GitHub Action schedule-*.yml modifications reliably create correctly formatted issues.
- [ ] Confirm the foundry-orchestrator.ts --compile-scheduled execution properly compiles prompts and creates the issue payload.
- [ ] Ensure the newly created issues successfully trigger Jules' native issue-watching integration when labeled with jules.
- [ ] Document any end-to-end delays or rate-limiting behaviors discovered during simulation testing.