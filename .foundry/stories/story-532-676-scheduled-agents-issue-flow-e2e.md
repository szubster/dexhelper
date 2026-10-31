---
id: story-532-676-scheduled-agents-issue-flow-e2e
type: STORY
title: Scheduled Agents Issue Flow E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-17'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-516-532-e2e-verification
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

# Scheduled Agents Issue Flow E2E Verification

## Context & Problem Statement
To satisfy the Orchestrator Safeguard (E2E/Integration Requirement), we must verify the entire flow from cron schedule -> issue creation -> agent execution -> PR merge -> issue closure. This story is dedicated to testing and verifying this integration.

## Requirements
- E2E Test: Verify that manual dispatch of a scheduled workflow creates an issue with the correct labels (`jules`), title pattern, and body payload containing the compiled prompt.
- E2E Test: Verify that the issue creation correctly triggers Jules via the native issue listening functionality.
- E2E Test: Verify that when the Jules PR merges, the issue is automatically closed natively.

## Acceptance Criteria
- [x] Break down into TASK nodes for E2E test implementation.
- [ ] task-676-712-scheduled-agents-issue-flow-e2e-coder
- [ ] task-676-713-scheduled-agents-issue-flow-e2e-qa
