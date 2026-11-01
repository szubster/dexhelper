---
id: task-676-712-scheduled-agents-issue-flow-e2e-coder
type: TASK
title: Scheduled Agents Issue Flow E2E Verification Coder Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '1212108492454370518'
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

# Scheduled Agents Issue Flow E2E Verification Coder Implementation

## Context & Problem Statement
To satisfy the Orchestrator Safeguard (E2E/Integration Requirement), we must verify the entire flow from cron schedule -> issue creation -> agent execution -> PR merge -> issue closure. This task is dedicated to implementing the E2E verification tests for this integration.

## Requirements
- E2E Test Implementation: Create a script or Playwright test (or Github Action workflow testing step if applicable in E2E context) to verify that manual dispatch of a scheduled workflow creates an issue with the correct labels (`jules`), title pattern, and body payload containing the compiled prompt.
- E2E Test Implementation: Create verification that the issue creation correctly triggers Jules via the native issue listening functionality.
- E2E Test Implementation: Create verification that when the Jules PR merges, the issue is automatically closed natively.

## Acceptance Criteria
- [ ] Implement E2E tests verifying issue creation with correct labels, title pattern, and body payload on manual workflow dispatch.
- [ ] Implement E2E tests verifying Jules is triggered by issue creation.
- [ ] Implement E2E tests verifying issue is closed natively when Jules PR merges.
