---
id: epic-516-531-modify-scheduled-workflows
type: EPIC
title: "Modify Scheduled Workflows for Issue Dispatch"
status: PENDING
owner_persona: story_owner
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on:
  - epic-516-530-adapt-foundry-scheduled-agent
jules_session_id: null
pr_number: null
parent: prd-419-516-scheduled-agents-dashboard
tags:
  - foundry
  - scheduled-agents
  - github-issues
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Modify Scheduled Workflows for Issue Dispatch

## Context & Problem Statement
The current scheduled agent workflows (`schedule-*.yml`) call the `foundry-scheduled-agent.yml` workflow directly. They need to be updated to instead create a GitHub Issue, which will then trigger the newly adapted agent workflow. The existing cron triggers will be retained.

## Requirements
- Modify each `schedule-<persona>.yml` file in `.github/workflows/`.
- Replace the direct workflow call with a step that creates a GitHub Issue via the `gh` cli.
- The command format: `gh issue create --title "Scheduled Agent: <persona>" --body "Scheduled run for <persona>." --label "jules"`.

## Acceptance Criteria
- [ ] Story Owner: Break down into STORY node(s) for implementation.
