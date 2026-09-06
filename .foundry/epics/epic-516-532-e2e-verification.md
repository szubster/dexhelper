---
id: epic-516-532-e2e-verification
type: EPIC
title: "E2E Verification of Scheduled Agents Issue Flow"
status: PENDING
owner_persona: story_owner
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on:
  - epic-516-531-modify-scheduled-workflows
jules_session_id: null
pr_number: null
parent: prd-419-516-scheduled-agents-dashboard
tags:
  - foundry
  - scheduled-agents
  - github-issues
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# E2E Verification of Scheduled Agents Issue Flow

## Context & Problem Statement
To satisfy the Orchestrator Safeguard (E2E/Integration Requirement), we must verify the entire flow from cron schedule -> issue creation -> agent execution -> PR merge -> issue closure. This Epic is dedicated to testing and verifying this integration.

## Requirements
- Verify that manual dispatch of a scheduled workflow creates an issue with the correct labels and format.
- Verify that the issue creation correctly triggers the modified `foundry-scheduled-agent.yml`.
- Verify the agent extracts the persona and uses `Closes #<issue_number>`.

## Acceptance Criteria
- [ ] Story Owner: Break down into STORY node(s) dedicated exclusively to Integration and E2E Verification.
