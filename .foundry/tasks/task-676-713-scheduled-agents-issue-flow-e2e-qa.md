---
id: task-676-713-scheduled-agents-issue-flow-e2e-qa
type: TASK
title: Scheduled Agents Issue Flow E2E Verification QA
status: PENDING
owner_persona: qa
created_at: '2026-10-21'
updated_at: '2026-10-31'
depends_on:
  - task-676-712-scheduled-agents-issue-flow-e2e-coder
jules_session_id: null
pr_number: null
parent: story-532-676-scheduled-agents-issue-flow-e2e
tags:
  - foundry
  - scheduled-agents
  - github-issues
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Scheduled Agents Issue Flow E2E Verification QA

## Context & Problem Statement
To satisfy the Orchestrator Safeguard (E2E/Integration Requirement), we must verify the entire flow from cron schedule -> issue creation -> agent execution -> PR merge -> issue closure. This task is dedicated to QA verification of the E2E integration tests.

## Requirements
- Review and verify the E2E implementation tests from `task-676-712-scheduled-agents-issue-flow-e2e-coder`.
- Verify the tests correctly assert that manual dispatch of a scheduled workflow creates an issue with the correct labels (`jules`), title pattern, and body payload containing the compiled prompt.
- Verify the tests correctly assert that the issue creation correctly triggers Jules via the native issue listening functionality.
- Verify the tests correctly assert that when the Jules PR merges, the issue is automatically closed natively.

## Acceptance Criteria
- [ ] Verify E2E implementation tests correctly cover the issue flow.
