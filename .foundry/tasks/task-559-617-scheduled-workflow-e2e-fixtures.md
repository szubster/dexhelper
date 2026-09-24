---
id: task-559-617-scheduled-workflow-e2e-fixtures
type: TASK
title: Scheduled Workflow E2E - Fixtures
status: READY
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on: []
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
# Scheduled Workflow E2E - Fixtures

## Context
Following the implementation of issue-based dispatching for scheduled agent workflows, we need fixtures to simulate scheduled workflows and test the Orchestrator's prompt compilation and payload generation.

## Acceptance Criteria
- [ ] Implement mock payloads and issue definitions for schedule-*.yml.
- [ ] Ensure foundry-orchestrator.ts --compile-scheduled execution can be mocked and tested.