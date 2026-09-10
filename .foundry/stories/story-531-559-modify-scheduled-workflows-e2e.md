---
id: story-531-559-modify-scheduled-workflows-e2e
type: STORY
title: "Integration and E2E Verification of Scheduled Workflow Issue Dispatch"
status: PENDING
owner_persona: tech_lead
created_at: "$(date +%Y-%m-%d)"
updated_at: "$(date +%Y-%m-%d)"
depends_on:
  - .foundry/stories/story-531-558-modify-scheduled-workflows-impl.md
jules_session_id: null
pr_number: null
parent: epic-516-531-modify-scheduled-workflows
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

# Integration and E2E Verification of Scheduled Workflow Issue Dispatch

## Context
Following the implementation of issue-based dispatching for scheduled agent workflows, this STORY ensures comprehensive E2E validation of the new mechanisms. The Orchestrator core policy mandates an explicit `e2e` or `integration` tagged story for every EPIC.

## Requirements
- Validate that GitHub Action `schedule-*.yml` modifications reliably create correctly formatted issues.
- Confirm the `foundry-orchestrator.ts --compile-scheduled` execution properly compiles prompts and creates the issue payload.
- Ensure the newly created issues successfully trigger Jules' native issue-watching integration when labeled with `jules`.
- Document any end-to-end delays or rate-limiting behaviors discovered during simulation testing.

## Acceptance Criteria
- [ ] Tech Lead: Break down into TASK nodes (QA to handle the E2E verification workflow).
